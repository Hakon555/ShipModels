<template>
  <div class="MobileMenu">
    <div class="first-line-mobile" @click="openMenu('first')">
        <img src="/static/images/burger.png" alt="logo" class="burger-menu-button">
        <PageTitle/>
    </div>

    <transition name="slide-left">
      <nav class="mobile-burger-menu-modal" v-if="menuFirstLevel">
        <div class="menu-header">
            <PersonalBlock/>
            <BaseLogInButton/>
            <MenuActionButtons @click="closeMenu('all')"/>
        </div>
        <div class="menu-content">
            <MenuLinks :links="mobileMenuLinks" type="mobile" @click="closeMenu('all')"/>
            <hr>
            <!-- <ul class="main-mobile-menu">
              <li @click="openMenu('second')">
                  <div class="for-icon">
                      <img src="/static/images/filter-menu.png" alt="">
                  </div>
                  <a>Фильтр отображения</a>
              </li>
            </ul>
            <hr> -->
            <BaseLogOutButton/>
        </div>
      </nav>
    </transition>

    <transition name="slide-left">
      <div class="menu-second-level-modal" v-if="menuSecondLevel">
          <div class="menu-title-line">
              <img src="/static/images/arrow-back.png" alt="" class="menu-arrow-back" @click="closeMenu('second')">
              <p class="menu-title">Настройка фильтров статусов</p>
          </div>
          <p class="menu-item-title">Статусы:</p>
          <form>
              <div class="checkbox-line">
                  <input id="buy-or-not" type="checkbox" value="buy-or-not" class="custom-checkbox menu-settings">
                  <label for="buy-or-not" class="custom-checkbox-label menu-settings">Куплена/не куплена</label>
              </div>
              <div class="checkbox-line">
                  <input id="used-or-not" type="checkbox" value="used-or-not" class="custom-checkbox menu-settings">
                  <label for="used-or-not" class="custom-checkbox-label menu-settings">Использована</label>
              </div>
              <div class="checkbox-line">
                  <input id="break-or-not" type="checkbox" value="break-or-not" class="custom-checkbox menu-settings">
                  <label for="break-or-not" class="custom-checkbox-label menu-settings">Сломана</label>
              </div>
              <div class="checkbox-line">
                  <input id="your-sign" type="checkbox" value="your-sign" class="custom-checkbox menu-settings">
                  <label for="your-sign" class="custom-checkbox-label menu-settings">Своя отметка</label>
              </div>
          </form>
          <hr>
          <p class="settings-detail-link">Настроить отображение статусов</p>
      </div>
    </transition>

    <div class="menu-frame" v-if="menuFirstLevel || menuSecondLevel" @click="closeMenu('all')"></div>
  </div>
</template>

<script>
import MenuActionButtons from '@/components/menu/MenuActionButtons.vue'
import PersonalBlock from '@/components/menu/PersonalBlock.vue'
import BaseLogInButton from '@/components/menu/BaseLogInButton.vue'
import BaseLogOutButton from '@/components/menu/BaseLogOutButton.vue'
import MenuLinks from '@/components/menu/MenuLinks.vue'
import PageTitle from '@/components/menu/PageTitle.vue'
import {GET_TOP_MENU} from '@/store/actionConstants/actions'

export default {
  name: 'MobileMenu',
  data: function (){
    return {
      menuFirstLevel: false,
      menuSecondLevel: false,
      menuSecondPart: []
    }
  },
  computed: {
    mobileMenuLinks: function (){
      let menuLinks = this.$store.getters.topMenuLinks;

      return [{
        name: 'Главная',
        link: '/',
        icon: 'ship-mini.png'
      }].concat(this.$store.getters.topMenuLinks);
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
    MenuLinks,
    PageTitle
  },
  methods: {
    openMenu (menu) {
      switch (menu){
        case 'first':
          this.menuFirstLevel = true;
          break;
        case 'second':
          this.menuSecondLevel = true;
          break;
      }
    },
    closeMenu (menu) {
      switch (menu){
        case 'first':
          this.menuFirstLevel = false;
          break;
        case 'second':
          this.menuSecondLevel = false;
          break;
        case 'all':
          this.menuFirstLevel = false;
          this.menuSecondLevel = false;
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.slide-left-enter-active, .slide-left-leave-active {
  transition: left 0.5s;
}
.slide-left-enter, .slide-left-leave-to {
  left: -75% !important;
}


.menu-frame{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.2;
  z-index: 500;
}
nav.mobile-burger-menu-modal{
  width: 75%;
  height: 100%;
  overflow: scroll;
  background: white;
  z-index: 540;
  position: fixed;
  top: 0;
  left: 0;

  .menu-header {
    width: 100%;
    height: 120px;
    background: #BBDBE9;
    position: relative;
  }
  .menu-content{
    width: 100%;

    ul.main-mobile-menu{
      list-style: none;

      li{
        display: flex;
        align-items: center;
        height: 50px;

        .for-icon{
          width: 55px;

          img{
            margin-left: 20px;
          }
        }
        a{
          text-decoration: none;
          font-size: 14px;
          line-height: 16px;
          color: #8F7C6A;
          display: block;
        }
      }
      li.active a{
        color: #6D340A;
        font-weight: bold;
      }
    }
    hr{
      color: #CCC9C9;
    }
  }
}

.menu-second-level-modal{
  width: 75%;
  height: 100%;
  background: white;
  z-index: 580;
  position: fixed;
  top: 0;
  left: 0;

  .menu-title-line{
    display: flex;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #CCC9C9;

    .menu-arrow-back{
      margin-left: 20px;
    }
    .menu-title{
      font-size: 12px;
      line-height: 12px;
      color: #8F7C6A;
      margin-left: 15px;
    }
  }
  .menu-item-title{
    font-size: 14px;
    line-height: 16px;
    color: #8F7C6A;
    margin-left: 30px;
    margin-top: 20px;
  }
  form{
    margin: 0;
  }
  .checkbox-line{
    width: 100%;
    margin-top: 10px;
  }
  .custom-checkbox.menu-settings{
    margin-left: 30px;
    display: inline-block;
  }
  .custom-checkbox-label.menu-settings{
    display: inline-block;
  }
  hr{
    margin-top: 30px;
  }
  .settings-detail-link{
    font-size: 14px;
    line-height: 16px;
    color: #8F7C6A;
    margin: 20px;
  }
  .settings-detail-link:after{
    content: "";
    position: relative;
    display: inline-block;
    background: url("/static/images/customize-display-arrow.png") no-repeat;
    width: 15px;
    height: 8px;
    margin-left: 10px;
  }
}

.first-line-mobile{
  width: 100%;
  height: 60px;
  background: #DECAB5;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .burger-menu-button {
    margin-left: 20px;
  }
  .page-title{
    margin-right: 20px;

    font-size: 20px;
    line-height: 23px;
    text-align: right;
    color: #000000;
  }
}
</style>
