// index.js
const sfx = require('../../utils/sfx.js')
const BGM_PATH = '/audio/盖州风影.mp3'

Page({
  data: {
    isMusicPlaying: false
  },

  onLoad() {
    // 使用 InnerAudioContext — 简单可靠
    const bgAudio = wx.createInnerAudioContext()
    bgAudio.src = BGM_PATH
    bgAudio.loop = true
    bgAudio.obeyMuteSwitch = false  // 忽略静音开关

    bgAudio.onPlay(() => {
      this.setData({ isMusicPlaying: true })
    })
    bgAudio.onPause(() => {
      this.setData({ isMusicPlaying: false })
    })
    bgAudio.onStop(() => {
      this.setData({ isMusicPlaying: false })
    })
    bgAudio.onError((err) => {
      console.log('BGM失败:', err)
    })

    // 自动播放（需要等音频加载）
    bgAudio.onCanplay(() => {
      bgAudio.play()
    })

    this.bgAudio = bgAudio
  },

  onToggleMusic() {
    sfx.play('tap')
    if (this.data.isMusicPlaying) {
      this.bgAudio.pause()
    } else {
      this.bgAudio.play()
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
    if (this.bgAudio) {
      this.bgAudio.destroy()
    }
  }
})
