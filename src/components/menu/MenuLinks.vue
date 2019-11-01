<template>
  <ul :class="{'main-mobile-menu': type === 'mobile'}">
    <li v-for="link in links" v-bind:key="link.name">
        <div class="for-icon" v-if="type !== 'footer'">
            <img :src="'/static/images/' + link.icon" alt="">
        </div>
        <a class="link" :class="{active: checkActive(link.link)}" @click.prevent="$router.push(link.link); $emit('click');">{{link.name}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuLinks',
  props: ['links', 'type'],
  methods: {
    checkActive (link){
      if(link.indexOf("my-project") !== -1 && this.currnetRoute.path.indexOf("my-project") !== -1)
        return true;
      if(this.currnetRoute.path === link)
        return true;
      return false;
    }
  },
  computed: {
    currnetRoute (){
      return this.$route;
    }
  }
}
</script>

<style scoped lang="scss">
.link{
  cursor: pointer;
}
.active{
  font-weight: bold;
  color: #6d340a;
}
</style>
