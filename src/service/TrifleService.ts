
import { Paths } from '@src/constants'
import BaseService from './BaseService'
import { PaginationProps } from '@src/constants/t'

class TrifleService extends BaseService {
  constructor() {
    super()
  }
  async selectKpis(page: PaginationProps) {
    const result = await this.instance.get(`${Paths.trifleKpi}/selectKpi`, { params: page })
    return result.data
  }

  async selectKpi(id: string) {
    const result = await this.instance.get(`${Paths.trifleKpi}?id=${id}`)
    return result.data
  }

  async insertKpi(data: any) {
    const result = await this.instance.post(Paths.trifleKpi, data)
    return result.data
  }

  async updateKpi(data: any) {
    const result = await this.instance.put(Paths.trifleKpi, data)
    return result.data
  }

  async deleteKpi(id: string) {
    const result = await this.instance.delete(`${Paths.trifleKpi}?id=${id}`)
    return result.data
  }

  async selectPasswords(page: PaginationProps) {
    const result = await this.instance.get(`${Paths.triflePassword}/selectPassword`, {
      params: page,
    })
    return result.data
  }

  async selectPassword(id: string) {
    const result = await this.instance.get(`${Paths.triflePassword}?id=${id}`)
    return result.data
  }

  async insertPassword(data: any) {
    const result = await this.instance.post(Paths.triflePassword, data)
    return result.data
  }

  async updatePassword(data: any) {
    const result = await this.instance.put(Paths.triflePassword, data)
    return result.data
  }

  async deletePassword(id: string) {
    const result = await this.instance.delete(`${Paths.triflePassword}?id=${id}`)
    return result.data
  }
}

export default TrifleService
