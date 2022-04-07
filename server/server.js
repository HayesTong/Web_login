let DB = {
    "12345": "54321",
    "ABCD": "DCBA",
    "abcd": "dcba"
}

const Koa = require("koa")
const cors = require("koa2-cors")
const router = require("koa-router")()
    // const session = require("koa-session")
    // const parser = require('koa-parser')？？？？？？？
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(router.routes())

// app.keys = ["weblogin"]
// app.use(session({
//     key: "koa:sess",
//     maxAge: 20 * 1000
// }, app))

// app.use(parser())


// router.get('/', async(ctx) => {
//     console.log(ctx.session.username)
//     if (ctx.session.username) {

//     } else {
//         ctx.body = "no session"
//         ctx.redirect("/login")
//         console.log("没跳转")
//     }
// })

// router.get('/login', async (ctx, next) => {
//     await ctx.render('login')
// })


router.post("/dataPost", async ctx => {
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080'); 
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    console.log(username, password)
    console.log(DB[username])
        // console.log(pkege)
        // ctx.body = username

    if (DB[username] == undefined) {
        console.log("未注册  " + DB[username])
        ctx.body = {
            code: 333,
            msg: "未注册"
        }
    } else if (DB[username] == password) {

        // ctx.session.user = "admin"
        // let user = ctx.session.user
        // console.log(ctx.session)

        // ctx.cookies.set("username", username, {
        //     maxAge: 20 * 1000
        // })

        console.log("密码正确  " + DB[username] + password)
        ctx.body = {
            code: 666,
            msg: "密码正确",
			username:username
        }
    } else {
        console.log("密码不正确 " + "PW: " + DB[username] + "UN: " + username)
        ctx.body = {
            code: 555,
            msg: "密码不正确"
        }
    }
})


let port = 3000
app.listen(port, () => {
    console.log("server is running on " + port);
})