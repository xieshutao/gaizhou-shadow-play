// app.js — 盖州皮影戏 · 非遗传承小程序
// 全局生命周期、AI对话模块初始化、版本管理

App({
  onLaunch(options) {
    // 获取系统信息
    const sys = wx.getSystemInfoSync()
    this.globalData.systemInfo = sys
    this.globalData.statusBarHeight = sys.statusBarHeight
    this.globalData.screenWidth = sys.screenWidth
    this.globalData.screenHeight = sys.screenHeight

    // 版本更新检查
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已就绪，是否重启应用？',
              success: (res) => { if (res.confirm) updateManager.applyUpdate() }
            })
          })
        }
      })
    }

    // 记录启动场景
    this.globalData.launchScene = options.scene
    this.globalData.launchTime = Date.now()
  },

  onShow(options) {
    // 从后台切回前台
    this.globalData.lastShowTime = Date.now()
  },

  onHide() {
    // 切到后台
  },

  onError(err) {
    console.error('[App] 全局错误:', err)
  },

  globalData: {
    // 系统信息
    systemInfo: null,
    statusBarHeight: 20,
    screenWidth: 375,
    screenHeight: 667,

    // 启动信息
    launchScene: '',
    launchTime: 0,
    lastShowTime: 0,

    // AI 对话模块状态（各页面共享）
    aiState: {
      currentCharacter: null,  // 当前对话人物
      isInConversation: false,
      historyCount: 0
    },

    // 用户偏好
    userPrefs: {
      soundEnabled: true,
      subtitleEnabled: true
    }
  }
})
