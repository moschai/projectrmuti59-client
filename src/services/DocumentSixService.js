import axios from "axios";
import { endpointUrl } from "../config";

class DocumentSix {
  _prefix;
  constructor() {
    this._prefix = "document-six";
  }

  async createDocumentSix(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentSixService = new DocumentSix();
export default DocumentSixService;
