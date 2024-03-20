export default function isNumeric(input: string): boolean {
  const numericValue = Number(input);
  return !isNaN(numericValue) && isFinite(numericValue);
}
