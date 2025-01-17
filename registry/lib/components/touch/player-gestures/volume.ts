/**
 * 设置视频的音量, 更新播放器的状态, 并保存这个音量
 * @param video 视频元素
 * @param volume 目标音量(0~1)
 */
export const setVolume = async (video: HTMLVideoElement, volume: number) => {
  let v = volume
  if (v > 1) {
    v = 1
  } else if (v < 0) {
    v = 0
  }

  const playerAPI = unsafeWindow.player
  if (playerAPI) {
    playerAPI.volume(v)
  } else {
    video.volume = v
  }
}
