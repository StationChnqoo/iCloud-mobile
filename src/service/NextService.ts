import {SHA256} from 'crypto-js';
import BaseService from './BaseService';

export default class NextService extends BaseService {
  constructor() {
    super();
  }

  async selectLogin(code: string, password: string) {
    // console.log({code, password})
    let s = SHA256(`${code}:${password}`);
    let result = await this.instance.get(`/api/share/login`, {
      params: {code, password, s},
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
