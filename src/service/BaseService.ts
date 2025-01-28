import Envs from '@src/constants/envs';
import {useCaches} from '@src/constants/store';
import {EnvKeys} from '@src/constants/t';
import axios, {AxiosInstance} from 'axios';
export default class BaseService {
  instance: AxiosInstance = null;
  constructor() {
    this.instance = axios.create({
      // baseURL: Config.SERVER,
      baseURL: new Envs().get(EnvKeys.HOST),
      timeout: 10000,
      headers: {
        token: useCaches.getState().user?.token || '',
      },
    });
    this.instance.interceptors.response.use(response => {
      return response;
    });
  }
}
