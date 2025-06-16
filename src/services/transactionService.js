import {
  addDocument,
  deleteDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
} from "./crudService";
const TRANSACTION_COLLECTION = "transactions";

export async function addTransaction(data) {
  return addDocument(TRANSACTION_COLLECTION, data);
}

export async function getUserTransactions() {
  return getUserDocuments(TRANSACTION_COLLECTION);
}

export async function updateTransaction(id, updatedData) {
  return updateDocument(TRANSACTION_COLLECTION, id, updatedData);
}

export async function deleteTransaction(id) {
  return deleteDocument(TRANSACTION_COLLECTION, id);
}

export async function getTransactionById(id) {
  return getDocumentById(TRANSACTION_COLLECTION, id);
}
