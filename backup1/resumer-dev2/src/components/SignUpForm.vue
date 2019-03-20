<template>
  <!--<div>-->
    <!--<form @submit.prevent="signUp">-->
      <!--<div class="row">-->
        <!--<label>用户名</label>-->
        <!--<input type="text" v-model="formData.username" required>-->
      <!--</div>-->
      <!--<div class="row">-->
        <!--<label >密码</label>-->
        <!--<input type="password" v-model="formData.password" required>-->
      <!--</div>-->
      <!--<div class="actions">-->
        <!--<input type="submit" value="提交">-->
        <!--<span class = "errorMessage">{{errorMessage}}</span>-->
      <!--</div>-->
    <!--</form>-->
  <!--</div>-->
  <div class="cont_centrar">
    <div class="cont_login">
      <form v-on:submit.prevent = "signUp">
        <div class="cont_tabs_login">
          <ul class='ul_tabs'>
            <li class="active"><a href="#">SIGN UP</a>
              <span class="linea_bajo_nom"></span>
            </li>
            <!--<li><a href="#up" onclick="sign_up()">SIGN UP</a><span class="linea_bajo_nom"></span>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cont_text_inputs">
          <!--<input type="text" class="input_form_sign " placeholder="NAME" name="name_us" />-->

          <input type="text" v-model="formData.username" class="input_form_sign d_block active_inp" placeholder="USERNAME" name="emauil_us" />

          <input type="password" v-model="formData.password" class="input_form_sign d_block  active_inp" placeholder="PASSWORD" name="pass_us" />
          <!--<input type="password" class="input_form_sign" placeholder="CONFIRM PASSWORD" name="conf_pass_us" />-->

          <a href="#" class="link_forgot_pass d_block" >{{errorMessage}}</a>
        </div>
        <div class="cont_btn">
          <!--<button class="btn_sign">SIGN IN</button>-->
          <input type="submit" class="btn_sign" value="SIGN UP">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import getAVUser from '../getAVUser'
import AV from '../store/leancloud'
import getErrorMessage from '../getErrorMessage'
export default {
  name: 'SignUpForm',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  created () {
  },
  methods: {
    signUp () {
      let {username, password} = this.formData
      var user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.signUp().then((loginedUser) => {
        // 利用$emit('success')调用上一级@success的方法
        console.log('注册成功 调用$emit(success)')
        this.$emit('success', getAVUser(loginedUser))
      }, (error) => {
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}
</script>

<style scoped>
  .cont_centrar {
    position: absolute;
    width: 320px;
    left:50%;
    top:50%;
    margin-left: -160px;
    margin-top: -160px;
  }

  .cont_centrar {
    position: relative;
    width: 320px;
    float: left;
    background-image: linear-gradient(-226deg, #FFFFFF 8%, #EEF3F5 100%);

    border-radius: 8px;
    transition: all 0.5s;
  }

  .cent_active {
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.21);
  }


  .cont_tabs_login {
    position: relative;
    float: left;
    width: 100%;
  }

  .ul_tabs > li {
    position: relative;
    float: left;
    width: 90%;
    list-style: none;
    text-align: center;
    margin-left: 5%;
  }

  .ul_tabs > li > a  {
    text-decoration: none;
    font-family: Helvetica;
    font-size: 16px;
    color: #999;
    line-height: 14px;
    padding: 20px ;
    display: block;
    transition: all 0.5s;
  }

  .ul_tabs > .active > a  {
    color: #FF8383;

  }

  .linea_bajo_nom {
    position: relative;
    width: 100%;
    float: left;
    background-color: #999;
    height: 2px;
  }

  .active .linea_bajo_nom {
    position: relative;
    width: 100%;
    float: left;
    background-color: #FF8383;
    height: 2px;
  }


  .input_form_sign {
    position: relative;
    float: left;
    width: 90%;
    border: none;
    border-bottom: 1px solid #B0BEC5 ;
    background-color: transparent;
    font-size: 14px;
    outline: none;
    transition: all 0.5s;
    height: 0px;
    margin: 0px;
    padding: 0px;
    opacity: 0;
    display: none;
  }

  .active_inp {
    margin: 5% 5% ;
    padding: 15px 0px;
    opacity: 1;
    height: 5px;
  }



  .input_form_sign:focus {
    border-bottom: 1px solid #FF8383 ;}

  .link_forgot_pass {
    /*float:left;*/
    /*position: relative;*/
    /*margin-top: 0px;*/
    /*margin-left: 35%;*/
    text-decoration: none;
    color: #999;
    font-size: 13px;
    display: none;
    transition: all 0.5s;
  }
  .cont_btn {
    position: relative;
    float: left;
  }

  .btn_sign {
    background: rgba(255,64,88,0.74);
    box-shadow: 0px 2px 20px 2px rgba(255,114,132,0.50);
    border-radius: 8px;
    padding: 15px 30px;
    border: none;
    color: #fff;
    font-size: 14px;
    position: relative;
    float: left;
    margin-left: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }




  .d_block {
    display: block;
  }

</style>
