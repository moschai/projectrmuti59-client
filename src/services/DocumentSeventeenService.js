import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentSeventeen {
  _prefix;
  constructor() {
    this._prefix = "document-seventeen";
  }

  async createDocumentSeventeen(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentSeventeenByDocumentId(documentId) {
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

  async approvedDocumentSeventeen(values, documentId) {
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

  async getTablesSeventeenForAuthority() {
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

  async getTableSeventeenById(tableId) {
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

  async authorityTableSeventeenApproved(value, tableId) {
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

const DocumentSeventeenService = new DocumentSeventeen();
export default DocumentSeventeenService;
