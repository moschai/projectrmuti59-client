import axios from "axios";
import { endpointUrl } from "../config";

class DocumentSeven {
  _prefix;
  constructor() {
    this._prefix = "document-seven";
  }

  async createDocumentSeven(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentSevenService = new DocumentSeven();
export default DocumentSevenService;
