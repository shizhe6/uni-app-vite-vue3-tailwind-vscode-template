/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  records: T[]
  /** 总条数 */
  total: number
  /** 当前页数 */
  current: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  size: number
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  current?: number
  /** 页大小：默认值为 10 */
  size?: number
}

/** 普通结果 */
export type CommonResult = {
  data: string
}
