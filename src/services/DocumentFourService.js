import axios from "axios";
import { endpointUrl } from "../config";

class DocumentFour {
  _prefix;
  constructor() {
    this._prefix = "document-four";
  }

  async createDocumentFour(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentFourByDocumentId(documentId) {
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

const DocumentFourService = new DocumentFour();
export default DocumentFourService;
