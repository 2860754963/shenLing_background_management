"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve (dir) {
  return path.join(__dirname, dir);
}


let isproduction = process.env.NODE_ENV === 'production'
let cdn = { css: [], js: [] }
let externals = {}
if (isproduction) {
  externals = {
    // 这里的value值是 引入的包的全局的变量名
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
  }
  cdn = {
    css: [
      // element-ui css
      'https://cdn.staticfile.org/element-ui/2.15.13/theme-chalk/index.css',
    ],
    js: [
      // vue must at first!
      'https://lib.baomitu.com/vue/2.7.0/vue.js',
      // element-ui js
      'https://lib.baomitu.com/element-ui/2.15.13/index.js',
    ]
  }
}




const name = defaultSettings.title || "vue Admin Template"; // page title 

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "https://slwl-api.itheima.net/manager",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    // before: require('./mock/mock-server.js')
  },


  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    //  排除打包文件
    externals: externals,

  },
  // 这个是wep执行链条
  chainWebpack (config) {
    // 进行cdn注入
    config.plugin('html').tap(args => {
      //args是注入html模板的一个变量  
      args[0].cdn = cdn
      return args
    })
    // config.plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin)

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");



    });
  },
};
