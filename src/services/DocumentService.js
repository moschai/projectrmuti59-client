import { endpointUrl } from "../config";
import Axios from "axios";
import AuthService from "./AuthService";

class Document {
  _prefix;
  constructor() {
    this._prefix = "document";
  }

  async getDocumentForAuthority() {
    try {
      const response = await Axios.get(
        `${endpointUrl}${this._prefix}/for-authority`,
        AuthService.getHeaderBearer()
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentForAdmin() {
    try {
      const response = await Axios.get(
        `${endpointUrl}${this._prefix}/for-admin`,
        AuthService.adminGetHeaderBearer()
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentByStudent(documentId, studentId) {
    try {
      const response = await Axios.get(
        `${endpointUrl}${this._prefix}/tag/${documentId}?studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentService = new Document();
export default DocumentService;
