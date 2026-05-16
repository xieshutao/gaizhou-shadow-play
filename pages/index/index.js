// index.js
Page({
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
    wx.navigateTo({ url: '/pages/interactive/interactive' })
  },

  // 底部标签
  onTabInteractive() {
    wx.redirectTo({ url: '/pages/interactive/interactive' })
  }
})
