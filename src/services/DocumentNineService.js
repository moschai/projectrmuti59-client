import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentNine {
  _prefix;
  constructor() {
    this._prefix = "document-nine";
  }

  async createDocumentNine(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentNineByDocumentId(documentId) {
    try {
      const response = await axios.get(
        `${endpointUrl}${this._prefix}/document/${documentId}`
      );
      console.log(documentId, response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async approvedDocumentNine(values, documentId) {
    try {
      const response = await axios.put(
        `${endpointUrl}${this._prefix}/authority/approved/${documentId}`,
        values,
        AuthService.getHeaderBearer()
      );
      console.log(documentId, response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTablesNineForAuthority() {
    try {
      const response = await axios.get(
        `${endpointUrl}${this._prefix}/authority/table`,
        AuthService.getHeaderBearer()
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTableNineById(tableId) {
    try {
      const response = await axios.get(
        `${endpointUrl}${this._prefix}/table/${tableId}`,
        AuthService.getHeaderBearer()
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authorityTableNineApproved(value, tableId) {
    try {
      const response = await axios.put(
        `${endpointUrl}${this._prefix}/authority/table/approved/${tableId}`,
        value,
        AuthService.getHeaderBearer()
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DocumentNineService = new DocumentNine();
export default DocumentNineService;
