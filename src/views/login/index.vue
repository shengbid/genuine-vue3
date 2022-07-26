<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="0" :lg="10" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="8">
        <div class="login-container-form">
          <a-tabs v-model:activeKey="activeKey" :centered="true">
            <a-tab-pane key="1" tab="登录">
              <a-form :model="form" @submit="handleSubmit" @submit.prevent>
                <a-form-item>
                  <a-input v-model:value="form.userAccount" placeholder="账号">
                    <template v-slot:prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-model:value="form.userPwd"
                    type="password"
                    placeholder="密码"
                  >
                    <template v-slot:prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button class="sub-btn" type="primary" html-type="submit">登录</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="注册" force-render>
              <a-form ref="formRef" :model="registerForm" @finish="toRegister">
                <a-form-item
                  name="email"
                  :rules="[{ required: true, message: '请输入邮箱!' }]"
                >
                  <a-input
                    v-model:value="registerForm.email"
                    placeholder="邮箱"
                  >
                    <template v-slot:prefix>
                      <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-row :gutter="2">
                  <a-col :span="14">
                    <a-form-item
                      name="code"
                      :rules="[{ required: true, message: '请输入验证码!' }]"
                    >
                      <a-input
                        v-model:value="registerForm.code"
                        placeholder="验证码"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-button
                      class="code-btn"
                      @click="getCode"
                      :disabled="count < 60"
                    >
                      获取验证码
                    </a-button>
                  </a-col>
                </a-row>
                <a-form-item
                  name="password"
                  :rules="[{ required: true, message: '请输入密码!' }]"
                >
                  <a-input
                    v-model:value="registerForm.password"
                    placeholder="密码"
                  >
                    <template v-slot:prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button class="sub-btn" type="primary" html-type="submit">提交</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
    <div class="login-container-tips">
      基于vue{{ dependencies['vue'] }}
      + ant-design-vue
      {{ dependencies['ant-design-vue'] }}开发
    </div>
  </div>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import { mapActions, mapGetters } from 'vuex'
  import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  } from '@ant-design/icons-vue'
  import { getFakeCaptcha, register } from '@/api/user'
  import { message } from 'ant-design-vue'

  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
      MailOutlined,
    },
    data() {
      return {
        form: {
          userAccount: '',
          userPwd: '',
        },
        registerForm: {
          email: '',
          code: '',
          password: '',
        },
        redirect: undefined,
        dependencies: dependencies,
        devDependencies: devDependencies,
        count: 60,
        activeKey: '1',
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },

    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      // 登录
      async handleSubmit() {
        await this.login(this.form)
        await this.$router.push(this.handleRoute())
      },
      // 注册
      async toRegister() {
        await register(this.registerForm)
        await this.$router.push(this.handleRoute())
      },
      // 获取验证码
      async getCode() {
        console.log(this.$refs.formRef)
        await this.$refs.formRef.validateFields(['email'])
        const timer = setInterval(() => {
          if (this.count > 0) {
            this.count--
          } else {
            clearInterval(timer)
            this.count = 60
          }
        }, 1000)
        await getFakeCaptcha({ toEmail: this.registerForm.email })
        message.success('验证码发送成功')
      },
    },
  }
</script>
<style lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    background: url('~@/assets/login_images/login_background.png');
    background-size: cover;
    &-form {
      width: calc(100% - 40px);
      height: 380px;
      padding: 4vh;
      margin-top: calc((100vh - 380px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background: url('~@/assets/login_images/login_form.png');
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    }
    &-hello {
      font-size: 32px;
      color: #fff;
    }
    &-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }
    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }
    .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }
    .ant-input {
      height: 35px;
    }
    .sub-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
    .code-btn {
      height: 35px;
    }
    .ant-tabs-tab-btn {
      color: #fff;
      font-weight: bold;
    }
  }
</style>
