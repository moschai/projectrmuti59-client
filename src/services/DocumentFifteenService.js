import axios from "axios";
import { endpointUrl } from "../config";

class DocumentFifteen {
  _prefix;
  constructor() {
    this._prefix = "document-fifteen";
  }

  async createDocumentFifteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentFifteenByDocumentId(documentId) {
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
}

const DocumentFifteenService = new DocumentFifteen();
export default DocumentFifteenService;
