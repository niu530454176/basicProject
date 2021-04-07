## 接口请求在  src/api/config 中配置请求地址
### 请求方式为  this.$service.[自定义请求名称].then()

#### 目录结构
<pre>
.
├── README.md           
├── build                   // 构建服务和webpack配置
├── doc                     // 项目文档doc文件
├── mock                    // mock 模拟接口请求
├── config                  // 项目不同环境的配置
├── dist                    // 项目build目录
├── public                  // 项目静态资源
├── index.html              // 项目入口文件

├── package.json            // 项目配置文件
├── src                     // 生产目录
│   ├── assets              // css js 和图片资源
│   ├── api                 // ajax url 放置
│   │   ├── index          // 封装请求名称
│   │   ├── config         // 封装url配置
│   ├── components          // 各种组件
│   │   ├── common         // 全局组件配置
│   ├── filters             // 封装过滤方法
│   ├── required            // 必填字段校验
│   ├── router              // 页面路由
│   ├── styles              // 公共样式
│   ├── store               // vuex状态管理器
│   ├── utils               // 公共方法
│   ├── style               // 样式文件
│   ├── views               // 项目主文件目录
│   └── main.js       // Webpack 预编译入口
</pre>

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```




