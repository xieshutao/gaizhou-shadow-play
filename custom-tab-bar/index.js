// custom-tab-bar/index.js
// 自定义底部导航栏 — 国风金色主题

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconClass: 'tab-home'
      },
      {
        pagePath: '/pages/interactive/interactive',
        text: '互动馆',
        iconClass: 'tab-interactive'
      },
      {
        pagePath: '/pages/elder-chat/elder-chat',
        text: '作坊',
        iconClass: 'tab-workshop'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
        iconClass: 'tab-mine'
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
        }
      })
    }
  }
})
