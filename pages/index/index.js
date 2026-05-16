// index.js
const BGM_PATH = '/audio/盖州风影.mp3'

// 音效路径
const SFX = {
  tap: '/audio/sfx/tap.wav',
  nav: '/audio/sfx/nav.wav',
  card: '/audio/sfx/card.wav',
}

Page({
  data: {
    isMusicPlaying: false
  },

  bgmAudio: null,
  sfxPool: [],  // 音效池复用

  onLoad() {
    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.src = BGM_PATH
    this.bgmAudio.loop = true
    this.bgmAudio.obeyMuteSwitch = false
    this.bgmAudio.autoplay = true
    this.bgmAudio.play()
    this.setData({ isMusicPlaying: true })

    this.bgmAudio.onError((err) => {
      console.log('BGM失败:', err)
      this.setData({ isMusicPlaying: false })
    })
  },

  // 播放短音效
  _playSfx(sfxPath) {
    const audio = wx.createInnerAudioContext()
    audio.src = sfxPath
    audio.obeyMuteSwitch = false
    audio.play()
    // 播完自动销毁
    audio.onEnded(() => audio.destroy())
    audio.onError(() => audio.destroy())
  },

  onToggleMusic() {
    this._playSfx(SFX.tap)
    if (this.data.isMusicPlaying) {
      this.bgmAudio.pause()
      this.setData({ isMusicPlaying: false })
    } else {
      this.bgmAudio.play()
      this.setData({ isMusicPlaying: true })
    }
  },

  onTapNav1() {
    this._playSfx(SFX.nav)
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav2() {
    this._playSfx(SFX.nav)
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav3() {
    this._playSfx(SFX.nav)
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },

  onTapFloatBtn() {
    this._playSfx(SFX.tap)
    wx.switchTab({ url: '/pages/interactive/interactive' })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onUnload() {
    if (this.bgmAudio) this.bgmAudio.destroy()
  }
})
