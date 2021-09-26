// Ported from ckylin-bilibili-display-video-id

import { select } from '@/core/spin-query'
import { playerReady } from '@/core/utils'

let ob;

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

const getPageFromCid = (cid, infos) => {
  if (!cid || !infos || !infos.pages) { return 1 }
  if (infos.pages.length === 1) { return 1 }
  for (const page of infos.pages) {
    if (!page) { continue }
    if (page.cid === cid) { return page.page }
  }
  return 1
}

export const registerVideoChangeHandler = async (context:Window) => {
    const video = await select(".bilibili-player-video video");
    if (!video) return;
    unregisterVideoChangeHandler(context);
    const observer = new MutationObserver(async e => {
        if (e[0].target.src) {
            injectPartNameToPage(context);
        }
    });
    observer.observe(video, { attributes: true, childList: false });
    ob = observer;
}

export const unregisterVideoChangeHandler = async (context:Window) => {
    ob && ob.disconnect();
}

export const uninject = (context:Window)=>{
    select("#bilibiliShowPN-be").then(e=>e.remove())
}

export const injectPartNameToPage = async (context:Window) => {
  if (document.querySelector('#bilibiliShowInfos')) { return }
  await playerReady()
  let infos
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
    infos = context.vd || (await getAPI(context.bvid)).data
  }
  infos.p = getUrlParam('p') || getPageFromCid(context.cid, infos)

  const av_infobar = await select('.video-data')
  if (!av_infobar) { return }
  const av_root = getOrNew(name, av_infobar as HTMLElement) as HTMLElement;
  let part: { part: string | any[] }
  try {
    part = infos.pages[infos.p - 1]
  } catch (e) {
    part = infos.pages[0]
  }
  const currentPageName = part.part.length ? part.part : ''
  let currentPageNum, delimiters
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
