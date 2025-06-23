import {
  addDocument,
  archiveDocument,
  deleteDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
} from "./crudService";

const ACCOUNT_COLECTION = "accounts";

export async function addAccount(data) {
  return addDocument(ACCOUNT_COLECTION, data);
}

export async function getUserAccounts() {
  return getUserDocuments(ACCOUNT_COLECTION);
}

export async function updateAccount(id, updatedData) {
  return updateDocument(ACCOUNT_COLECTION, id, updatedData);
}

export async function deleteAccount(id) {
  return deleteDocument(ACCOUNT_COLECTION, id);
}

export async function getAccountById(id) {
  return getDocumentById(ACCOUNT_COLECTION, id);
}

export async function archiveAccount(id) {
  return archiveDocument(ACCOUNT_COLECTION, id, true);
}

export async function updateAccountBalance(AccountId, amount) {
  const account = await getAccountById(AccountId);
  account.balance += amount;
  await updateAccount(AccountId, account);
}
