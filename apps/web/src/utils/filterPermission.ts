export function filterByPermission<T extends { permission?: string }>(
  items: T[],
  permissions: string[]
): T[] {
  return items.filter(
    (item) => !item.permission || permissions.includes(item.permission)
  );
}
