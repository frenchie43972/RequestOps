export function getEnumLabel<TValue extends string>(
  labels: Record<TValue, string>,
  value: TValue,
): string {
  return labels[value] ?? value;
}
