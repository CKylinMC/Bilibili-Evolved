import { ComponentMetadata } from '@/components/types'
import { hasVideo } from '@/core/spin-query'

export const component: ComponentMetadata = {
  name: 'downloadVideoAndAudio',
  displayName: '下载视频和音频',
  entry: none,
  reload: none,
  unload: none,
  widget: {
    component: () => import('./Widget.vue').then(m => m.default),
    condition: () => hasVideo(),
  },
  tags: [
    componentsTags.video,
  ],
  options: {
    basicConfig: {
      defaultValue: {},
      displayName: '基础配置',
      hidden: true,
    },
  },
  // plugin,
}
