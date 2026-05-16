// custom-tab-bar/index.js
// 国风印章风格 — 底部导航栏

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconChar: '幕'
      },
      {
        pagePath: '/pages/interactive/interactive',
        text: '互动馆',
        iconChar: '戏'
      },
      {
        pagePath: '/pages/elder-chat/elder-chat',
        text: '作坊',
        iconChar: '刻'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
        iconChar: '我'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const item = this.data.list[index]
      const url = item.pagePath

      if (this.data.selected === index) return

      wx.switchTab({
        url,
        success: () => {
          this.setData({ selected: index })
        },
        fail: (err) => {
          console.error('switchTab fail:', err)
        }
      })
    }
  }
})
