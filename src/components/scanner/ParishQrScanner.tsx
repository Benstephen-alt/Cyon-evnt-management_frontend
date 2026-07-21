import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

import "./scanner.css";

/**
 * ==========================================================
 * Public Methods
 * ==========================================================
 */
export interface ParishQrScannerRef {
  open(): Promise<void>;
  pause(): void;
  resume(): void;
  close(): Promise<void>;
}

/**
 * ==========================================================
 * Component Props
 * ==========================================================
 */
interface ParishQrScannerProps {
  /**
   * Called whenever a QR code is successfully scanned.
   *
   * Return:
   * true  -> pause scanner
   * false -> continue scanning
   */
  onScan(
    qrText: string
  ): Promise<boolean>;
}

/**
 * ==========================================================
 * Parish QR Scanner
 * ==========================================================
 */
const ParishQrScanner = forwardRef<
  ParishQrScannerRef,
  ParishQrScannerProps
>(({ onScan }, ref) => {

  /**
   * Scanner container.
   */
  const containerRef =
    useRef<HTMLDivElement>(null);

  /**
   * Scanner wrapper.
   * Used for green flash animation.
   */
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  /**
   * Unique scanner id.
   */
  const scannerId =
    useRef(
      `scanner-${crypto.randomUUID()}`
    );

  /**
   * Html5Qrcode instance.
   */
  const scannerRef =
    useRef<Html5Qrcode | null>(null);

  /**
   * Success sound.
   */
  const audioRef =
  useRef<HTMLAudioElement | null>(null);

  /**
   * Prevent duplicate scans.
   */
  const processingRef =
    useRef(false);

  /**
   * Indicates whether scanning is paused.
   *
   * Camera remains active.
   */
  const pausedRef =
    useRef(false);

  /**
   * Indicates whether camera is open.
   */
  const startedRef =
    useRef(false);

  /**
   * Success flash timer.
   */
  const flashTimeoutRef =
  useRef<number | undefined>(undefined);




      /**
   * ==========================================================
   * Success Flash
   * ==========================================================
   *
   * Flashes a green border around the scanner
   * for a short period after a successful scan.
   */
  const flashSuccess = () => {

    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    wrapper.classList.add("scanner-success");

    window.clearTimeout(
      flashTimeoutRef.current
    );

    flashTimeoutRef.current =
      window.setTimeout(() => {

        wrapper.classList.remove(
          "scanner-success"
        );

      }, 400);

  };



  /**
   * ==========================================================
   * Success Beep
   * ==========================================================
   */
  const playBeep = async () => {
  try {
    if (!audioRef.current) {
      console.log("[Beep] Audio not initialized.");
      return;
    }

    console.log("[Beep] Playing...");

    audioRef.current.currentTime = 0;

    await audioRef.current.play();

    console.log("[Beep] Played successfully.");
  } catch (error) {
    console.error("[Beep] Failed:", error);
  }
};



  /**
   * ==========================================================
   * Phone Vibration
   * ==========================================================
   */
  const vibrate = () => {

    if ("vibrate" in navigator) {

      navigator.vibrate([
        80,
        40,
        80,
      ]);

    }

  };



  /**
   * ==========================================================
   * Select Camera
   * ==========================================================
   *
   * Prefer rear camera on phones.
   * Fall back to first available camera.
   */
  const getCameraId =
    async (): Promise<string> => {

      const cameras =
        await Html5Qrcode.getCameras();

      if (!cameras.length) {

        throw new Error(
          "No camera detected."
        );

      }

      const rearCamera =
        cameras.find((camera) =>
          /back|rear|environment/i.test(
            camera.label
          )
        );

      return (
        rearCamera?.id ??
        cameras[0].id
      );

    };



  /**
   * ==========================================================
   * Process Successful Scan
   * ==========================================================
   */
  const handleScan =
    async (
      decodedText: string
    ) => {

      console.log(
  "[Scanner]",
  "paused =", pausedRef.current,
  "processing =", processingRef.current
);

      /**
       * Ignore while paused.
       */
      if (pausedRef.current) {
        return;
      }

      /**
       * Prevent duplicate scans.
       */
      if (processingRef.current) {
        return;
      }

      processingRef.current = true;

      /**
       * Success feedback.
       */
      flashSuccess();

      vibrate();

      await playBeep();

      try {

        /**
         * Parent decides whether
         * scanning should pause.
         */
        const shouldPause =
          await onScan(decodedText);

          console.log("shouldPause =", shouldPause);

        if (shouldPause) {

          pausedRef.current = true;

        } else {

          processingRef.current = false;

        }

      } catch (error) {

        console.error(
          "QR processing failed:",
          error
        );

        processingRef.current = false;

      }

    };




      /**
   * ==========================================================
   * Open Scanner
   * ==========================================================
   *
   * Opens the camera and starts QR detection.
   */
  const open = async () => {
  console.log("[Scanner] Opening scanner...");

  if (startedRef.current) {
    console.log("[Scanner] Scanner already started.");
    return;
  }

  if (!scannerRef.current) {
    console.error("[Scanner] Scanner has not been initialized.");
    throw new Error("Scanner has not been initialized.");
  }

  try {
    console.log("[Scanner] Getting available cameras...");

    

    console.log("[Scanner] Selected camera:", );

    console.log("[Scanner] Starting camera...");

    await scannerRef.current.start(
      {
        facingMode: "environment",
  
      },
      {
        fps: 10,
       // qrbox: {
          //width: 280,
         // height: 280,
       // },
        aspectRatio: 1,
        disableFlip: false,
      },
      async (decodedText) => {
        console.log("[Scanner] QR detected:", decodedText);

        await handleScan(decodedText);
      },
      (errorMessage) => {
        // Comment this out later if it's too noisy.
        // Html5Qrcode calls this continuously while searching.
         console.log("[Scanner] Decode attempt:", errorMessage);
      }
    );

    console.log("[Scanner] Camera started successfully.");

    startedRef.current = true;
    pausedRef.current = false;
    processingRef.current = false;
  } catch (error) {
    console.error("[Scanner] Failed to start:", error);

    startedRef.current = false;
    processingRef.current = false;

    throw error;
  }
};
        

  /**
   * ==========================================================
   * Pause Scanner
   * ==========================================================
   *
   * Camera remains active.
   *
   * We simply ignore scan results.
   */
  const pause = () => {

    pausedRef.current = true;

  };



  /**
   * ==========================================================
   * Resume Scanner
   * ==========================================================
   */
  const resume = () => {

    pausedRef.current = false;

    processingRef.current = false;

  };



  /**
   * ==========================================================
   * Close Scanner
   * ==========================================================
   *
   * Releases the camera completely.
   */
  const close = async () => {

    if (!startedRef.current) {
      return;
    }

    if (!scannerRef.current) {
      return;
    }

    try {

      await scannerRef.current.stop();

      await scannerRef.current.clear();

    } catch (error) {

      console.warn(
        "Unable to stop scanner:",
        error
      );

    } finally {

      startedRef.current = false;

      pausedRef.current = false;

      processingRef.current = false;

    }

  };


    /**
   * ==========================================================
   * Initialise Scanner
   * ==========================================================
   */
  useEffect(() => {

    /**
     * Load success sound.
     */
    audioRef.current = new Audio(
      "/sound/success.mp3"
    );

    audioRef.current.preload = "auto";

    /**
     * Create ONE scanner instance.
     */
    scannerRef.current = new Html5Qrcode(
      scannerId.current,
      {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
        verbose: false,
      }
    );

    /**
     * Cleanup.
     */
    return () => {

      window.clearTimeout(
        flashTimeoutRef.current
      );

      void close();

    };

  }, []);




  /**
   * ==========================================================
   * Public API
   * ==========================================================
   */
  useImperativeHandle(

    ref,

    () => ({

      open,

      pause,

      resume,

      close,

    }),

    []

  );




  /**
   * ==========================================================
   * Render
   * ==========================================================
   */
  return (

    <div
      ref={wrapperRef}
      className="scanner-wrapper"
    >

      {/* Camera Preview */}

      <div

        ref={containerRef}

        id={scannerId.current}

        className="scanner-container"

      />



      {/* White Scan Frame */}

      <div className="scanner-frame">

        {/* Moving Scan Line */}

        <div className="scanner-line" />

      </div>

    </div>

  );

});

ParishQrScanner.displayName =
  "ParishQrScanner";

export default ParishQrScanner;