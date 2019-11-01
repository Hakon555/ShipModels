<template>
  <header>
    <MobileMenu v-if="mobileScreen"/>
    <DesktopMenu v-if="desktopScreen"/>
    <PageTitle desktop="true" v-if="desktopScreen"/>

    <ModalFrame v-model="loginFormPopup">
      <LogInForm @closePopup="loginFormPopup = false"/>
    </ModalFrame>
    <ModalFrame v-model="registerFormPopup">
      <RegisterForm @closePopup="registerFormPopup = false"/>
    </ModalFrame>
  </header>
</template>

<script>
import MobileMenu from '@/components/menu/MobileMenu.vue'
import DesktopMenu from '@/components/menu/DesktopMenu.vue'
import ModalFrame from '@/components/ModalFrame.vue'
import LogInForm from '@/components/modals/LogInForm.vue'
import RegisterForm from '@/components/modals/RegisterForm.vue'
import PageTitle from '@/components/menu/PageTitle.vue'

export default {
  name: 'HeaderComponent',
  components: {
    MobileMenu,
    DesktopMenu,
    ModalFrame,
    LogInForm,
    RegisterForm,
    PageTitle
  },
  computed: {
    loginFormPopup: {
      get () {
        return this.$store.getters.loginFormPopup;
      },
      set (value) {
        this.$store.commit('updateLoginFormPopup', value);
      }
    },
    registerFormPopup: {
      get () {
        return this.$store.getters.registerFormPopup;
      },
      set (value) {
        this.$store.commit('updateRegisterFormPopup', value);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header{
  width: 100%;
}
</style>
