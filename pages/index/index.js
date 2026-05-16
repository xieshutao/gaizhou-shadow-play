// index.js
const sfx = require('../../utils/sfx.js')
const BGM_PATH = '/audio/盖州风影.mp3'

Page({
  data: {
    isMusicPlaying: false
  },

  onLoad() {
    // 使用 BackgroundAudioManager — 微信系统级播放器
    const bgAudio = wx.getBackgroundAudioManager()
    bgAudio.title = '盖州风影'
    bgAudio.epname = '盖州皮影戏'
    bgAudio.singer = '非遗传承'
    bgAudio.coverImgUrl = '/images/tabbar/home.png'
    bgAudio.src = BGM_PATH
    bgAudio.loop = true

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

    // 获取当前状态
    if (!bgAudio.paused) {
      this.setData({ isMusicPlaying: true })
    }

    // ★ 自动播放
    bgAudio.play()

    this.bgAudio = bgAudio
  },

  onToggleMusic() {
    sfx.play('tap')
    if (this.data.isMusicPlaying) {
      this.bgAudio.pause()
    } else {
      this.bgAudio.src = BGM_PATH  // 确保src还在
      this.bgAudio.title = '盖州风影'
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
  }
})
