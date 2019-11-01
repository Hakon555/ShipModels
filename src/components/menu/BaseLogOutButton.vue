<template>
  <div v-if="isVsible">
    <template v-if="type === 'desktop'">
      <div class="log-out-button" @click="logOut">
          <img src="/static/images/logout.png" alt="">
      </div>
    </template>
    <template v-else>
      <ul class="main-mobile-menu">
          <li @click="logOut">
              <div class="for-icon">
                  <img src="/static/images/logout.png" alt="">
              </div>
              <a>Выход</a>
          </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/actionConstants/actions'

export default {
  name: 'BaseLogOutButton',
  props: ['type'],
  methods:{
    logOut (){
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        if(this.$route.path !== "/")
          this.$router.push("/")
      });
    }
  },
  computed: {
    isVsible (){
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style scoped lang="scss">

</style>