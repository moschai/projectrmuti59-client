import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentThree {
  _prefix;
  constructor() {
    this._prefix = "document-three";
  }

  async createDocumentThree(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentThreeByDocumentId(documentId) {
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

  async approvedDocumentThree(values, documentId) {
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

const DocumentThreeService = new DocumentThree();
export default DocumentThreeService;
