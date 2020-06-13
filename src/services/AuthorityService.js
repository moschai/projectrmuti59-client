import axios from "axios";
import { endpointUrl } from "../config";
class Document {
  _prefix;
  constructor() {
    this._prefix = "authority";
  }
  async getMajors() {
    try {
      const response = await axios.get(`${endpointUrl}${this._prefix}/major`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAuthorityAll() {
    try {
      const response = await axios.get(`${endpointUrl}${this._prefix}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const AuthorityService = new Document();
export default AuthorityService;
