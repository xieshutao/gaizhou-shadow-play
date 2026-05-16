// interactive.js
const sfx = require('../../utils/sfx.js')

Page({
  data: {
    pressing1: false,
    pressing2: false,
    pressing3: false
  },

  onPress1() {
    sfx.play('tap')
    this.setData({ pressing1: true })
  },
  onRelease1() { this.setData({ pressing1: false }) },

  onPress2() {
    sfx.play('tap')
    this.setData({ pressing2: true })
  },
  onRelease2() { this.setData({ pressing2: false }) },

  onPress3() {
    sfx.play('tap')
    this.setData({ pressing3: true })
  },
  onRelease3() { this.setData({ pressing3: false }) },

  onTapBtn1() {
    sfx.play('tap')
    wx.switchTab({ url: '/pages/elder-chat/elder-chat' })
  },

  onTapBtn2() {
    sfx.play('tap')
    wx.navigateTo({ url: '/pages/create-play/create-play' })
  },

  onTapBtn3() {
    sfx.play('tap')
    wx.navigateTo({ url: '/pages/knowledge/knowledge' })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  }
})
