import axios from "axios";
import { endpointUrl } from "../config";

class DocumentTwelve {
  _prefix;
  constructor() {
    this._prefix = "document-twelve";
  }

  async createDocumentTwelve(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentTwelveByDocumentId(documentId) {
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

const DocumentTwelveService = new DocumentTwelve();
export default DocumentTwelveService;
