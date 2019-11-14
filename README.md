### 中间件平台采用 react(v16.1+) + antd(v3.2+) + ts 开发(v3.6+)

### 1. 安装运行 

```js
npm install | cnpm install
```
或者

```js
cnpm install
```

##### 2.启动项目

```js
npm run start
```

##### 3.打包项目

```js
npm run build
```

### 代码目录

```ts
+-- build/                                  ---打包的文件目录
+-- node_modules/                           ---npm包
+-- src/                                    ---核心代码目录
|   --- index.tsx							---webpack打包入口文件
|   --- index.html							---首页入口html模板文件
|   --- App.tsx							    ---路由总入口文件
|   +-- assets/
|   |   +-- image/                              ---图片文件
|   |   |   --- ...
|   |   +-- style/                              ---样式文件
|   |   |   --- layout.less                    ---全局样式
|   |   |   --- reset.less                     ---初始化样式
|   +-- components/                         ---组件存放目录
|   |   +-- UI                              ---UI组件，如Header, Sidebar, Loading, Breadcrumb等
|   |   |   --- Header.tsx
|   |   |   --- Sidebar.tsx
|   |   |   --- Loading.tsx
|   |   |   --- ...
|   |   --- Drawer                          ---Drawer组件
|   |   --- Form-modal                      ---模态框表单组件
|   |   --- ...
|   +-- hooks/                                  ---自定义hooks方法
|   |   |   --- ...
|   +-- pages/                                  ---路由页面组件
|   |   --- Index.tsx                       --- 页面主体文件，路由文件在该页面内切换
|   |   --- Entries.tsx                     --- 所有页面的出口文件，或说访问所有页面的入口文件
|   |   --- Login.tsx                       --- 登陆页
|   |   --- No-match.tsx                    --- 404页面
|   |   +-- Mysql
|   |   |   --- index.tsx                   ---该体页面的入口文件
|   |   |   --- data.ts                     ---该页面内部需要用到的数据
|   |   |   +-- Home                        ---该页面的首页
|   |   |   |   +-- index.tsx                   ---首页文件
|   |   |   |   +-- service.ts                  ---接口调用文件
|   |   |   |   +-- data.ts                     ---首页用到的data数据 
|   |   |   +-- ...                         ---该页面其他页面组件
|   |   +-- Redis
|   |   |   +-- ...                         ---结构大体同Mysql
|   |   +-- Rocketmq 
|   |   |   +-- ...                         ---结构大体同Mysql
|   +-- router/                             ---路由
|   |   --- config.ts                           --路由配置（包含sidebar menu）
|   |   --- index.tsx                           --路由渲染页面文件
|   +-- store/                              ---数据状态管理
|   |   |   +-- ...      
|   +-- styled-components/                  
|   |   |   --- ...    
|   +-- typings/                            ---ts类型定义文件
|   |   |   --- route.d.ts                  ---路由配置变量定义文件
|   |   |   --- ...
|   +-- utils/                              --- 公用工具性目录
|   |   --- api.ts                          --- axios封装http请求
|   |   --- tools.ts                        --- 公用工具函数文件
--- package.json
```

