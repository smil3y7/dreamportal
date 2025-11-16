let db;
export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("DreamPortal", 1);
    request.onupgradeneeded = e => {
      db = e.target.result;
      db.createObjectStore("data", { keyPath: "key" });
    };
    request.onsuccess = () => { db = request.result; resolve(); };
    request.onerror = () => reject(request.error);
  });
}
export async function get(key) {
  await initDB();
  return new Promise(resolve => {
    const tx = db.transaction("data", "readonly");
    const req = tx.objectStore("data").get(key);
    req.onsuccess = () => resolve(req.result?.value);
  });
}
export async function set(key, value) {
  await initDB();
  return new Promise(resolve => {
    const tx = db.transaction("data", "readwrite");
    tx.objectStore("data").put({ key, value });
    tx.oncomplete = resolve;
  });
}
