// Ported from ckylin-bilibili-display-video-id

import { select } from '@/core/spin-query'
import { playerReady } from '@/core/utils'
import { registerAndGetData } from '@/plugins/data'

const getAPI = (bvid:string) => fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`).then(raw => raw.json())
const getAidAPI = (aid:string) => fetch(`https://api.bilibili.com/x/web-interface/view?aid=${aid}`).then(raw => raw.json())
const getUrlParam = (key:string) => (new URL(location.href)).searchParams.get(key)
const getOrNew = (id:string, parent:HTMLElement) => {
  let target = document.querySelector(`#${id}`)
  if (!target) {
    target = document.createElement('span')
    target.id = id
    parent.appendChild(target)
  }
  return target
}

/**
 * 等待视频页面的 aid, 如果是合集类页面, 会从 player API 中获取 aid 并赋值到 window 上
 * 
 * 复制自core中的一个废弃方法
 * @see `core/utils/index.ts` #L292-309
 */
const aidReady = async () => {
  if (unsafeWindow.aid) {
    return unsafeWindow.aid
  }
  const { sq } = await import('@/core/spin-query')
  const info = await sq(
    () => unsafeWindow?.player?.getVideoMessage?.() as { aid?: string },
    it => it?.aid !== undefined,
  )
  if (!info) {
    return null
  }
  unsafeWindow.aid = info.aid.toString()
  return info.aid as string
}

const getPageFromCid = (cid, infos) => {
  if (!cid || !infos || !infos.pages) { return 1 }
  if (infos.pages.length === 1) { return 1 }
  for (const page of infos.pages) {
    if (!page) { continue }
    if (page.cid === cid) { return page.page }
  }
  return 1
}

const defaultConfig = {
  showInNewLine: false,
}

export const injectPartNameToPage = async (context:Window) => {
  if (document.querySelector('#bilibiliShowInfos')) { return }
  await playerReady()
  let infos
  const [config] = registerAndGetData('showPartName', defaultConfig)
  const name = 'bilibiliShowPN-be'
  if (location.pathname.startsWith('/medialist')) {
    let { aid } = context
    if (!aid) {
      const activeVideo = await select('.player-auxiliary-playlist-item-active')
      aid = activeVideo.getAttribute('data-aid')
    }
    const apidata = await getAidAPI(aid)
    infos = apidata.data
  } else {
    infos = context.vd || (await getAidAPI(await aidReady())).data;
  }
  console.log("showid debug",context,context.vd,infos,(await getAPI(context.bvid)).data,(await getAidAPI(await aidReady())).data)
  infos.p = getUrlParam('p') || getPageFromCid(context.cid, infos)

  const av_infobar = await select('.video-data')
  if (!av_infobar) { return }
  let av_root
  if (config.showInNewLine) {
    av_root = getOrNew(name, av_infobar.parentElement)
  } else {
    let rootel = document.querySelector(`#${name}`)
    if (!rootel) {
      rootel = document.createElement('span')
      rootel.id = name
      av_infobar.appendChild(rootel)
    }
    av_root = rootel
  }
  let part
  try {
    part = infos.pages[infos.p - 1]
  } catch (e) {
    part = infos.pages[0]
  }
  const currentPageName = part.part.length ? `${part.part}` : ''
  let currentPageNum
  let delimiters
  if (infos.videos !== 1) {
    currentPageNum = `P ${infos.p}/${infos.videos}`
    delimiters = ['\n', ' ']
  } else {
    currentPageNum = ''
    delimiters = ['', '']
  }
  av_root.title = currentPageNum + delimiters[0] + currentPageName
  av_root.innerText = currentPageNum + delimiters[1] + currentPageName
}
