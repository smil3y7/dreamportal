let db;
export async function initDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open("DreamPortal", 3);
    req.onupgradeneeded = (e) => {
      db = e.target.result;
      db.createObjectStore("lokacije", { keyPath: "kljuc" });
      db.createObjectStore("sanje", { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = () => { db = req.result; resolve(); };
  });
}

export async function dodajLokacijo(lok) {
  const tx = db.transaction("lokacije", "readwrite");
  await tx.objectStore("lokacije").put(lok);
}

export async function getLokacija(kljuc) {
  const tx = db.transaction("lokacije", "readonly");
  return await tx.objectStore("lokacije").get(kljuc);
}

export async function getAllLokacije() {
  const tx = db.transaction("lokacije", "readonly");
  return await tx.objectStore("lokacije").getAll();
}

export async function dodajSanjeSanje(sanja) {
  const tx = db.transaction("sanje", "readwrite");
  return await tx.objectStore("sanje").add(sanja);
}
