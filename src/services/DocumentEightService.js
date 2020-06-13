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
}

const DocumentEightService = new DocumentEight();
export default DocumentEightService;
