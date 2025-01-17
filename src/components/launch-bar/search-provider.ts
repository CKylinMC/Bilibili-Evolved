import { formData, getUID } from '@/core/utils'
import { getJson } from '@/core/ajax'
import { LaunchBarActionProvider } from './launch-bar-action'
import { addHistoryItem } from './history-provider'

export const search = (keyword: string) => {
  if (!keyword) {
    return
  }
  addHistoryItem(keyword)
  const params = {
    keyword,
    from_source: 'nav_suggest_new',
  }
  window.open(`https://search.bilibili.com/all?${formData(params)}`, '_blank')
}
export const searchProvider: LaunchBarActionProvider = {
  name: 'search',
  getActions: async input => {
    const api = `https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&userid=${getUID()}&bangumi_acc_num=1&special_acc_num=1&topic_acc_num=1&upuser_acc_num=3&tag_num=10&special_num=10&bangumi_num=10&upuser_num=3&term=${input}`
    const json = await getJson(api)
    if (json.code !== 0) {
      return []
    }
    const results: { value: string, name: string }[] = lodash.get(json, 'result.tag')
    if (!results) {
      return []
    }
    return results.map(result => ({
      name: result.value,
      explicitSelect: true,
      icon: 'search',
      content: async () => Vue.extend({
        render: h => {
          const content = h('div', {
            domProps: {
              innerHTML: result.name.replace(/suggest_high_light/g, 'suggest-highlight'),
            },
          })
          return content
        },
      }),
      action: () => search(result.value),
    }))
  },
  // getEnterAction: () => input => search(input),
}
