import {
  addDocument,
  archiveDocument,
  deleteDocument,
  getDocumentById,
  getUserDocuments,
  updateDocument,
} from "./crudService";

const CATEGORY_COLLECTION = "category";

export async function addCategory(data) {
  return addDocument(CATEGORY_COLLECTION, data);
}

export async function getUserCategory() {
  return getUserDocuments(CATEGORY_COLLECTION);
}

export async function updateCategory(id, updatedData) {
  return updateDocument(CATEGORY_COLLECTION, id, updatedData);
}

export async function deleteCategory(id) {
  return deleteDocument(CATEGORY_COLLECTION, id);
}

export async function getCategoryById(id) {
  return getDocumentById(CATEGORY_COLLECTION, id);
}

export async function archiveCategory(id) {
  return archiveDocument(CATEGORY_COLLECTION, id, true);
}
