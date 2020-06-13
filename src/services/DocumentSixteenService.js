import axios from "axios";
import { endpointUrl } from "../config";

class DocumentSixteen {
  _prefix;
  constructor() {
    this._prefix = "document-sixteen";
  }

  async createDocumentSixteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentSixteenService = new DocumentSixteen();
export default DocumentSixteenService;
