import { ComponentMetadata } from '@/components/types'
import { videoAndBangumiUrls } from '@/core/utils/urls'

export const component: ComponentMetadata = {
  name: 'biliplusRedirect',
  displayName: 'BiliPlus跳转支持',
  description: {
    'zh-CN': '在视频/番剧/空间中, 可以从功能中的按钮点击转到BiliPlus上对应的页面.',
  },
  urlInclude: [
    ...videoAndBangumiUrls,
    '//space.bilibili.com',
  ],
  entry: none,
  tags: [
    componentsTags.video,
    componentsTags.utils,
  ],
  widget: {
    component: () => import('./BiliplusRedirect.vue').then(m => m.default),
  },
}
