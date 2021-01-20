import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentEight {
  _prefix;
  constructor() {
    this._prefix = "document-eight";
  }

  async createDocumentEight(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentEightByDocumentId(documentId) {
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

  async approvedDocumentEight(values, documentId) {
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

  async getTablesEightForAuthority() {
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

  async getTableEightById(tableId) {
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

  async authorityTableEightApproved(value, tableId) {
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

const DocumentEightService = new DocumentEight();
export default DocumentEightService;
