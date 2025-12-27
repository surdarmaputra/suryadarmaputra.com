export function generateRandomElementTiltAngle(itemIndex: number, maxTilt?: number): number {
  const tiltLimit = maxTilt ?? 3; // Default to 3 degrees if not provided
  // Create a pattern that feels balanced but allows adjustment of max tilt
  const baseAngle = (itemIndex % 3) * (tiltLimit / 3) - tiltLimit / 3; // Creates pattern: -tiltLimit/3, 0, tiltLimit/3...
  const randomOffset = (Math.random() - 0.5) * (tiltLimit / 2); // Adds variation up to tiltLimit/2
  const tilt = baseAngle + randomOffset;
  // Clamp to tiltLimit range
  return Math.max(-tiltLimit, Math.min(tiltLimit, tilt));
}
