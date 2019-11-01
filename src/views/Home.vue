<template>
  <div class="home">
    <div class="mobile-container">

      <template v-if="!isAuthenticated">
        <p class="text">Для использования приложения необходимо авторизоваться.</p>
        <p class="text text2">Авторизация пройдёт автоматически через {{time}} секунд.</p>
        <p class="log-in" @click="authorize">БЫСТРЫЙ ВХОД</p>
        <p class="log-in" @click="stopTimer">ОСТАНОВИТЬ ТАЙМЕР</p>
      </template>
      <p class="text" v-else>Вы авторизованы!</p>

      <p class="text">Логин, пароль:</p>
      <p class="text">a1@mail.ru</p>
      <p class="text">123</p>
    </div>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '@/store/actionConstants/actions'

export default {
  name: 'home',
  data: function (){
    return {
      time: 10,
      intervalId: ''
    }
  },
  methods:{
    timer (){
      this.intervalId = setInterval(() => {
        this.time--;
        if(this.time <= 0){
          clearInterval(this.intervalId);
          this.authorize();
        }
      }, 1000);
    },
    stopTimer (){
      clearInterval(this.intervalId);
    },
    authorize (){
      this.$store.dispatch(AUTH_REQUEST, { username: "a1@mail.ru", password: "123" }).then(() => {
        this.$emit('closePopup');
        this.isWrongCred = false;
      });
    },
  },
  computed: {
    isAuthenticated (){
      if(!this.$store.getters.isAuthenticated){
        this.timer();
      }else{
        clearInterval(this.intervalId);
        this.time = 10;
      }
      return this.$store.getters.isAuthenticated;
    },
  }
}
</script>

<style scooped lang="scss">
.text{
  text-align: center;
  font-size: 20px;
  color: #6d340a;
  margin-top: 25px;
}
.text2{
  color: red;
  font-size: 16px;
}
.log-in{
  width: 180px;
  height: 36px;
  background: #FFFFFF;
  border: 2px solid grey;
  box-sizing: border-box;
  border-radius: 18px;
  font-size: 15px;
  line-height: 30px;
  color: grey;
  text-align: center;
  margin: 15px auto;
  cursor: pointer;
}
</style>