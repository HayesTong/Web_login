	1.致谢
        在此，我感谢以下博客、教学视频、指导网站的建设者，及我的两位不愿透露姓名的程序猿朋友，在此期间他/她们给与了指引性的帮助：

        1.	FreeCodeCamp(freecodecamp.org)
        2.	晓舟报告 – Bilibili (https://www.bilibili.com/video/BV1zf4y1r711?spm_id_from=333.999.0.0)
        3.	晓舟报告 – Gitee (https://gitee.com/xiaozhou_report/xiaozhou_fe/tree/master/%E7%AC%AC07%E7%AB%A0%EF%BC%9AVue.js%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B)
        4.	小野森森 - Bilibili（https://www.bilibili.com/video/BV1vv411A7GD?p=1&share_medium=android&share_plat=android&share_session_id=510d5c78-a0c3-4d73-81b4-3f9b91662529&share_source=WEIXIN&share_tag=s_i&timestamp=1649164059&unique_k=FjYyZwd）
        5.	Kuan: vue-flip-clock (https://github.com/weicong678/kuan-vue-flip-clock)

	2.项目介绍：
	    该项目主要使用koa构建后台，axios传输前后端数据，vue构建前台，elementui构建网页内容。其中登录认证后的主页使用了Kuan: vue-flip-clock 的组件，该组件为一个实时显示时间的时钟。
		如用户在没有登录的情况下访问主页“http://192.168.124.5:8080/”，该访问请求将被重定向至http://192.168.124.5:8080/login登录界面，在用户成功登录后，浏览器将自动跳转到主页。
		其中登陆状态通过cookie确认，登录有效期为20s，且没有设置访问刷新，即每20s您需要重新登录，否则将无法访问首页（除非您一直呆在首页不刷新）。
		该项目后端没有连接数据库，但设置了四位有效登录用户供登录测试，分别为：
			"12345": "54321",
    		"ABCD": "DCBA",
    		"abcd": "dcba"
			"罗翔说你真刑": "666"
			

	3.运行：
		如需将项目文件下载到本地运行，需要按以下步骤配置相关项目依赖。
		1.下载当前项目文件到本地
		2.您可能需要配置以下依赖进行支持：
			1.nodejs(http://nodejs.cn/)
			2.npm/cnpm/nodemon
			3.前端依赖： "axios"，"core-js"，"element-ui"，"vue"，"vue-cookies"，"vue-router"
			4.后端依赖："koa"，"koa-bodyparser"，"koa-router"，"koa2-cors"
		3.在本机启动“http://192.168.124.5:8080/”作为前端服务器 (在项目文件夹执行 “npm run serve”命令)
		  在本机启动“http://192.168.124.5:3000/”作为后端服务器”(在项目文件夹/server 执行 “nodemon server”命令)
		4.在浏览器访问“http://192.168.124.5:8080”登录后即可访问主页/登录页

