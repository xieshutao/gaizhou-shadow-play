// index.js
const sfx = require('../../utils/sfx.js')
const BGM_PATH = '/audio/盖州风影.mp3'

Page({
  data: {
    isMusicPlaying: false,
    homeCards: [
      { title: '浏览皮影戏', desc: '欣赏经典盖州皮影剧目', meta: ['热门', '推荐'] },
      { title: '学习制作', desc: '跟随老艺人学皮影雕刻技艺', meta: ['新手'] },
      { title: 'AI 造戏', desc: '用 AI 生成属于你的皮影故事', meta: ['新功能', '尝鲜'] },
      { title: '老易传音', desc: '与传承人面对面交流', meta: ['互动'] },
      { title: '知识馆', desc: '皮影历史文化知识大全', meta: ['必读'] }
    ]
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

  onCardTap(e) {
    const { index } = e.detail
    const routes = [
      '/pages/knowledge/knowledge',
      '/pages/knowledge/knowledge',
      '/pages/ai-create/ai-create',
      '/pages/interactive/interactive',
      '/pages/knowledge/knowledge'
    ]
    const route = routes[index]
    if (route) {
      // tabBar 页面用 switchTab
      if (route.includes('interactive')) {
        wx.switchTab({ url: route })
      } else {
        wx.navigateTo({ url: route })
      }
    }
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
