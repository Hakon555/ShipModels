<template>
  <footer>
    <nav class="mobile-bottom--menu">

      <MenuLinks :links="footerMenuLinks" type="footer"/>

      <div class="last-line">
        <p class="copyright">© ShipModels</p>
        <p class="info-email">shipmodels@info.ru</p>
      </div>
    </nav>
    </footer>
</template>

<script>
import MenuLinks from '@/components/menu/MenuLinks.vue'
import {GET_BOTTOM_MENU} from '@/store/actionConstants/actions'

export default {
  name: 'FooterComponent',
  computed: {
    footerMenuLinks: function (){
      return this.$store.getters.bottomMenuLinks;
    }
  },
  beforeCreate: function () {
    this.$store.dispatch(GET_BOTTOM_MENU, this.$router.currentRoute.path);
  },
  components: {
    MenuLinks
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
footer{
  width: 100%;
  height: 120px;
  background: #DECAB5;

  nav.mobile-bottom--menu{
    height: 97px;

    ul{
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      justify-content: center;
      padding-top: 25px;

      li{
        width: 50%;
        margin-bottom: 12px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;

        a{
          text-decoration: none;
          color: #000000;
        }
      }
    }
  }
  .last-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    font-size: 10px;
    line-height: 9px;
    color: #6D340A;

    .copyright{
      margin-left: 20px;
    }
    .info-email{
      margin-right: 20px;
    }
  }
}

@media (min-width: 1280px) {
  footer{
    height: 100px;

    nav.mobile-bottom--menu{
      ul{
        justify-content: space-around;
        width: 70%;
        margin: 0 auto;
        padding-top: 45px;

        li{
          width: auto;
        }
      }
    }
  }
}
</style>
