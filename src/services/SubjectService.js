import axios from "axios";
import { endpointUrl } from "../config";
class Subject {
  _prefix;
  constructor() {
    this._prefix = "subject";
  }
  async getSubjectAll() {
    try {
      const response = await axios.get(`${endpointUrl}${this._prefix}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const SubjectService = new Subject();

export default SubjectService;
