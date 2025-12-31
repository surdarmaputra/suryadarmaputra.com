export function generateRandomElementTiltAngle(itemIndex: number, maxTilt?: number): number {
  const tiltLimit = maxTilt ?? 3; // Default to 3 degrees if not provided
  // Create a pattern that feels balanced but allows adjustment of max tilt
  const baseAngle = (itemIndex % 3) * (tiltLimit / 3) - tiltLimit / 3; // Creates pattern: -tiltLimit/3, 0, tiltLimit/3...
  const randomOffset = (Math.random() - 0.5) * (tiltLimit / 2); // Adds variation up to tiltLimit/2
  const tilt = baseAngle + randomOffset;
  // Clamp to tiltLimit range
  return Math.max(-tiltLimit, Math.min(tiltLimit, tilt));
}

/**
 * Executes a function on initial load and re-executes it after navigation.
 * This ensures functions work correctly with Astro's ClientRouter.
 *
 * @param initFunction - The function to execute on initial load and after navigation
 */
export function initAfterNavigation(initFunction: () => void): void {
  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFunction);
  } else {
    initFunction();
  }

  // Re-initialize after navigation
  document.addEventListener("astro:after-swap", initFunction);
}
