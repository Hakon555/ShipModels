<template>
  <div class="main-pop-up log-in-form">
      <div class="pop-up-header">
          <p class="title">Войти</p>
          <div class="close-pop-up" @click="$emit('closePopup')"></div>
      </div>
      <div class="pop-up-content">
        <div class="standard-form">
            <form @submit.prevent="login">
              <p class="alert-wrong-field" v-if="isWrongCred">Не верные логин или пароль.</p>
              <p class="alert-wrong-field" v-if="isUserFielWrong">Не верное поле!</p>
              <input type="text" v-model="username" name="email" placeholder="Email">
              <p class="alert-wrong-field" v-if="isPasswdFielWrong">Не верное поле!</p>
              <input type="password" v-model="password" name="password" placeholder="Пароль">
            
              <div class="under-form-links">
                  <p @click="openRegistration">Регистрация</p>
              </div>
            
              <button class="form-button1">Отправить</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '@/store/actionConstants/actions'
import EmailValidation from '@/utils/EmailValidation'

export default {
  name: 'LogInForm',
  data: function(){
    return {
      username: '',
      password: '',
      isWrongCred: false,
      isUserFielWrong: false,
      isPasswdFielWrong: false
    }
  },
  methods: {
    login: function () {
      const { username, password } = this;

      if(!this.validate(username, password)) return;

      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$emit('closePopup');
        this.isWrongCred = false;
      },() => {
        this.isWrongCred = true;
      });
    },
    openRegistration () {
      this.$emit('closePopup');
      this.$store.commit('updateRegisterFormPopup', true);
    },
    validate (username, password){
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
      if(this.isUserFielWrong || this.isPasswdFielWrong) return false;
      return true;
    }
  }
}
</script>

<style scoped lang="scss">
.log-in-form{

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
</style>
