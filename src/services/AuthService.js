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

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  getHeaderBearer() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
  }
}
const AuthService = new Auth();
export default AuthService;
