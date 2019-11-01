<template>
  <div class="first-line-desktop">
      <div class="desktop-logo" @click="$router.push({ path: '/' })">
          <img src="/static/images/ship-logo.png" alt="">
      </div>
      <div class="desktop-menu">
        <MenuLinks :links="desktopMenuLinks"/>
      </div>
      <div class="right-first-line-desktop-block">
          <MenuActionButtons/>
          <PersonalBlock type="desktop"/>

          <div class="log-in-out-buttons">
              <BaseLogOutButton type="desktop"/>
              <BaseLogInButton/>
          </div>
      </div>
  </div>
</template>

<script>
import MenuActionButtons from '@/components/menu/MenuActionButtons.vue'
import PersonalBlock from '@/components/menu/PersonalBlock.vue'
import BaseLogInButton from '@/components/menu/BaseLogInButton.vue'
import BaseLogOutButton from '@/components/menu/BaseLogOutButton.vue'
import MenuLinks from '@/components/menu/MenuLinks.vue'
import { GET_TOP_MENU } from '@/store/actionConstants/actions'

export default {
  name: 'DesktopMenu',
  computed: {
    desktopMenuLinks: function (){
      return this.$store.getters.topMenuLinks;
    }
  },
  beforeCreate: function () {
    this.$store.dispatch(GET_TOP_MENU, this.$router.currentRoute.path);
  },
  components: {
    MenuActionButtons,
    PersonalBlock,
    BaseLogInButton,
    BaseLogOutButton,
    MenuLinks
  }
}
</script>

<style lang="scss">
.first-line-desktop{
  width: 100%;
  height: 60px;
  background: #DECAB5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .personal{
    position: static;
  }
}
.desktop-logo{
  margin-left: 30px;
  cursor: pointer;
}
.desktop-menu{
  ul{
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

    li{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;

      a{
        text-decoration: none;
        margin-left: 15px;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
      }
    }
  }
}
.right-first-line-desktop-block{
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  .menu-action-buttons{
    position: static;
    top: auto;
    right: auto;
  }
  .personal{
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;

    .my-photo{
      margin: 0;
    }
    .person{
      margin-left: 10px;
    }
  }
  .log-in-out-buttons{
    margin-left: 20px;
    cursor: pointer;

    .log-in-button{
      position: static;
    }
  }
}
</style>
