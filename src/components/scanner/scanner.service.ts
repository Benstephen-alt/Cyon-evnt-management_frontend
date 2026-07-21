import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

import {
  ScanCallback,
  ScannerConfig,
  ScannerService,
  ScannerState,
  ScanResult,
} from "./scanner.types";

/**
 * ==========================================================
 * QR Scanner Service
 * ==========================================================
 *
 * This service owns everything related to Html5Qrcode.
 *
 * Responsibilities:
 *
 * • Camera lifecycle
 * • Camera selection
 * • QR decoding
 * • Duplicate protection
 * • Pause / Resume
 * • Success feedback
 * • Cleanup
 *
 * This file contains NO React code.
 * ==========================================================
 */

class Html5QrScannerService
  implements ScannerService
{
  /**
   * Html5Qrcode instance.
   */
  private scanner: Html5Qrcode | null = null;

  /**
   * Scanner state.
   */
  private state = ScannerState.IDLE;

  /**
   * Container id supplied by React.
   */
  private containerId = "";

  /**
   * Parent callback.
   */
  private callback: ScanCallback | null = null;

  /**
   * Scanner configuration.
   */
  private config: Required<ScannerConfig> = {
    fps: 15,
    qrBoxWidth: 280,
    qrBoxHeight: 280,
    facingMode: "environment",
  };

  /**
   * Prevent duplicate callbacks.
   */
  private processing = false;

  /**
   * Success audio.
   */
  private audio = new Audio("/sounds/success.mp3");

  /**
   * Initialise the scanner.
   *
   * This must be called once before open().
   */
  public initialize(
    containerId: string,
    callback: ScanCallback,
    config?: ScannerConfig
  ) {
    this.containerId = containerId;

    this.callback = callback;

    this.config = {
      ...this.config,
      ...config,
    };

    this.audio.preload = "auto";

    this.scanner = new Html5Qrcode(
      containerId,
      {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
        verbose: false,
      }
    );
  }

  /**
   * Returns current scanner state.
   */
  public getState(): ScannerState {
    return this.state;
  }

  /**
   * True when actively scanning.
   */
  public isRunning(): boolean {
    return this.state === ScannerState.SCANNING;
  }

  /**
   * True when paused.
   */
  public isPaused(): boolean {
    return this.state === ScannerState.PAUSED;
  }

  /**
   * Find the best available camera.
   */
  private async getCameraId(): Promise<string> {
    const cameras =
      await Html5Qrcode.getCameras();

    if (!cameras.length) {
      throw new Error("No camera detected.");
    }

    const rearCamera = cameras.find((camera) =>
      /back|rear|environment/i.test(
        camera.label
      )
    );

    return rearCamera?.id ?? cameras[0].id;
  }

  

    /**
   * ----------------------------------------------------------
   * Open Camera
   * ----------------------------------------------------------
   *
   * Starts the camera and begins decoding QR codes.
   */
  public async open(): Promise<void> {

    if (!this.scanner) {
      throw new Error(
        "Scanner has not been initialized."
      );
    }

    if (this.state === ScannerState.SCANNING) {
      return;
    }

    this.state = ScannerState.STARTING;

    try {

      const cameraId =
        await this.getCameraId();

      await this.scanner.start(

        cameraId,

        {
          fps: this.config.fps,

          qrbox: {
            width: this.config.qrBoxWidth,
            height: this.config.qrBoxHeight,
          },

          aspectRatio: 1,

          disableFlip: false,
        },

        async (decodedText) => {

          /**
           * Ignore scans while paused.
           */
          if (
            this.state === ScannerState.PAUSED
          ) {
            return;
          }

          /**
           * Ignore duplicate callbacks.
           */
          if (this.processing) {
            return;
          }

          this.processing = true;

          const result: ScanResult = {
            text: decodedText,
            scannedAt: new Date(),
          };

          try {

            if (!this.callback) {
              return;
            }

            /**
             * Parent decides whether the
             * scanner should pause.
             */
            const shouldPause =
              await this.callback(result);

            if (shouldPause) {

              this.pause();

            } else {

              this.processing = false;

            }

          } catch (error) {

            console.error(
              "Scanner callback failed:",
              error
            );

            this.processing = false;
          }

        },

        /**
         * Ignore decode failures.
         *
         * Html5Qrcode invokes this many
         * times per second while searching
         * for a QR code.
         */
        () => {}

      );

      this.state = ScannerState.SCANNING;

    } catch (error) {

      this.state = ScannerState.IDLE;

      this.processing = false;

      throw error;

    }

  }


    /**
   * ----------------------------------------------------------
   * Close Scanner
   * ----------------------------------------------------------
   *
   * Stops the camera and releases all resources.
   */
  public async close(): Promise<void> {

    if (!this.scanner) {
      return;
    }

    if (this.state === ScannerState.IDLE) {
      return;
    }

    this.state = ScannerState.STOPPING;

    try {

      await this.scanner.stop();

      await this.scanner.clear();

    } catch (error) {

      /**
       * Ignore stop errors.
       *
       * For example:
       * - Camera already stopped
       * - Browser released the camera
       */
      console.warn(
        "Unable to stop scanner:",
        error
      );

    } finally {

      this.processing = false;

      this.state = ScannerState.IDLE;

    }

  }



  /**
   * ----------------------------------------------------------
   * Destroy Scanner
   * ----------------------------------------------------------
   *
   * Completely dispose the scanner instance.
   *
   * Call this when the component unmounts.
   */
  public async destroy(): Promise<void> {

    await this.close();

    this.scanner = null;

    this.callback = null;

    this.containerId = "";

  }



  /**
   * ----------------------------------------------------------
   * Soft Pause
   * ----------------------------------------------------------
   *
   * Camera continues running.
   *
   * We simply ignore scan callbacks.
   */
  public pause(): void {

    if (
      this.state !== ScannerState.SCANNING
    ) {
      return;
    }

    this.state = ScannerState.PAUSED;

  }



  /**
   * ----------------------------------------------------------
   * Resume Scanner
   * ----------------------------------------------------------
   */
  public resume(): void {

    if (
      this.state !== ScannerState.PAUSED
    ) {
      return;
    }

    this.processing = false;

    this.state = ScannerState.SCANNING;

  }

}

/**
 * Shared singleton scanner instance.
 *
 * The application should only ever
 * use one scanner at a time.
 */
export const scannerService =
  new Html5QrScannerService();