// components/nav-back/index.js
const sfx = require('../../utils/sfx.js')

Component({
  methods: {
    onBack() {
      sfx.play('tap')
      wx.navigateBack({ delta: 1 })
    }
  }
})
