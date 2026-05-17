Component({
  options: {
    multipleSlots: true
  },

  properties: {
    // 卡片标题
    title: {
      type: String,
      value: ''
    },
    // 卡片副标题
    subtitle: {
      type: String,
      value: ''
    },
    // 列表数据
    items: {
      type: Array,
      value: []
    },
    // 是否显示右侧箭头
    showArrow: {
      type: Boolean,
      value: true
    }
  },

  data: {},

  methods: {
    onItemTap(e) {
      const { index } = e.currentTarget.dataset;
      const item = this.data.items[index];
      this.triggerEvent('itemtap', { index, item });
    }
  }
});
