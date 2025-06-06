import { PageParams } from '@/types/global'

/**
 * 通用分页查询方法
 * @param api - 分页查询的API方法
 * @param dataRef - 用于存储查询结果的ref对象
 * @param finishRef - 用于标记是否加载完成的ref对象
 * @param isLoadingRef - 用于标记是否正在加载的ref对象
 * @param pageParams - 分页参数
 * @param queryParams - 请求参数
 */
export const commonPageQueryData = async <T, V>(
  api: Function,
  dataRef: Ref<T[]>,
  finishRef: Ref<boolean>,
  isLoadingRef: Ref<boolean>,
  pageParams: Required<PageParams>,
  queryParams: Ref<V>
) => {
  if (finishRef.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }

  isLoadingRef.value = true
  // 调用分页查询API
  const response = api(queryParams, pageParams)
  // console.log('response', response.records)
  // 数据追加到列表中
  dataRef.value.push(...response.records)

  // 处理分页逻辑
  isLoadingRef.value = false
  if (pageParams.current < response.pages) {
    pageParams.current++
  } else {
    finishRef.value = true
  }
}
