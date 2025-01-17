import { ComponentMetadata } from '@/components/types'
import { hasVideo } from '@/core/spin-query'
import { videoAndBangumiUrls } from '@/core/utils/urls'

export const component: ComponentMetadata = {
  name: 'bvidConvert',
  displayName: 'BV号转换',
  entry: none,
  description: {
    'zh-CN': '在功能面板中显示视频的AV号和BV号.',
  },
  tags: [
    componentsTags.video,
    componentsTags.utils,
  ],
  widget: {
    component: () => import('./BvidConvert.vue').then(m => m.default),
    condition: hasVideo,
  },
  urlInclude: videoAndBangumiUrls,
}
