import {z} from 'zod';

export interface RealTimePrice {
  /** 股票价格 * 1000 */
  f43?: number;
  /** 股票代号 */
  f57?: string;
  /** 股票名字 */
  f58?: string;
  /** 当前净值 */
  f60?: number;
  /** 成交量 */
  f47?: number;
  /** 成交额 */
  f48?: number;
  /** 精度 */
  f59?: number;
  /** 时间 */
  f86?: number;
  /** 几级市场 */
  f107?: number;
  /** 涨跌额 */
  f169?: number;
  /** 涨跌幅 */
  f170?: number;
  /** 详情接口或者图片趋势的时候用 */
  code?: string;
}

export interface RealtimeCount {
  /** 涨跌额 */
  f3: number;
  /** 股票代码 */
  f12: string;
  /** 涨 跌 平 */
  f104: number;
  f105: number;
  f106: number;
}

export interface SearchStockResult {
  code: string;
  innerCode: string;
  shortName: string;
  market: number; // ?.code
  pinyin: string;
  securityType: number[];
  securityTypeName: string; // 什么市场 沪A/深A
  smallType: number;
  status: number;
  flag: number;
  extSmallType: number;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  code: string;
  password: string;
  token: string;
  avatar: string;
}

export enum LoginInputAction {
  id,
  password,
}

export enum EnvKeys {
  HOST = 0,
}

export const PropertySchema = z.object({
  _id: z.string().default(''),
  id: z.string().default(''),
  wechat: z.string().default('0'),
  alipay: z.string().default('0'),
  unionpay: z.array(z.string()).default([]),
  cash: z.string().default('0'),
  carpooling: z.array(z.string()).default([]),
  eastmoney: z.string().default('0'),
  housefund: z.string().default('0'),
  createTime: z.number().default(Date.now()),
  settleDate: z.number().default(Date.now()),
  sum: z.string().default('0'),
  userId: z.string().default(''),
});

export type Property = z.infer<typeof PropertySchema>;

export interface OtherCountryStock {
  f1: number;
  f2: number; // 净值
  f3: number; // 涨跌幅
  f4: number;
  f12: string; // 英文
  f13: number;
  f14: string; // 中文
  f152: number;
}

export interface PaginationProps {
  page: number;
  pageSize: number;
}

export const JiraSchema = z.object({
  _id: z.string().default(''),
  id: z.string().default(''),
  title: z.string().default(''),
  message: z.string().default(''),
  people: z.array(z.string()).default([]),
  version: z.string().default(''),
  complexity: z.number().default(0),
  completeDate: z.number().default(0),
  updateTime: z.number().default(0),
  createTime: z.number().default(0),
  userId: z.string().default(''),
});

export type Jira = z.infer<typeof JiraSchema>;

export const PasswordSchema = z.object({
  _id: z.string().default(''),
  id: z.string().default(''),
  title: z.string().default(''),
  message: z.string().default(''),
  name: z.string().default(''),
  password: z.string().default(''),
  platform: z.string().default(''),
  updateTime: z.number().default(0),
  createTime: z.number().default(0),
  link: z.string().default(''),
  userId: z.string().default(''),
});
export type Password = z.infer<typeof PasswordSchema>;
