import axios from "axios";
import { endpointUrl } from "../config";
import AuthService from "./AuthService";

class DocumentSeven {
  _prefix;
  constructor() {
    this._prefix = "document-seven";
  }

  async createDocumentSeven(body) {
    try {
      const response = await axios.post(`${endpointUrl}${this._prefix}`, body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDocumentSevenByDocumentId(documentId) {
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

  async approvedDocumentSeven(values, documentId) {
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

  async getTablesSevenForAuthority() {
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

  async getTableSevenById(tableId) {
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

  async authorityTableSevenApproved(value, tableId) {
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

const DocumentSevenService = new DocumentSeven();
export default DocumentSevenService;
