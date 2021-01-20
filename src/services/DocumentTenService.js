import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentTen {
  _prefix;
  constructor() {
    this._prefix = "document-ten";
  }

  async createDocumentTen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentTenByDocumentId(documentId) {
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
  async approvedDocumentTen(values, documentId) {
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

  async getTablesTenForAuthority() {
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

  async getTableTenById(tableId) {
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

  async authorityTableTenApproved(value, tableId) {
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

const DocumentTenService = new DocumentTen();
export default DocumentTenService;
