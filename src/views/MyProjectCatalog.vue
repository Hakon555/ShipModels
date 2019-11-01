<template>
  <div class="my-project-catalog" v-if="statusMainElement">

    <DetailStatus :statusList="statusList" v-if="isAuthenticated"/>
    <p class="section-title" v-if="isAuthenticated">Каталог</p>

    <template v-if="mobileScreen">
      <BuyingBlock :statusCatalogElement="statusCatalogElement" :catalogItem="catalogItem" v-if="isAuthenticated"/>
      <NecessaryItems :itemId="currentItemId" :currentProjectName="currentProjectName" v-if="isAuthenticated"/>
      <ItemInformation :item="currentItem" :statusMainElement="statusMainElement"/>
    </template>

    <template v-if="desktopScreen">
      <div class="desktop-catalog">
        <ItemInformation class="information" :item="currentItem" :statusMainElement="statusMainElement"/>
        <NecessaryItems class="necessary" :itemId="currentItemId" :currentProjectName="currentProjectName" v-if="isAuthenticated"/>
        <BuyingBlock class="buing" :statusCatalogElement="statusCatalogElement" :catalogItem="catalogItem" v-if="isAuthenticated"/>
      </div>
    </template>
  </div>
</template>

<script>
import DetailStatus from '@/components/my-project/common/DetailStatus.vue'
import ItemInformation from '@/components/my-project/common/ItemInformation.vue'
import BuyingBlock from '@/components/my-project/catalog/BuyingBlock.vue'
import NecessaryItems from '@/components/my-project/catalog/NecessaryItems.vue'
import { GET_CATALOG_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'my-project-catalog',
  props: ['statusMainElement'],
  data: function(){
    return {
      currentItemId: "",
      currentProjectName: ""
    }
  },
  components: {
    ItemInformation,
    BuyingBlock,
    NecessaryItems,
    DetailStatus
  },
  methods: {
    isNeedLoadElement (){
      let isProjectChanged = this.$store.getters['catalogItems/getProjectName'] !== this.currentProjectName;
      let isItemAbsent = !this.$store.getters['catalogItems/getItems'](this.currentItemId);
      return isProjectChanged || isItemAbsent;
    },
    loadElements (force){
      if(this.isNeedLoadElement() || force)
        this.$store.dispatch('catalogItems/' + GET_CATALOG_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]});
    }
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    statusList (){
      return {bought: this.currentItem.quantity.bought};
    },
    catalogItem (){
      return this.$store.getters['catalogItems/getItems'](this.currentItemId);
    },
    statusCatalogElement (){
      return this.$store.getters['catalogItems/getStatus'](this.currentItemId);
    },
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  },
  created () {
    this.currentItemId = this.$route.params.id;
    this.currentProjectName = this.$route.params.projectName;
    this.loadElements();
  },
  beforeRouteUpdate (to, from, next) {
    this.currentItemId = to.params.id;
    this.currentProjectName = to.params.projectName;
    this.loadElements();
    next();
  }
}
</script>

<style scoped lang="scss">
.desktop-catalog{
  display: flex;

  .information{
    margin-right: 100px;
  }
  .necessary{
    min-width: 320px;
  }
  .buing{
    margin-left: 100px;
    max-width: 320px;
  }
}
</style>