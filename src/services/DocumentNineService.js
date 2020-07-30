import axios from "axios";
import { endpointUrl } from "../config";

class DocumentNine {
  _prefix;
  constructor() {
    this._prefix = "document-nine";
  }

  async createDocumentNine(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentNineByDocumentId(documentId) {
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

const DocumentNineService = new DocumentNine();
export default DocumentNineService;
