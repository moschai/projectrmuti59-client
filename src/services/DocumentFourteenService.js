import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentFourteen {
  _prefix;
  constructor() {
    this._prefix = "document-fourteen";
  }

  async createDocumentFourteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentFourteenByDocumentId(documentId) {
    try {
      const response = await axios.get(
        `${endpointUrl}${this._prefix}/document/${documentId}`
      );
      console.log(documentId, response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async approvedDocumentFourteen(values, documentId) {
    try {
      const response = await axios.put(
        `${endpointUrl}${this._prefix}/authority/approved/${documentId}`,
        values,
        AuthService.getHeaderBearer()
      );
      console.log(documentId, response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentFourteenService = new DocumentFourteen();
export default DocumentFourteenService;
