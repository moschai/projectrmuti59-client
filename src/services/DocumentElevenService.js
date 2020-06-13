import axios from "axios";
import { endpointUrl } from "../config";

class DocumentEleven {
  _prefix;
  constructor() {
    this._prefix = "document-eleven";
  }

  async createDocumentEleven(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentElevenService = new DocumentEleven();
export default DocumentElevenService;
