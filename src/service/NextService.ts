import {MD5, SHA256} from 'crypto-js';
import BaseService from './BaseService';

export default class NextService extends BaseService {
  constructor() {
    super();
  }

  async selectLogin(mobile: string, password: string) {
    // console.log({code, password})
    let s = MD5(`${mobile}:${password}`);
    let result = await this.instance.get(`/share/login.do`, {
      params: {mobile, password, s},
    });
    return result.data;
  }

  async selectUser() {
    // console.log({code, password})
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
