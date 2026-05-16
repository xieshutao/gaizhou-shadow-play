// pages/elder-chat/elder-chat.js
// 盖州皮影作坊 — 舞台级AI人物对话

var CHARACTERS = {
  master: { id: 'master', name: '老师傅', title: '盖州皮影老艺人', imgClosed: '/image3/laor1.png', imgOpen: '/image3/laor2.png' },
  young:  { id: 'young',  name: '年轻学徒', title: '皮影技艺传承人',   imgClosed: '/image3/nianq1.png', imgOpen: '/image3/nianq1.png' },
  teen:   { id: 'teen',   name: '小徒弟',   title: '皮影小小传承人',   imgClosed: '/image3/shaonian.png', imgOpen: '/image3/shaonian.png' }
}

var _busy = false, _mouthTimer = null, _breathTimer = null
var _typewriterTimer = null, _activeChar = null

function _startMouth(page) {
  _stopMouth(page)
  if (!_activeChar || _activeChar.imgOpen === _activeChar.imgClosed) {
    page.setData({ charPulse: true }); return
  }
  page.setData({ charImg: _activeChar.imgOpen })
  var open = false
  _mouthTimer = setInterval(function () {
    open = !open
    page.setData({ charImg: open ? _activeChar.imgOpen : _activeChar.imgClosed })
  }, 140)
}

function _stopMouth(page) {
  if (_mouthTimer) { clearInterval(_mouthTimer); _mouthTimer = null }
  if (_activeChar) page.setData({ charImg: _activeChar.imgClosed, charPulse: false })
}

function _typewriter(page, text, onDone) {
  if (_typewriterTimer) clearInterval(_typewriterTimer)
  var i = 0; page.setData({ subtitle: '' })
  _typewriterTimer = setInterval(function () {
    if (i < text.length) { page.setData({ subtitle: text.slice(0, i + 1) }); i++ }
    else { clearInterval(_typewriterTimer); _typewriterTimer = null; if (onDone) onDone() }
  }, 80)
}

function _startBreath(page) {
  _stopBreath(page)
  var up = false
  _breathTimer = setInterval(function () { up = !up; page.setData({ breathUp: up }) }, 2500)
}

function _stopBreath(page) {
  if (_breathTimer) { clearInterval(_breathTimer); _breathTimer = null }
  page.setData({ breathUp: false })
}

function _doReply(userText, page) {
  if (_busy) return; _busy = true
  _stopBreath(page)
  page.setData({ isProcessing: true })
  setTimeout(function () {
    var replies = {
      master: '一口道尽千古事，双手对舞百万兵。孩子，皮影戏的魂儿，在光影之间。',
      young: '我跟师傅学了五年，越学越觉得皮影这手艺深得很。',
      teen: '爷爷说等我刻出第一个皮影人，就带我去庙会表演。'
    }
    var reply = replies[_activeChar.id] || '你好！'
    page.setData({ isProcessing: false, isSpeaking: true })
    _startMouth(page)
    _typewriter(page, reply, function () {
      setTimeout(function () {
        _stopMouth(page)
        page.setData({ isSpeaking: false, subtitle: '', userSubtitle: '' })
        _startBreath(page)
        _busy = false
      }, Math.max(1500, reply.length * 220))
    })
  }, 600 + Math.random() * 1000)
}

Page({
  data: {
    scenePhase: 'intro', introText: '', introVisible: false,
    highlightedChar: null,
    charName: '', charTitle: '', charImg: '',
    charPulse: false, breathUp: false,
    isRecording: false, isSpeaking: false, isProcessing: false,
    micRipple: false, recorderError: false,
    subtitle: '', userSubtitle: '', inputText: '',
    particles: []
  },

  onLoad() {
    _busy = false; _activeChar = null
    var p = []
    for (var i = 0; i < 15; i++) {
      p.push({ id: i, left: Math.floor(Math.random() * 90) + 5, delay: (Math.random() * 6).toFixed(1), duration: (4 + Math.random() * 6).toFixed(1), size: (4 + Math.random() * 6).toFixed(0) })
    }
    this.setData({ particles: p })
    this._startIntro()
  },

  onUnload() {
    _stopMouth(this); _stopBreath(this)
    if (_typewriterTimer) clearInterval(_typewriterTimer)
    _busy = false
  },

  _startIntro() {
    var page = this
    var text = '盖州，一座百年皮影作坊。老师傅带着徒弟们，正在为下一场庙会演出做准备……'
    page.setData({ scenePhase: 'intro', introText: '', introVisible: true })
    var i = 0, timer = setInterval(function () {
      if (i < text.length) { page.setData({ introText: text.slice(0, i + 1) }); i++ }
      else {
        clearInterval(timer)
        setTimeout(function () {
          page.setData({ introVisible: false })
          setTimeout(function () { page.setData({ scenePhase: 'scene' }) }, 400)
        }, 2000)
      }
    }, 60)
  },

  onSceneTouchStart(e) { if (!_busy && this.data.scenePhase === 'scene') this._checkTouch(e) },
  onSceneTouchMove(e)  { if (!_busy && this.data.scenePhase === 'scene') this._checkTouch(e) },
  onSceneTouchEnd()    { if (this.data.scenePhase === 'scene' && this.data.highlightedChar) this.setData({ highlightedChar: null }) },

  _checkTouch(e) {
    var t = e.touches[0]; if (!t) return
    var sys = wx.getSystemInfoSync(), w = sys.windowWidth, h = sys.windowHeight
    var x = t.x, y = t.y, hit = null
    if      (x > w * 0.15 && x < w * 0.50 && y > h * 0.20 && y < h * 0.60) hit = 'master'
    else if (x > w * 0.50 && x < w * 0.88 && y > h * 0.15 && y < h * 0.55) hit = 'young'
    else if (x > w * 0.12 && x < w * 0.48 && y > h * 0.48 && y < h * 0.82) hit = 'teen'
    if (hit !== this.data.highlightedChar) this.setData({ highlightedChar: hit })
  },

  onCharTapMaster() { this._selectChar('master') },
  onCharTapYoung()  { this._selectChar('young') },
  onCharTapTeen()   { this._selectChar('teen') },

  _selectChar(charId) {
    if (_busy) return; var cfg = CHARACTERS[charId]; if (!cfg) return
    _activeChar = cfg
    this.setData({
      scenePhase: 'character', charName: cfg.name, charTitle: cfg.title,
      charImg: cfg.imgClosed, charPulse: false, breathUp: false,
      subtitle: '', userSubtitle: '', isSpeaking: false, isRecording: false
    })
    _startBreath(this)
  },

  onBackToScene() {
    _busy = false; _stopMouth(this); _stopBreath(this)
    if (_typewriterTimer) { clearInterval(_typewriterTimer); _typewriterTimer = null }
    _activeChar = null
    this.setData({
      scenePhase: 'scene', charName: '', charTitle: '', charImg: '',
      subtitle: '', userSubtitle: '', charPulse: false, breathUp: false,
      isSpeaking: false, isRecording: false, isProcessing: false
    })
  },

  onPressTalk() {
    if (_busy || !_activeChar || this.data.isSpeaking || this.data.isProcessing) return
    this.setData({ isRecording: true, micRipple: true, userSubtitle: '' })
    setTimeout(() => {
      if (!this.data.isRecording) return
      this.setData({ isRecording: false, micRipple: false })
      var q = '你好'
      this.setData({ userSubtitle: q })
      _doReply(q, this)
    }, 1500)
  },

  onReleaseTalk() {
    if (!this.data.isRecording) return
    this.setData({ isRecording: false, micRipple: false })
  },

  onInputConfirm(e) {
    var text = (e.detail.value || '').trim(); if (!text || _busy || !_activeChar) return
    this.setData({ inputText: '', userSubtitle: text })
    _doReply(text, this)
  }
})
