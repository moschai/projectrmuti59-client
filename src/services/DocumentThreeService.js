import axios from "axios";
import { endpointUrl } from "../config";

class DocumentThree {
  _prefix;
  constructor() {
    this._prefix = "document-three";
  }

  async createDocumentThree(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentThreeService = new DocumentThree();
export default DocumentThreeService;
