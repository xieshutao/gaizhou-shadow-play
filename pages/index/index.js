// index.js
const sfx = require('../../utils/sfx.js')

const BGM_PATH = '/audio/盖州风影.mp3'

Page({
  data: {
    isMusicPlaying: false
  },

  bgmAudio: null,

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

  onToggleMusic() {
    sfx.play('tap')
    if (this.data.isMusicPlaying) {
      this.bgmAudio.pause()
      this.setData({ isMusicPlaying: false })
    } else {
      this.bgmAudio.play()
      this.setData({ isMusicPlaying: true })
    }
  },

  onTapNav1() {
    sfx.play('nav')
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav2() {
    sfx.play('nav')
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav3() {
    sfx.play('nav')
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },

  onTapFloatBtn() {
    sfx.play('tap')
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
