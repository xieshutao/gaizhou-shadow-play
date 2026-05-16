# 盖州皮影戏小程序 — UI 改造研究报告

> 调研时间：2026-05-16 · 来源：GitHub 开源项目 + 微信官方文档 + iconfont 等设计资源

---

## 一、当前问题诊断

| 问题 | 现状 | 影响 |
|------|------|------|
| 导航图标 | 使用 Unicode 字符（宅戲吾 / ⌂◈◉） | 简陋、无辨识度、不像非遗应用 |
| 导航状态 | 仅颜色切换 `color:#D4AF37` | 缺少选中态视觉层次 |
| 页面标识 | 首页3个nav-item无明确功能指向 | 用户不知道点完去哪 |
| 字体 | 依赖系统宋体 `SimSun` | 部分机型无该字体，降级为黑体 |
| 缺少「我的」页 | tabbar 第三个标签无目标页 | 功能断头路 |
| 图片资源 | `/image3/` 人物图全部缺失 | AI对话页无法正常展示 |

---

## 二、参考项目分析

### 2.1 Felicityty/ICHStudy-wx ⭐10
**非遗研学小程序 (uni-app/Vue)**

| 维度 | 设计 | 可借鉴度 |
|------|------|----------|
| 底部导航 | 4个图标（首页/学习/研学/我的），每个有 普通态(-1.png) + 选中态(-2.png) | ⭐⭐⭐⭐⭐ |
| 图标风格 | 中国结/亭子/扇子/小人 — 简洁线描风 | ⭐⭐⭐⭐⭐ |
| 字体 | 使用 alicdn webfont 加载自定义字体 | ⭐⭐⭐⭐ |
| 配色 | 浅米/宣纸底色 + 棕色系 | ⭐⭐⭐ |
| 页面对应 | 首页→home, 学习→products, 研学→tourist, 我的→me | ⭐⭐⭐⭐⭐ |

**关键代码模式**（tabbar.vue）：
```
每个 tab = image(选中/未选中切换) + text标签
状态通过 props.state 控制（1/2/3/4）
跳转使用 uni.redirectTo + 绝对路径
```

### 2.2 linxizhi2021/libmini ⭐80
**文化场馆小程序（原生微信小程序）**

- 功能完整：场馆信息、活动报名、非遗培训、后台管理
- 结构规范：`miniprogram/` 下分包管理
- 有云函数 + 后台管理系统
- 可参考：管理员后台的实现思路

### 2.3 weilanwl/ColorUI ⭐12,400
**高饱和色彩小程序组件库**

- 提供大量现成 CSS 样式
- 渐变背景、卡片、按钮等组件
- 但对本项目参考有限——我们是暗金古典风，ColorUI 偏鲜亮现代

### 2.4 ljybill/miniprogram-custom-tab-bar ⭐17
**自定义底部导航栏组件**

- 功能：支持自定义样式、自动适配 iPhone X 安全区、自动读取 app.json 配置
- 需 node 编译为 dist → 对原生项目过重

### 2.5 微信官方自定义 tabBar 示例
**wechat-miniprogram/miniprogram-demo ⭐7,167**

- 官方推荐实现方式：在项目根目录创建 `custom-tab-bar/` 文件夹
- 包含 `index.js` `index.wxml` `index.wxss` `index.json`
- app.json 中设置 `"tabBar": { "custom": true, ... }`
- **最权威参考**

---

## 三、图标方案

### 3.1 推荐 iconfont 搜索词

```
非遗 | 皮影 | 中国结 | 扇子 | 亭子 | 戏台 | 古建筑
水墨 | 京剧脸谱 | 剪纸 | 灯笼 | 祥云 | 卷轴 | 印章
```

### 3.2 图标设计建议（4个Tab）

| Tab | 主题 | 推荐图标 | 含义 |
|-----|------|----------|------|
| 首页 | 皮影戏台 | 戏台/幕布/皮影人 | 门面入口 |
| 互动馆 | 交互体验 | 扇子/对话气泡/手势 | AI造戏+人物对话+百科 |
| 作坊 | AI对话 | 老师傅头像/刻刀 | 专属AI对话空间 |
| 我的 | 个人中心 | 中国结/印章/个人 | 收藏/历史/设置 |

### 3.3 图标获取方式

1. **iconfont.cn** → 搜索上述关键词 → 下载 SVG/PNG（推荐 64x64px）
2. **Figma 社区** → 搜索 "Chinese traditional icon" → 导出
3. **即时设计 (js.design)** → 搜索 "国潮非遗设计模板"
4. **千库网** → 搜索 "非遗UI" "国风图标"

---

## 四、字体方案

### 4.1 推荐字体（全部免费可商用）

| 字体 | 风格 | 适用场景 | 引入方式 |
|------|------|----------|----------|
| **思源宋体** | 端庄优雅 | 标题、正文 | Google Fonts CDN 或本地 |
| **站酷庆科黄油体** | 粗犷有力 | 大标题 | iconfont 字体图标方式 |
| **庞门正道粗书体** | 书法感 | 首页大标题 | iconfont 字体图标方式 |
| **演示悠然小楷** | 清秀雅致 | 卡片标题 | base64 嵌入 |

### 4.2 引入方式（小程序原生）

```css
/* 方式1: Google Fonts (需配置业务域名) */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap');

/* 方式2: iconfont 字体图标 (推荐) */
/* 上传字体到 iconfont → 生成字体图标 → CDN引入 */

/* 方式3: 本地 base64 (适合小字体) */
@font-face {
  font-family: 'MyFont';
  src: url('data:font/ttf;base64,...') format('truetype');
}

/* 方式4: 依赖系统字体（当前方案，回退链要写好） */
page {
  font-family: "Source Han Serif SC", "Noto Serif CJK SC", 
               "SimSun", "宋体", "STSong", serif;
}
```

---

## 五、配色分析

### 5.1 当前配色

| 用途 | 色值 | 评价 |
|------|------|------|
| 主金色 | `#D4AF37` | ✅ 很好，非遗金 |
| 背景 | `#000000` | ⚠️ 太黑，缺乏层次 |
| 卡片背景 | `rgba(28,16,6,0.93)` | ✅ 暗棕纹理感好 |
| 文字 | `rgba(255,240,210,0.9)` | ✅ 暖白，适合 |

### 5.2 ICHStudy 参考配色

| 用途 | 色值 |
|------|------|
| 主背景 | 浅米色 |
| 文字色 | 深棕 `#4A3B2C` |
| 强调色 | 朱红 `#C43A31` |
| 卡片 | 白色半透明 |

### 5.3 建议调整

```
保留：金色 #D4AF37 为主线（辨识度高）
新增：朱红 #B83A2A 为辅助强调色
新增：宣纸米 #F5F0E6 用于知识馆等阅读型页面背景
背景层次：纯黑 → 暗棕渐变 `#0a0402 → #120904`
```

---

## 六、具体改造方案（按优先级）

### 🔴 P0 — 立即修改（影响可用性）

**1. 自定义 TabBar（替换 Unicode 图标）**

项目结构：
```
custom-tab-bar/
  index.js      ← 组件逻辑
  index.json    ← { "component": true }
  index.wxml    ← 4个tab布局
  index.wxss    ← 样式
images/tabbar/
  home.png / home-active.png
  interactive.png / interactive-active.png  
  workshop.png / workshop-active.png
  mine.png / mine-active.png
```

实施方案：
- app.json 增加 `"tabBar": { "custom": true, "list": [...] }`
- 从 iconfont 下载 4 组图标（普通态 + 选中态）
- 选中态：金色 glow + scale(1.05)
- 各页面 `onShow()` 中调用 `this.getTabBar().setData({ selected: X })`

**2. 「我的」页面**

创建 `pages/mine/mine`：
- 用户头像/昵称（wx.getUserProfile）
- 对话历史（从本地缓存读取）
- 收藏的AI造戏组合
- 设置（音效开关/字幕开关）
- 关于（非遗介绍 + 版本号）

**3. 补全缺失图片资源**

```
需要用户提供的 image3/ 图片：
  laor1.png / laor2.png    — 老师傅（闭嘴/张嘴，约 500×800px PNG）
  nianq1.png               — 年轻学徒
  shaonian.png             — 小徒弟
  bg.jpg                   — 作坊背景（750×1334px）
```

### 🟡 P1 — 重要优化

**4. 首页导航增加功能说明**

每个 nav-item 下方加一行小字描述：
```
盖州皮影 → 「了解皮影」
历史渊源 → 「百年传承」
艺术特色 → 「唱腔·雕刻·操影」
```

**5. 知识馆页面增加图片**

目前纯文字，建议：
- 每个章节配一张装饰图/icon
- 制作工艺7步加进度条/步骤动画

**6. 全局过渡动画**

页面跳转加淡入效果：
```css
page { animation: pageIn 0.3s ease-out; }
@keyframes pageIn { 
  from { opacity: 0; transform: translateX(20rpx); } 
}
```

### 🟢 P2 — 锦上添花

**7. 粒子动效统一**

elder-chat 已有金色粒子，可复用到首页/互动馆：
- 金色光点从底部升起
- 皮影剪影随机飘过

**8. 音效反馈**

- tab 点击：木鱼/锣鼓短音
- AI 生成成功：皮影戏开场锣声
- 按钮按下：轻微震动反馈

**9. 深色/浅色模式**

- 知识馆等阅读页面可切换浅色（宣纸米底）
- 剧场/对话页保持暗色（舞台效果）

---

## 七、GitHub 项目对照表

| 项目 | Stars | 技术栈 | 对我们有用的是 |
|------|-------|--------|---------------| 
| **Felicityty/ICHStudy-wx** | ⭐10 | uni-app/Vue | TabBar图标设计、导航架构 |
| **linxizhi2021/libmini** | ⭐80 | 原生小程序 | 非遗模块设计、后台管理思路 |
| **weilanwl/ColorUI** | ⭐12.4k | CSS组件库 | 卡片/按钮/渐变样式参考 |
| **wechat-miniprogram/demo** | ⭐7.2k | 原生小程序 | 官方 custom-tab-bar 实现 |
| **ljybill/custom-tab-bar** | ⭐17 | 原生+node | TabBar 组件架构参考 |

---

## 八、行动清单

- [ ] 去 iconfont.cn 搜索下载 4 组 TabBar 图标（普通+选中）
- [ ] 创建 `custom-tab-bar/` 组件
- [ ] 创建 `pages/mine/` 「我的」页面
- [ ] 准备 image3/ 人物图片资源
- [ ] 首页 nav-item 加功能描述文字
- [ ] 知识馆各章节加装饰图标
- [ ] 全局页面过渡动画
