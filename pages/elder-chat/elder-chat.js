// pages/elder-chat/elder-chat.js
// 盖州皮影作坊 · AI 人物对话 — 舞台级交互体验
// 整合 ASR → LLM → TTS → Animation 全流程

const fsm = require('../../modules/ai-chat/stateMachine.js')
const asr  = require('../../modules/ai-chat/asr.js')
const pipeline = require('../../modules/ai-chat/pipeline.js')
const memoryModule = require('../../modules/ai-chat/memory.js')
const emotion = require('../../modules/ai-chat/emotion.js')
const animation = require('../../modules/ai-chat/animation.js')
const sfx = require('../../utils/sfx.js')


// ========== 人物数据 ==========
const CHARACTERS = {
  master: {
    id: 'master',
    name: '林师傅',
    title: '七十岁老艺人 · 从艺五十余载',
    imageBase: '/image3/laor',
    imageFallback: '/images/stage.png',
    introText: '后生来了？我是林师傅。\n打十六岁起就跟着师傅学皮影，\n刻了一辈子驴皮，耍了一辈子影人。\n来来来，坐下，咱们聊聊。',
    persona: '老艺人林师傅，七十多岁，东北口音。说话爱用俗语歇后语，叫年轻人"孩子""后生"。提到皮影就来劲，眼里有光。'
  },
  young: {
    id: 'young',
    name: '阿诚',
    title: '年轻学徒 · 皮影技艺传承人',
    imageBase: '/image3/nianq',
    imageFallback: '/images/icon-2.png',
    introText: '你好！我是阿诚，\n跟着师傅学皮影三年多了。\n从描样子到刻驴皮，\n每一天都有新东西。\n想了解皮影吗？问我！',
    persona: '年轻皮影学徒阿诚，二十多岁，热情好学。喜欢用年轻人的方式讲传统手艺，偶尔引用师傅的话。'
  },
  teen: {
    id: 'teen',
    name: '小影',
    title: '小徒弟 · 皮影小小传承人',
    imageBase: '/image3/shaonian',
    imageFallback: '/images/icon-3.png',
    introText: '嗨！我叫小影，\n是皮影作坊最小的徒弟。\n师傅说我手巧，\n刻的小兔子活灵活现！\n你想看我刻皮影吗？',
    persona: '皮影小徒弟小影，十二三岁，活泼可爱。对皮影充满好奇，说话天真烂漫，偶尔冒出大人话。'
  }
}

// ========== 开场台词 ==========
const INTRO_FULL = '盖州皮影戏，辽南大地上传唱了两百年的光影传奇。\n\n一口道尽千古事，双手对舞百万兵。\n\n这里有三个人物等你来聊——\n老艺人林师傅、年轻学徒阿诚、小徒弟小影。\n\n轻触人物，开始对话吧。'

Page({
  data: {
    // 场景阶段
    scenePhase: 'intro',     // 'intro' | 'scene' | 'character'
    introVisible: true,
    introText: '',
    introDone: false,

    // 当前人物
    currentChar: null,       // CHARACTERS 中的 key
    charName: '',
    charTitle: '',
    charImg: '/image3/laor1.png',

    // 高亮人物
    highlightedChar: null,

    // 呼吸动画
    breathUp: false,
    charPulse: false,

    // 对话状态（由 fsm 同步）
    isSpeaking: false,
    isProcessing: false,
    isRecording: false,
    subtitle: '',
    userSubtitle: '',
    recorderError: false,
    micRipple: false,

    // 输入
    inputText: '',

    // 粒子
    particles: [],

    // 注意：stateMachine 相关状态由 fsm.bindPage 自动同步
    // fsmState, dialogueHistory 等
  },

  // ========== 生命周期 ==========
  onLoad() {
    // 生成漂浮粒子
    this._genParticles()

    // 绑定状态机
    fsm.bindPage(this)
    // 绑定内存模块
    memoryModule.bindPage(this)

    // 监听状态变化
    fsm.onChange((state, data) => {
      if (state === 'SPEAKING') {
        this.setData({ subtitle: data.replyText || '', isSpeaking: true, charPulse: true })
      } else if (state === 'PROCESSING') {
        this.setData({ isProcessing: true, subtitle: '', userSubtitle: '' })
      } else if (state === 'IDLE') {
        this.setData({
          isSpeaking: false, isProcessing: false, charPulse: false,
          subtitle: '',
        })
      }
    })

    // 启动开场打字动画
    this._typeIntro()

    // 呼吸动画循环
    this._startBreath()
  },

  onShow() {
    // 切回前台，恢复呼吸
    this._startBreath()
  },

  onHide() {
    this._stopBreath()
  },

  onUnload() {
    this._stopBreath()
    fsm.bindPage(null)
    memoryModule.bindPage(null)
  },

  // ========== 开场打字 ==========
  _typeIntro() {
    let idx = 0
    const text = INTRO_FULL
    const timer = setInterval(() => {
      if (idx < text.length) {
        this.setData({ introText: text.slice(0, idx + 1) })
        idx++
      } else {
        clearInterval(timer)
        this.setData({ introDone: true })
        // 2 秒后进入场景页
        setTimeout(() => {
          this.setData({
            scenePhase: 'scene',
            introVisible: false,
          })
        }, 1500)
      }
    }, 45)
  },

  // ========== 粒子 ==========
  _genParticles() {
    const particles = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
        size: 3 + Math.random() * 6,
      })
    }
    this.setData({ particles })
  },

  // ========== 呼吸动画 ==========
  _breathTimer: null,
  _startBreath() {
    this._stopBreath()
    this._breathTimer = setInterval(() => {
      if (this.data.isSpeaking || this.data.isProcessing) return
      this.setData({ breathUp: true })
      setTimeout(() => {
        if (!this.data.isSpeaking && !this.data.isProcessing) {
          this.setData({ breathUp: false })
        }
      }, 2500)
    }, 5000)
  },
  _stopBreath() {
    if (this._breathTimer) { clearInterval(this._breathTimer); this._breathTimer = null }
  },

  // ========== 场景触摸 ==========
  _touchTimer: null,
  onSceneTouchStart(e) {
    this._touchTimer = setTimeout(() => {
      // 长按 2 秒后随机高亮
      const chars = ['master', 'young', 'teen']
      const pick = chars[Math.floor(Math.random() * 3)]
      this.setData({ highlightedChar: pick })
      setTimeout(() => {
        this.setData({ highlightedChar: null })
      }, 1500)
    }, 2000)
  },
  onSceneTouchMove() {
    if (this._touchTimer) { clearTimeout(this._touchTimer); this._touchTimer = null }
  },
  onSceneTouchEnd() {
    if (this._touchTimer) { clearTimeout(this._touchTimer); this._touchTimer = null }
  },

  // ========== 人物点击 ==========
  onCharTapMaster() { this._selectChar('master') },
  onCharTapYoung()  { this._selectChar('young') },
  onCharTapTeen()   { this._selectChar('teen') },

  _selectChar(key) {
    const char = CHARACTERS[key]
    if (!char) return

    this.setData({
      scenePhase: 'character',
      currentChar: key,
      charName: char.name,
      charTitle: char.title,
      charImg: char.imageBase + '1.png',
      subtitle: '',
      userSubtitle: '',
      isSpeaking: false,
      isProcessing: false,
    })

    // 震动反馈
    try { wx.vibrateShort({ type: 'light' }) } catch (e) {}

    // 开场招呼
    const greeting = char.introText.split('\n')[0]
    setTimeout(() => {
      fsm.startSpeak(greeting, 'calm')
    }, 600)

    // 切换到 IDLE 让用户输入
    setTimeout(() => {
      if (fsm.is('SPEAKING')) {
        fsm.finishSpeak()
      }
    }, 3500)
  },

  // ========== 返回场景 ==========
  onBackToScene() {
    fsm.transition('IDLE')
    animation.stopSpeak()
    this.setData({
      scenePhase: 'scene',
      currentChar: null,
      subtitle: '',
      userSubtitle: '',
      isSpeaking: false,
      isProcessing: false,
      isRecording: false,
      charPulse: false,
    })
  },

  // ========== 语音输入 ==========
  onPressTalk() {
    sfx.play('tap')
    if (fsm.is('PROCESSING') || fsm.is('SPEAKING')) return

    this.setData({ isRecording: true, micRipple: true, recorderError: false })
    asr.startRecord()
  },

  onReleaseTalk() {
    if (!this.data.isRecording) return

    this.setData({ isRecording: false, micRipple: false })

    // ASR 自动调 pipeline，不需要手动处理
    // recorderManager.onStop 中会调用 pipeline.run(userText)
  },

  // ========== 文字输入 ==========
  onInputConfirm(e) {
    const text = (e.detail.value || '').trim()
    if (!text) return

    this.setData({
      inputText: '',
      userSubtitle: text,
    })

    pipeline.runFromText(text)
  },

  // ========== tabBar 同步 ==========
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this._startBreath()
  }
})
