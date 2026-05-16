// custom-tab-bar/index.js
// 国风底部导航栏 — ICHStudy 图标

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/images/tabbar/home.png',
        selectedIconPath: '/images/tabbar/home-active.png'
      },
      {
        pagePath: '/pages/interactive/interactive',
        text: '互动馆',
        iconPath: '/images/tabbar/learn.png',
        selectedIconPath: '/images/tabbar/learn-active.png'
      },
      {
        pagePath: '/pages/elder-chat/elder-chat',
        text: '作坊',
        iconPath: '/images/tabbar/study.png',
        selectedIconPath: '/images/tabbar/study-active.png'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
        iconPath: '/images/tabbar/mine.png',
        selectedIconPath: '/images/tabbar/mine-active.png'
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
