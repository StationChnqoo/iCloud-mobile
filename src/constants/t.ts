import { z } from "zod";

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

export interface Property {
  _id: string; // 唯一标识符
  id: string; // 交易 ID
  wechat: string; // 微信支付金额（字符串类型，可能包含小数）
  alipay: string; // 支付宝支付金额（字符串类型，可能包含小数）
  unionpay: string; // 银联支付金额（字符串类型，可能包含小数）
  cash: string; // 现金支付金额（字符串类型，可能包含小数）
  carpooling: string; // 拼车支付金额（字符串类型，可能包含小数）
  eastmoney: string; // 东方财富支付金额（字符串类型，可能包含小数）
  housefund: string; // 公积金支付金额（字符串类型，可能包含小数）
  createTime: number; // 创建时间（时间戳，单位为毫秒）
  settleDate: number; // 结算日期（时间戳，单位为毫秒）
  sum: string; // 总金额（字符串类型，可能包含小数）
  userId: string; // 用户 ID
}

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
  _id: z.string().default(""),
  id: z.string().default(""),
  title: z.string().default(""),
  message: z.string().default(""),
  people: z.array(z.string()).default([]),
  version: z.string().default(""),
  complexity: z.number().default(0),
  completeDate: z.number().default(0),
  updateTime: z.string().default(Date.now().toString()),
  createTime: z.string().default(Date.now().toString()),
  userId: z.string().default(""),
});

// 生成默认的空对象
export type Jira = z.infer<typeof JiraSchema>;
export interface Password {
  _id: string;            // 数据的唯一标识符
  id: string;             // 项目的 ID
  title: string;          // 标题
  message: string;        // 消息（可以为空字符串）
  name: string;           // 名称
  password: string;       // 密码
  platform: string;       // 平台类型（如 'web'）
  updateTime: string;     // 更新时间（空字符串表示尚未设置）
  createTime: number;     // 创建时间（时间戳，单位为毫秒）
  link: string;           // 链接地址
  userId: string;         // 用户 ID
}