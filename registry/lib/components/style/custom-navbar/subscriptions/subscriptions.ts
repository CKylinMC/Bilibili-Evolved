import { getUID } from '@/core/utils'
import { CustomNavbarItemInit } from '../custom-navbar-item'

export enum SubscriptionTypes {
  bangumi = 'bangumi',
  cinema = 'cinema',
}
const uid = getUID()
export const subscriptions: CustomNavbarItemInit = {
  name: 'subscriptions',
  displayName: '订阅',
  content: '订阅',

  href: `https://space.bilibili.com/${uid}/bangumi`,
  touch: true,
  active: [
    `https://space.bilibili.com/${uid}/bangumi`,
    `https://space.bilibili.com/${uid}/cinema`,
    `https://space.bilibili.com/${uid}/subs`,
  ].includes(document.URL.replace(/\?.*$/, '')),
  loginRequired: true,

  boundingWidth: 380,
  noPopupPadding: true,
  popupContent: () => import('./NavbarSubscriptions.vue').then(m => m.default),
}
