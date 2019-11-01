<template>
  <div class="main-pop-up register-form">
      <div class="pop-up-header">
          <p class="title">Регистрация</p>
          <div class="close-pop-up" @click="$emit('closePopup')"></div>
      </div>
      <div class="pop-up-content">
        <div class="standard-form">
            <form @submit.prevent="register" v-if="!registerSuccess">
              <p class="alert-wrong-field" v-if="registerError">{{registerError}}</p>

              <p class="alert-wrong-field" v-if="isUserFielWrong">Не верное поле!</p>
              <input type="text" v-model="username" name="email" placeholder="Email">
              <p class="alert-wrong-field" v-if="isPasswdFielWrong">Не верное поле!</p>
              <input type="password" v-model="password" name="password" placeholder="Пароль">
              <p class="alert-wrong-field" v-if="isPasswd2FielWrong">Не верное поле!</p>
              <input type="password" v-model="password2" name="password2" placeholder="Повторите пароль">
            
              <div class="under-form-links">
                  <p @click="openLogIn">Войти в существующий аккаунт</p>
              </div>
              <button class="form-button1">Отправить</button>
            </form>
            <p v-if="registerSuccess" class="register-success">Регистрация прошла успешно!</p>
        </div>
    </div>
  </div>
</template>

<script>
import {REGISTER_USER} from '@/store/actionConstants/actions'
import EmailValidation from '@/utils/EmailValidation'

export default {
  name: 'RegisterForm',
  data: function(){
    return {
      username: '',
      password: '',
      password2: '',
      registerSuccess: false,
      registerError: '',
      isUserFielWrong: false,
      isPasswdFielWrong: false,
      isPasswd2FielWrong: false,
    }
  },
  methods: {
    openLogIn () {
      this.$emit('closePopup');
      this.$store.commit('updateLoginFormPopup', true);
    },
    register: function () {
      const { username, password, password2 } = this;

      if(!this.validate (username, password, password2)) return;

      this.$store.dispatch(REGISTER_USER, { username, password }).then((resp) => {
        if(resp.success){
          this.registerSuccess = true;
          setTimeout(()=>{this.$emit('closePopup')},1500);
        }else{
          this.registerError = resp.err;
        }
      },(err) => {
        
      });
    },
    validate (username, password, password2){
      if(!EmailValidation(username)){
        this.isUserFielWrong = true;
      }else{
        this.isUserFielWrong = false;
      }
      if(password === ""){
        this.isPasswdFielWrong = true;
      }else{
        this.isPasswdFielWrong = false;
      }
      if(password2 === "" || password2 !== password){
        this.isPasswd2FielWrong = true;
      }else{
        this.isPasswd2FielWrong = false;
      }
      if(this.isUserFielWrong || this.isPasswdFielWrong || this.isPasswd2FielWrong) return false;
      return true;
    }
  }
}
</script>

<style scoped lang="scss">
.register-form{

  .under-form-links{
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    p{
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      color: #8F7C6A;
    }
  }
}
.register-success{
  color: green;
}
</style>
