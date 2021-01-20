import Axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class Upload {
  _prefix;
  constructor() {
    this._prefix = "upload";
  }
  async uploadSignature(bodyFormData) {
    try {
      const response = await Axios({
        method: "post",
        url: `${endpointUrl}${this._prefix}/signature`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const UploadService = new Upload();

export default UploadService;
