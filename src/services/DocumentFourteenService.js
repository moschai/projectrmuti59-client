import axios from "axios";
import { endpointUrl } from "../config";

class DocumentFourteen {
  _prefix;
  constructor() {
    this._prefix = "document-fourteen";
  }

  async createDocumentFourteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentFourteenService = new DocumentFourteen();
export default DocumentFourteenService;
