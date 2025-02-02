import {Paths} from '@src/constants';
import BaseService from './BaseService';
import {PaginationProps} from '@src/constants/t';

class TrifleService extends BaseService {
  constructor() {
    super();
  }
  async selectJiras(page: PaginationProps) {
    const result = await this.instance.get(`${Paths.trifleJira}/selectJiras`, {
      params: {
        ...page,
        sort: JSON.stringify({createTime: -1}),
      },
    });
    return result.data;
  }

  async selectJiraPeople() {
    const result = await this.instance.get(
      `${Paths.trifleJira}/selectJiraPeople`,
    );
    return result.data;
  }

  async selectJira(id: string) {
    const result = await this.instance.get(`${Paths.trifleJira}?id=${id}`);
    return result.data;
  }

  async insertJira(data: any) {
    const result = await this.instance.post(Paths.trifleJira, data);
    return result.data;
  }

  async updateJira(data: any) {
    const result = await this.instance.put(Paths.trifleJira, data);
    return result.data;
  }

  async deleteJira(id: string) {
    const result = await this.instance.delete(`${Paths.trifleJira}?id=${id}`);
    return result.data;
  }

  async selectPasswords(page: PaginationProps) {
    const result = await this.instance.get(
      `${Paths.triflePassword}/selectPassword`,
      {
        params: page,
      },
    );
    return result.data;
  }

  async selectPassword(id: string) {
    const result = await this.instance.get(`${Paths.triflePassword}?id=${id}`);
    return result.data;
  }

  async insertPassword(data: any) {
    const result = await this.instance.post(Paths.triflePassword, data);
    return result.data;
  }

  async updatePassword(data: any) {
    const result = await this.instance.put(Paths.triflePassword, data);
    return result.data;
  }

  async deletePassword(id: string) {
    const result = await this.instance.delete(
      `${Paths.triflePassword}?id=${id}`,
    );
    return result.data;
  }
}

export default TrifleService;
