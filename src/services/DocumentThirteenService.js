import axios from "axios";
import { endpointUrl } from "../config";

class DocumentThirteen {
  _prefix;
  constructor() {
    this._prefix = "document-thirteen";
  }

  async createDocumentThirteen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentThirteenService = new DocumentThirteen();
export default DocumentThirteenService;
