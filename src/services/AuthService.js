import axios from "axios";
import { endpointUrl } from "../config";

class Auth {
  _prefix;
  constructor() {
    this._prefix = "auth";
  }

  async authorityLogin(value) {
    try {
      const response = await axios.post(
        `${endpointUrl}${this._prefix}/authority-auth`,
        value
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async adminLogin(value) {
    try {
      const response = await axios.post(
        `${endpointUrl}${this._prefix}/admin-auth`,
        value
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  adminSaveToken(adminToken) {
    localStorage.setItem("adminToken", adminToken);
  }

  adminGetToken() {
    return localStorage.getItem("adminToken");
  }

  adminRemoveToken() {
    localStorage.removeItem("adminToken");
  }

  getHeaderBearer() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
  }

  adminGetHeaderBearer() {
    return {
      headers: {
        Authorization: `Bearer ${this.adminGetToken()}`,
      },
    };
  }
}
const AuthService = new Auth();
export default AuthService;
