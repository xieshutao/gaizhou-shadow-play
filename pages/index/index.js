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
    wx.switchTab({ url: '/pages/interactive/interactive' })
  },

  // 同步 tabBar 选中态
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  }
})
