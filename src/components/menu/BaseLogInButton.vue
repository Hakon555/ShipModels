<template>
  <div class="log-register-buttons" v-if="isVsible">
    <div class="not-personal log-in-button" @click="openLoginFormPopup">Войти</div>
    <div class="not-personal log-in-button" @click="openRegisterFormPopup">Регистрация</div>
  </div>
</template>

<script>
export default {
  name: 'BaseLogInButton',
  data: function (){
    return {

    }
  },
  methods: {
    openLoginFormPopup (){
      this.$store.commit('updateLoginFormPopup', true);
    },
    openRegisterFormPopup (){
      this.$store.commit('updateRegisterFormPopup', true);
    }
  },
  computed: {
    isVsible (){
      return !this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style scoped lang="scss">
.log-register-buttons{
    width: 50%;
    padding-left: 10px;
    padding-top: 55px;
}
.not-personal{
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6f6f6f;
  border: 1px solid #6f6f6f;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 1px 5px;
  margin: 2px;
}
@media (min-width: 1280px) {
  .log-register-buttons{
    padding-left: 0;
    padding-top: 0;
    width: auto;
  }
}
</style>