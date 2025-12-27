export function generateRandomElementTiltAngle(itemIndex: number) {
  const baseAngle = (itemIndex % 3) * 3 - 3; // Creates pattern: -3, 0, 3, -3, 0, 3...
  const randomOffset = (Math.random() - 0.5) * 2; // Adds -1 to 1 degrees variation (smaller variation)
  const tilt = baseAngle + randomOffset;
  return tilt;
}
