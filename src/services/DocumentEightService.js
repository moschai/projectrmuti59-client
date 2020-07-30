import axios from "axios";
import { endpointUrl } from "../config";

class DocumentEight {
  _prefix;
  constructor() {
    this._prefix = "document-eight";
  }

  async createDocumentEight(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentEightByDocumentId(documentId) {
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

const DocumentEightService = new DocumentEight();
export default DocumentEightService;
