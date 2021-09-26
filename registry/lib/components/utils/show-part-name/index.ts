import { ComponentMetadata } from '@/components/types'
import { addStyle, removeStyle } from '@/core/style'
import { videoUrls } from '@/core/utils/urls'
import { videoChange } from '@/core/observer'
import style from './showid.scss'
import { injectPartNameToPage } from './showid'

const name = 'showPartName'
const entry = () => {
  addStyle(style, name)
  videoChange(async () => {
    injectPartNameToPage(unsafeWindow)
  })
}
export const component: ComponentMetadata = {
  name,
  entry,
  reload: entry,
  unload: () => {
    removeStyle(name)
  },
  displayName: '显示视频分P名',
  tags: [
    componentsTags.video,
    componentsTags.utils,
  ],
  description: {
    'zh-CN': '在视频信息栏显示分P名',
  },
  urlInclude: videoUrls,
}
