// services/crudService.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getCurrentUser } from "../utils/auth";

export async function addDocument(collectionName, data) {
  const user = getCurrentUser();
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserDocuments(collectionName) {
  const user = getCurrentUser();
  const q = query(
    collection(db, collectionName),
    where("userId", "==", user.uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateDocument(collectionName, id, updatedData) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...updatedData,
    updatedAt: serverTimestamp(),
  });
}

export async function archiveDocument(collectionName, id, archiveData) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    archiveData: true,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function getDocumentById(collectionName, id) {
  if (!id) return null;
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}
