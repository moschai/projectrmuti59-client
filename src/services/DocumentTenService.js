import axios from "axios";
import { endpointUrl } from "../config";

class DocumentTen {
  _prefix;
  constructor() {
    this._prefix = "document-ten";
  }

  async createDocumentTen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentTenService = new DocumentTen();
export default DocumentTenService;
