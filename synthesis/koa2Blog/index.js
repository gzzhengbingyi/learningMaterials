const Koa=require('koa');
const path=require('path')
const bodyParser = require('koa-bodyparser');//处理用户post请求里面body的内容，正确解析数据
const ejs=require('ejs');//js模板，时候于服务端，tj大神出品，另外一个模板是jade
const session = require('koa-session-minimal');//适用于koa2 的session中间件，提供存储介质的读写接口 
const MysqlStore = require('koa-mysql-session');//为koa-session-minimal中间件提供MySQL数据库的session数据读写操作
const config = require('./config/default.js');//数据库已经端口的配置信息
const router=require('koa-router'); //如果依靠ctx.request.url去手动处理路由，将会写很多处理代码，这时候就需要对应的路由的中间件对路由进行控制
const views = require('koa-views'); //在 Koa2 中使用模板引擎，首先要安装 koa-views 中间件，该中间件支持 ejs、jade、pug、swig、react 等大多数模板引擎，然后再安装你想要使用模板引擎
// const koaStatic = require('koa-static') //静态资源加载
const staticCache = require('koa-static-cache'); //类似上面
const app = new Koa()


// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
// 设置session，这样使得请求则可以区分是来自哪个客户端，一般session id会存储在cookie内
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))


// 配置静态资源加载中间件
// app.use(koaStatic(
//   path.join(__dirname , './public')
// ))
// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {//动态加载未在初始化时设置缓存的文件
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(bodyParser({
  formLimit: '1mb'
}))

//  路由
app.use(require('./routers/signin.js').routes()) //路由处理函数
app.use(require('./routers/signup.js').routes())
app.use(require('./routers/posts.js').routes())
app.use(require('./routers/signout.js').routes())


app.listen(config.port)

console.log(`listening on port ${config.port}`)
