import axios from "axios";
import { endpointUrl } from "../config";

class DocumentEighteen {
  _prefix;
  constructor() {
    this._prefix = "document-eighteen";
  }

  async createDocumentEighteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentEighteenService = new DocumentEighteen();
export default DocumentEighteenService;
