<template>
  <div class="navigation-menu" v-if="statusMainElement">
    <div class="arrow-back" @click="$router.back()"></div>

    <div class="breadcrumbs">
      <router-link v-for="item in createdLinks" v-bind:key="item.id"
      :to="item.link"
      class="menu-item"
      active-class="active">{{item.name}}</router-link>
    </div>

    <div class="arrow-forward" @click="$router.forward()"></div>
  </div>
</template>

<script>
export default {
  name: 'bread-crumbs',
  props: ["currentItemId", "statusMainElement"],
  computed:{
    createdLinks (){
      let links = [];
      let workSpase = "";

      this.$store.getters['myProjectItems/getItems'](this.currentItemId).bindings.parents.forEach((element, index) => {
        if(index === 0){
          workSpase = this.$route.meta.path + element[0];
          links.push({link: '/my-project' + element[0], name: element[1], id: index});
        }else{
          links.push({link: workSpase + '/' + element[0], name: element[1], id: index});
        }
      });
      links.push({link: workSpase + '/' + this.currentItemId, name: this.$store.getters['myProjectItems/getItems'](this.currentItemId).name, id: 999});

      return links;
    }
  },
}
</script>

<style scoped lang="scss">
.navigation-menu{
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;

  .arrow-back{
    background: url("/static/images/forward-back-button.png") no-repeat;
    width: 25px;
    height: 25px;
    min-width: 45px;
    cursor: pointer;
  }
  .breadcrumbs{
    .menu-item{
      text-decoration: none;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      color: #8F7C6A;
      cursor: pointer;

      &:after{
        content: ">";
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
      }
      &:last-child:after{
        content: ""
      }
    }
  }
  .arrow-forward{
    background: url("/static/images/forward-back-button.png") no-repeat;
    width: 25px;
    height: 25px;
    transform: rotate(180deg);
    min-width: 45px;
    cursor: pointer;
  }
}
</style>