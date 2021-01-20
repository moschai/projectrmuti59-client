import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentFive {
  _prefix;
  constructor() {
    this._prefix = "document-five";
  }

  async createDocumentFive(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentFiveByDocumentId(documentId) {
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

  async approvedDocumentFive(values, documentId) {
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

const DocumentFiveService = new DocumentFive();
export default DocumentFiveService;
