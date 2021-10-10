export function setLocalStorageKey(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (message) {
        console.log(message);
    }
}

export function getLocalStorageKey(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (message) {
        console.log(message);
    }
}