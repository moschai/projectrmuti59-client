import axios from "axios";
import { endpointUrl } from "../config";

class DocumentSeventeen {
  _prefix;
  constructor() {
    this._prefix = "document-seventeen";
  }

  async createDocumentSeventeen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentSeventeenService = new DocumentSeventeen();
export default DocumentSeventeenService;
