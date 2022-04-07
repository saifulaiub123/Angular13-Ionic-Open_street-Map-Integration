export enum StorageItem {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Auth = 'App/auth',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Theme = 'App/theme',
}

export const getItem = (itemName: StorageItem): unknown | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: unknown): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
