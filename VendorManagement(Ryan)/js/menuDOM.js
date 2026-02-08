import { db, storage } from "../../Firebase/firebase.js";
 
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
 
const HC = "Adam Road Food Centre";
const STALL = "Delicious Chicken Rice";
const colRef = collection(db, "hawker centre", HC, "food stalls", STALL, "food items");
 
export async function fetchMenu() {
  const snap = await getDocs(colRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
export async function uploadImg(file) {
  if (!file) return "";
  const safe = file.name.replace(/[^\w.-]/g, "_");
  const path = `menu-images/${HC}/${STALL}/${Date.now()}_${safe}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  return await getDownloadURL(r);
}
 
export async function saveItem(docId, data) {
  await setDoc(doc(colRef, docId), data, { merge: true });
}
 
export async function deleteItem(docId) {
  await deleteDoc(doc(colRef, docId));
}
 