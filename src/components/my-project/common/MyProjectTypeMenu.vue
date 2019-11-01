<template>
  <div class="project-type-menu">
    <router-link v-if="isAuthenticated"
      :to="'/my-project/construction' + currentItem"
      tag="div"
      class="menu-item"
      active-class="active">
      <img src="/static/images/sborka.png" alt="">
    </router-link>
    <router-link
      :to="'/my-project/catalog' + currentItem"
      tag="div"
      class="menu-item"
      active-class="active">
      <img src="/static/images/catalog.png" alt="">
    </router-link>
    <router-link v-if="isAuthenticated"
      :to="'/my-project/statistic' + currentItem"
      tag="div"
      class="menu-item"
      active-class="active">
      <img src="/static/images/statistic.png" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'my-project-type-menu',
  data: function (){
    return {

    }
  },
  computed: {
    currentItem (){
      return '/' + this.$route.params.projectName + '/' + this.$route.params.id;
    },
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  }
}
</script>

<style scoped lang="scss">
.project-type-menu{
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .menu-item{
    width: 40px;
    height: 35px;
    border: 1px solid #8F7C6A;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,.25);
    cursor: pointer;

    &.active{
      box-shadow: 0 2px 7px #237F93;
    }
    &:first-child{
      margin-left: 0;
    }
  }
}
</style>