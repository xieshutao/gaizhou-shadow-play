# 🏮 非遗/国风小程序素材调研报告

> 全网搜索 26 个 GitHub 仓库，深入研究 8 个优质项目，下载 28 张素材截图

---

## 📊 项目评级总览

| 项目 | 评级 | 亮点 | 可借素材 |
|------|------|------|----------|
| **ICHStudy-wx** | ⭐⭐⭐⭐⭐ | 最完整的非遗小程序 | ✅ TabBar图标（已用）|
| **Helloyfb/feiyi** | ⭐⭐⭐⭐ | 最佳首页布局 | ✅ 配色方案、卡片布局 |
| **theHappyOld** | ⭐⭐⭐ | ColorUI组件库 | ✅ ColorUI CSS |
| **Ancient-style-Q-A** | ⭐⭐⭐ | 纯正古风配色 | ✅ 截图参考 |
| **ICH-NewMediaMAP** | ⭐⭐ | 地图+非遗 | FontAwesome方案 |

---

## 🎨 一、配色方案对比

### 已验证的优秀配色

| 项目 | 主背景 | TabBar背景 | 选中色 | 风格 |
|------|--------|-----------|--------|------|
| ICHStudy-wx | 白色 | `#FEFBF3` 米白 | 图标变色 | 干净素雅 |
| Helloyfb/feiyi | `#f7ecd7` 暖杏 | `#f7e1b6` 杏色 | `#000` | 温暖传统 |
| Ancient-QA | `#FAF0E6` 亚麻 | - | - | 古风素雅 |
| **你的项目** | `#0a0402` 深黑 | `#1a1008` 深棕 | `#D4AF37` 金色 | **暗黑金** |

**结论**：主流非遗项目清一色走**浅色暖调**路线（米白/杏色/亚麻）。你的暗黑金风格是个差异化选择，但也意味着没有现成配色可抄。

### ⚠️ 注意
Helloyfb/feiyi 的 TabBar 背景 `#f7e1b6` 比你的 `#1a1008` 亮了 15 倍。如果你坚持暗黑风，需要自己摸索暗底金色搭配的细节。

---

## 🏠 二、首页布局对比

### Helloyfb/feiyi（非遗研学游）— 最值得参考

```
┌─────────────────────────────┐
│   🔍 搜索框                   │
├─────────────────────────────┤
│   Swiper 轮播图 (5张)         │
├─────────────────────────────┤
│   活动横幅 (50px高)           │
├─────────────────────────────┤
│   非遗·赏  → 横向滚动卡片    │
│   非遗·研  → 横向滚动卡片    │
│   非遗·学  → 横向滚动卡片    │
│   非遗·游  → 横向滚动卡片    │
└─────────────────────────────┘
```

**卡片规格**：42%宽度 × 300rpx高度 × 20rpx圆角

### ICHStudy-wx

```
┌─────────────────────────────┐
│   Swiper 轮播图               │
├─────────────────────────────┤
│   课程区 (标题 + "全部">)      │
│   卡片网格 (2列)              │
│   VR区 (标题 + "全部">)       │
│   卡片网格                    │
└─────────────────────────────┘
```

---

## 🖼️ 三、TabBar 图标来源

已从 **ICHStudy-wx** 扒取并使用：

| 你的Tab | ICHStudy原名 | 图标描述 | 文件 |
|---------|-------------|----------|------|
| 首页 | home | 中国结 | home.png / home-active.png |
| 互动馆 | product | 学堂/书 | learn.png / learn-active.png |
| 作坊 | tourist | 景点 | study.png / study-active.png |
| 我的 | me | 小人 | mine.png / mine-active.png |

---

## 📦 四、已下载素材清单（28个文件，3.5MB）

```
docs/research/screenshots/
├── ancient_qa_1.png (342KB) — 古风问答截图1
├── ancient_qa_2.png (397KB) — 古风问答截图2
├── ancient_qa_3.png (219KB) — 古风问答截图3
├── feiyi_banner_0~8.* — 非遗研学游轮播图/卡片图
├── feiyi_banner.png — TabBar banner
├── feiyi_首页/消息/增加/交流.png — TabBar图标
├── culture_*.jpg — 文化项目素材
└── happy_*.png — ColorUI项目图标
```

---

## 🔧 五、关键技术参考

### TabBar 实现（ICHStudy-wx）
```css
.tabbar {
  background-color: #FEFBF3;  /* 米白底 */
  box-shadow: 0 -1rpx 10rpx #E6DECC;  /* 暖色阴影 */
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 900;
}
```

### 横向滚动区域（Helloyfb/feiyi）
```html
<scroll-view scroll-x="true" 
  style="width: 100%; white-space: nowrap;">
  <view class="card" wx:for="{{items}}">
    <image src="{{item.src}}"/>
    <view>{{item.text}}</view>
  </view>
</scroll-view>
```

### ColorUI 组件库
- Repo: `weilanwl/coloruicss` ⭐12.4k
- `theHappyOld` 项目使用了 ColorUI
- 提供现成的卡片、按钮、标签、列表等组件

---

## 📌 六、建议行动

| 优先级 | 事项 | 来源 |
|--------|------|------|
| P0 ✅ | TabBar 图标 | ICHStudy-wx (已完成) |
| P1 🔥 | 首页轮播图替换（用真实皮影照片） | Helloyfb/feiyi 布局 |
| P1 🔥 | 首页增加分类横向滚动区 | Helloyfb/feiyi 模式 |
| P2 | 引入 ColorUI CSS 组件 | theHappyOld |
| P2 | 古风配色微调（参考 #FEFBF3 / #f7ecd7） | ICHStudy + feiyi |
| P3 | 页面切换动效 | ICHStudy-wx tabbar |

---

## ⚠️ 无法获取的

- ❌ `ctc.renyuzhuo.cn` 截图（SSL证书过期，服务器不可达）
- ❌ Gitee 搜索结果（反爬严格）
- ❌ 视觉API不可用（DeepSeek无视觉能力）→ 截图需你在本地打开看
