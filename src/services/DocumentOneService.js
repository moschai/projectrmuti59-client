import axios from "axios";
import { endpointUrl } from "../config";

class DocumentOne {
  _prefix;
  constructor() {
    this._prefix = "document-one";
  }

  async createDocumentOne(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentOneByDocumentId(documentId) {
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

const DocumentOneService = new DocumentOne();
export default DocumentOneService;
