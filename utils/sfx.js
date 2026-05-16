// utils/sfx.js — 全局点击音效
const SFX_MAP = {
  tap: '/audio/sfx/tap.wav',
  nav: '/audio/sfx/nav.wav',
  card: '/audio/sfx/card.wav',
}

function play(name) {
  const path = SFX_MAP[name]
  if (!path) return
  const audio = wx.createInnerAudioContext()
  audio.src = path
  audio.obeyMuteSwitch = false
  audio.play()
  audio.onEnded(() => audio.destroy())
  audio.onError(() => audio.destroy())
}

module.exports = { play }
