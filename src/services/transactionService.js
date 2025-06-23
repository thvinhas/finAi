import {
  collection,
  getDocs,
  query,
  Timestamp,
  Transaction,
  where,
} from "firebase/firestore";
import { getCurrentUser } from "../utils/auth";
import { updateAccountBalance } from "./accountService";
import {
  addDocument,
  deleteDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
} from "./crudService";
import { db } from "./firebase";
const TRANSACTION_COLLECTION = "transactions";

export async function addTransaction(data) {
  addDocument(TRANSACTION_COLLECTION, data);
  const amount = data.type === "receita" ? data.amount : -data.amount;

  await updateAccountBalance(data.accountId, amount);
}

export async function getUserTransactions() {
  return getUserDocuments(TRANSACTION_COLLECTION);
}

export async function updateTransaction(id, updatedData) {
  const oldTransaction = await getTransactionById(id);

  const oldAmount =
    oldTransaction.type === "receita"
      ? oldTransaction.amount
      : -oldTransaction.amount;

  await updateAccountBalance(oldTransaction.accountId, -oldAmount);

  const newAmount =
    updatedData.type === "receita" ? updatedData.amount : -updatedData.amount;

  await updateAccountBalance(updatedData.accountId, newAmount);

  await updateDocument(TRANSACTION_COLLECTION, id, updatedData);
}

export async function deleteTransaction(id) {
  return deleteDocument(TRANSACTION_COLLECTION, id);
}

export async function getTransactionById(id) {
  return getDocumentById(TRANSACTION_COLLECTION, id);
}

export async function filterTransactions({
  startDate = null,
  endDate = null,
  type = null,
  categoryId = null,
  accountId = null,
}) {
  const user = getCurrentUser();

  let q = query(
    collection(db, TRANSACTION_COLLECTION),
    where("userId", "==", user.uid)
  );
  if (startDate) {
    q = query(
      q,
      where("transactionDate", ">=", Timestamp.fromDate(new Date(startDate)))
    );
  }

  if (endDate) {
    q = query(
      q,
      where("transactionDate", "<=", Timestamp.fromDate(new Date(endDate)))
    );
  }

  if (type) {
    q = query(q, where("type", "==", type));
  }

  if (categoryId) {
    q = query(q, where("categoryId", "==", categoryId));
  }

  if (accountId) {
    q = query(q, where("accountId", "==", accountId));
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
