import axios from "axios";
import { endpointUrl } from "../config";

class DocumentTwo {
  _prefix;
  constructor() {
    this._prefix = "document-two";
  }

  async createDocumentTwo(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentTwoService = new DocumentTwo();
export default DocumentTwoService;
