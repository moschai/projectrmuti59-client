import axios from "axios";
import { endpointUrl } from "../config";

class DocumentFive {
  _prefix;
  constructor() {
    this._prefix = "document-five";
  }

  async createDocumentFive(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentFiveService = new DocumentFive();
export default DocumentFiveService;
