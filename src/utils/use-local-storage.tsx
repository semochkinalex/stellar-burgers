export function setLocalStorageKey(key: string, value: string) { // для объектов не работает
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (message) {
        console.log(message);
    }
}

export function getLocalStorageKey(key: string) {
    try {
        return JSON.parse(window.localStorage.getItem(key) || '{}');
    } catch (message) {
        console.log(message);
    }
}