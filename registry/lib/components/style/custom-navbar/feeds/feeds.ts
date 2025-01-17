import { CustomNavbarItemInit } from '../custom-navbar-item'

export const feeds: CustomNavbarItemInit = {
  name: 'feeds',
  displayName: '动态',
  content: '动态',

  href: 'https://t.bilibili.com/',
  touch: true,
  active: document.URL.replace(window.location.search, '') === 'https://t.bilibili.com/',
  contentMounted: async item => {
    const { updateInterval, getNotifyCount } = await import('@/components/feeds/notify')
    const updateCount = async () => {
      const count = await getNotifyCount()
      item.notifyCount = count
    }
    await updateCount()
    setInterval(() => updateCount(), updateInterval)
  },
  loginRequired: true,

  popupContent: () => import('./NavbarFeeds.vue').then(m => m.default),
  boundingWidth: 300,
  noPopupPadding: true,
}
