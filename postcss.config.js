module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗的宽度，对应我们设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应我们设计稿的高度（也可以不配置
      unitPrecision: 5,//转换后保留小数
      viewportUnit: 'vw',//指定转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转的类
      minPixelValue: 1,//小于或等于一下的不转换
      mediaQuery: false,//允许媒体查询中转换‘px’
      exclude:[/TabBar/]
    },
  }
}
