/**
 * ==========================================================
 * Scanner Types
 * ==========================================================
 *
 * Shared interfaces and types used by the QR Scanner
 * subsystem.
 *
 * This file contains NO implementation.
 * It only defines contracts between the scanner service,
 * React component and parent pages.
 * ==========================================================
 */

/**
 * Represents the current scanner lifecycle state.
 */
export enum ScannerState {
  /**
   * Scanner has not been initialized.
   */
  IDLE = "IDLE",

  /**
   * Camera is currently opening.
   */
  STARTING = "STARTING",

  /**
   * Camera is open and actively scanning.
   */
  SCANNING = "SCANNING",

  /**
   * Camera remains open but scanning is temporarily paused.
   */
  PAUSED = "PAUSED",

  /**
   * Scanner is shutting down.
   */
  STOPPING = "STOPPING",
}

/**
 * Configuration used when starting the scanner.
 */
export interface ScannerConfig {
  /**
   * Number of frames analysed every second.
   *
   * Recommended:
   * 10–15 for laptops
   * 15–20 for modern phones
   */
  fps?: number;

  /**
   * Width of the scanning square.
   */
  qrBoxWidth?: number;

  /**
   * Height of the scanning square.
   */
  qrBoxHeight?: number;

  /**
   * Preferred camera.
   *
   * "environment" = rear camera
   * "user" = front camera
   */
  facingMode?: "environment" | "user";
}

/**
 * Result returned after decoding a QR code.
 */
export interface ScanResult {
  /**
   * Raw QR value.
   */
  text: string;

  /**
   * Time the QR was scanned.
   */
  scannedAt: Date;
}

/**
 * Callback executed whenever
 * a QR code has been decoded.
 *
 * Return:
 * true  -> scanner pauses
 * false -> continue scanning
 */
export type ScanCallback = (
  result: ScanResult
) => Promise<boolean>;

/**
 * Public API exposed by the scanner service.
 */
export interface ScannerService {


/**
 * Prepare the scanner before opening the camera.
 */
initialize(
  containerId: string,
  callback: ScanCallback,
  config?: ScannerConfig
): void;


  /**
   * Opens camera and starts scanning.
   */
  open(): Promise<void>;

  /**
   * Temporarily pause scanning.
   * Camera remains open.
   */
  pause(): void;

  /**
   * Continue scanning after pause.
   */
  resume(): void;

  /**
   * Completely stop camera.
   */
  close(): Promise<void>;

  /**
   * Destroy scanner instance.
   */
  destroy(): Promise<void>;

  /**
   * Current scanner state.
   */
  getState(): ScannerState;

  /**
   * Returns true when camera
   * is actively scanning.
   */
  isRunning(): boolean;

  /**
   * Returns true when scanner
   * is paused.
   */
  isPaused(): boolean;
}

/**
 * Methods exposed by the React component
 * through forwardRef().
 */
export interface ParishQrScannerRef {
  /**
   * Open the camera.
   */
  open(): Promise<void>;

  /**
   * Pause scanning.
   */
  pause(): void;

  /**
   * Resume scanning.
   */
  resume(): void;

  /**
   * Close camera.
   */
  close(): Promise<void>;
}

/**
 * Props accepted by the
 * ParishQrScanner component.
 */
export interface ParishQrScannerProps {
  /**
   * Called whenever a QR code
   * has been decoded.
   *
   * Returning true pauses
   * the scanner.
   *
   * Returning false allows
   * scanning to continue.
   */
  onScan: ScanCallback;

  /**
   * Optional scanner configuration.
   */
  config?: ScannerConfig;

  /**
   * Optional class name for styling.
   */
  className?: string;
}