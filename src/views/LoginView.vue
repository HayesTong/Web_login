<template>
  <div>
    <el-form
      ref="loginForm"
      :model="loginform"
      :rules="rules"
      label-width="90px"
      class="login-box"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          minlength="3"
          maxlength="7"
          clearable
          v-model="loginform.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          clearable
          show-password
          v-model="loginform.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" v-on:click="dataPost"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>密码不可为空</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import store from "./store.js"
export default {
  data() {
    return {
		name:"",
      loginform: {
        username: "666",
        password: "",
      },

      rules: {
        username: [
          {
            required: true,
            message: "请输入账户, 长度在 3 到 7 个字符",
            trigger: "blur",
          },
          // {min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      },
      // 对话框显示和隐藏
      dialogVisible: false,
    };
  },

  methods: {
    dataPost() {
      this.$refs.loginForm.validate((valid) => {
        if (this.loginform.username.length < 3) {
          // console.log("长度不够")
          this.$message({
            message: "用户名输入错误，用户名长度应在 3 到 7 个字符",
            type: "error",
          });
        } else {
          if (valid) {
            axios.post("http://127.0.0.1:3000/dataPost", this.loginform, {
			'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*',
			})
              .then((res) => {
                // console.log(res)
                // console.log(res.data.code)
                switch (res.data.code) {
                  case 666:
                    // console.log("登录成功");
                    this.$notify({
                      title: "登录成功",
                      type: "success",
                    });

                    // this.$cookieStore.setCookie( 'username' ,this.username,20);
                    // console.log(this.$cookieStore.setCookie)
                    this.$cookies.set('username' ,res.data.code,20);
					this.$router.push("/");
                    console.log(this.$cookies.get("username"))
					store.setStateMessage(res.data.username);
					console.log(store.state.name)
                    break;

                  case 555:
                    // console.log("密码错误");
                    this.$notify({
                      title: "密码错误",
                      type: "error",
                    });
                    break;

                  case 333:
                    // console.log("用户未注册");
                    this.$notify({
                      title: "该用户未注册",
                      type: "warning",
                    });
                    break;
                }
                // console.log(this)
              });
          } else {
            this.dialogVisible = true;
            // console.log("没输密码")
          }
        }
      });
    },
  },
};
</script>

<style>
.login-box {
  border: 1px solid #dcdfe6;
  width: 400px;
  margin: 200px auto;
  padding: 40px 85px 0px 40px;
  border-radius: 5px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-button {
  position: relative;
  left: 100px;
  top: 0px;
}
</style>
