import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";
class Admin {
  _prefix;
  constructor() {
    this._prefix = "admin";
  }

  async getProfile() {
    try {
      const response = await axios.get(
        `${endpointUrl}${this._prefix}`,
        AuthService.adminGetHeaderBearer()
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  // async createAthority(body) {
  //   try {
  //     const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async createAthority(body) {
    try {
      const response = await axios.post(
        `${endpointUrl}authority`,
        body,
        AuthService.adminGetHeaderBearer()
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createSubject(body) {
    try {
      const response = await axios.post(
        `${endpointUrl}subject`,
        body,
        AuthService.adminGetHeaderBearer()
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteDocument(id) {
    try {
      const response = await axios.delete(
        `${endpointUrl}document/${id}`,
        AuthService.adminGetHeaderBearer()
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const AdminService = new Admin();
export default AdminService;
