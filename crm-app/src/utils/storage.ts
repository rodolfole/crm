const getStorage = (key: string) =>
  localStorage.getItem(key) === null ? null : localStorage.getItem(key);

const setStorage = (key: string, value: string | object) =>
  typeof value === "object"
    ? localStorage.setItem(key, JSON.stringify(value))
    : localStorage.setItem(key, value);

export { getStorage, setStorage };
