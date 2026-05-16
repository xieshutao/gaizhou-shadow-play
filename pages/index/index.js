// index.js
const BGM_PATH = '/audio/bgm.mp3'  // 音乐文件路径，等你给我后再替换

Page({
  data: {
    isMusicPlaying: false
  },

  // 音频上下文
  bgmAudio: null,

  onLoad() {
    // 创建音频实例
    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.src = BGM_PATH
    this.bgmAudio.loop = true
    this.bgmAudio.obeyMuteSwitch = false  // 静音模式下也播放

    // 自动播放
    this.bgmAudio.autoplay = true
    this.bgmAudio.play()
    this.setData({ isMusicPlaying: true })

    // 播放失败处理
    this.bgmAudio.onError((err) => {
      console.log('BGM播放失败:', err)
      this.setData({ isMusicPlaying: false })
    })
  },

  // 点击切换音乐
  onToggleMusic() {
    if (this.data.isMusicPlaying) {
      this.bgmAudio.pause()
      this.setData({ isMusicPlaying: false })
    } else {
      this.bgmAudio.play()
      this.setData({ isMusicPlaying: true })
    }
  },

  // 左侧导航
  onTapNav1() {
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav2() {
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },
  onTapNav3() {
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },

  // 右侧悬浮按钮
  onTapFloatBtn() {
    wx.switchTab({ url: '/pages/interactive/interactive' })
  },

  // 同步 tabBar 选中态
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  // 页面卸载时销毁音频
  onUnload() {
    if (this.bgmAudio) {
      this.bgmAudio.destroy()
    }
  }
})
