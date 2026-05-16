// interactive.js
const sfx = require('../../utils/sfx.js')

Page({
  data: {
    pressing1: false,
    pressing2: false,
    pressing3: false
  },

  onPress1() { this.setData({ pressing1: true }) },
    sfx.play('tap')
  onRelease1() { this.setData({ pressing1: false }) },

  onPress2() { this.setData({ pressing2: true }) },
    sfx.play('tap')
  onRelease2() { this.setData({ pressing2: false }) },

  onPress3() { this.setData({ pressing3: true }) },
    sfx.play('tap')
  onRelease3() { this.setData({ pressing3: false }) },

  onTapBtn1() {
    sfx.play('tap')
    wx.navigateTo({ url: '/pages/elder-chat/elder-chat' })
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
