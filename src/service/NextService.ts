import {MD5, SHA256} from 'crypto-js';
import BaseService from './BaseService';
import {Jira, PaginationProps} from '@src/constants/t';

export default class NextService extends BaseService {
  constructor() {
    super();
  }

  async selectLogin(mobile: string, password: string) {
    let s = MD5(`${mobile}:${password}`);
    let result = await this.instance.get(`/share/login.do`, {
      params: {mobile, password, s},
    });
    return result.data;
  }

  async selectUUID() {
    let result = await this.instance.get(`/share/uuid.do`, {
      params: {},
    });
    return result.data;
  }

  async mergeJira(jira: Jira) {
    let result = await this.instance.post(`/mergeJira.do`, jira);
    return result.data;
  }

  async selectJiras(page: PaginationProps) {
    let result = await this.instance.get(`/selectJiras.do`, {params: page});
    return result.data;
  }

  async selectJira(id: string) {
    let result = await this.instance.get(`/selectJira.do`, {params: {id}});
    return result.data;
  }

  async selectUser() {
    let result = await this.instance.get(`/selectUser.do`, {
      params: {},
    });
    return result.data;
  }

  async selectProperties() {
    let result = await this.instance.get(
      `/api/wallet/property/selectProperties`,
      {params: {page: 1, pageSize: 52}},
    );
    return result.data;
  }
}
