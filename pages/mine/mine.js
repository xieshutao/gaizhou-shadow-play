// pages/mine/mine.js
const sfx = require('../../utils/sfx.js')

// 我的 — 个人信息/收藏/设置

const app = getApp()

Page({
  data: {
    // 用户信息
    userInfo: null,
    hasUserInfo: false,

    // 统计
    chatCount: 0,
    playCount: 0,

    // 设置
    soundEnabled: true,
    subtitleEnabled: true,

    // 菜单
    menus: [
      { id: 'fav', icon: '✦', title: '我的收藏', desc: '收藏的AI造戏组合' },
      { id: 'history', icon: '◷', title: '对话记录', desc: '查看历史对话' },
      { id: 'about', icon: '◈', title: '关于盖州皮影', desc: '非遗传承 · 光影两百年' },
    ]
  },

  onLoad() {
    // 读取缓存统计
    try {
      const chatCount = wx.getStorageSync('chat_count') || 0
      const playCount = wx.getStorageSync('play_count') || 0
      this.setData({ chatCount, playCount })
    } catch (e) {}

    // 读取设置
    try {
      const prefs = wx.getStorageSync('user_prefs') || {}
      this.setData({
        soundEnabled: prefs.soundEnabled !== false,
        subtitleEnabled: prefs.subtitleEnabled !== false
      })
    } catch (e) {}
  },

  onShow() {
    // 同步 tabBar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }

    // 更新全局数据
    try {
      const aiState = app.globalData?.aiState || {}
      const chatCount = aiState.historyCount || wx.getStorageSync('chat_count') || 0
      this.setData({ chatCount })
    } catch (e) {}
  },

  // 获取用户信息
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('user_info', e.detail.userInfo)
    }
  },

  // 菜单点击
  onTapMenu(e) {
    sfx.play('tap')
    const id = e.currentTarget.dataset.id
    switch (id) {
      case 'fav':
        wx.showToast({ title: '暂无收藏', icon: 'none' })
        break
      case 'history':
        wx.showToast({ title: '暂无历史记录', icon: 'none' })
        break
      case 'about':
        wx.navigateTo({ url: '/pages/knowledge/knowledge' })
        break
    }
  },

  // 设置开关
  onToggleSound(e) {
    const val = e.detail.value
    this.setData({ soundEnabled: val })
    wx.setStorageSync('user_prefs', {
      ...wx.getStorageSync('user_prefs'),
      soundEnabled: val
    })
  },

  onToggleSubtitle(e) {
    const val = e.detail.value
    this.setData({ subtitleEnabled: val })
    wx.setStorageSync('user_prefs', {
      ...wx.getStorageSync('user_prefs'),
      subtitleEnabled: val
    })
  }
})
