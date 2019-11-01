<template>
  <div class="my-project-construction" v-if="statusMainElement">

    <DetailStatus :statusList="statusList"/>
    <p class="section-title">Сборка</p>

    <template v-if="mobileScreen">
      <DetailInstructions :instructions="instructions"/>
      <ChangeStatus :currentItemId="currentItemId" :currentProjectName="currentProjectName" @statusChanged="loadElements(true);"/>
      <ItemInformation :item="currentItem" :statusMainElement="statusMainElement"/>
    </template>

    <template v-if="desktopScreen">
      <div class="desktop-construction">
        <ItemInformation class="information" :item="currentItem" :statusMainElement="statusMainElement"/>
        <DetailInstructions class="instruction" :instructions="instructions"/>
      </div>
      <ChangeStatus class="change-status" :currentItemId="currentItemId" :currentProjectName="currentProjectName" @statusChanged="loadElements(true);"/>
    </template>

  </div>
</template>

<script>
import DetailStatus from '@/components/my-project/common/DetailStatus.vue'
import ItemInformation from '@/components/my-project/common/ItemInformation.vue'
import DetailInstructions from '@/components/my-project/construction/DetailInstructions.vue'
import ChangeStatus from '@/components/my-project/construction/ChangeStatus.vue'
import { GET_CONSTRUCTION_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'my-project-construction',
  props: ['statusMainElement'],
  data: function(){
    return {
      url: 'get/construction/items',
      currentItemId: "",
      currentProjectName: ""
    }
  },
  components: {
    ItemInformation,
    DetailStatus,
    DetailInstructions,
    ChangeStatus
  },
  methods: {
    isNeedLoadElement (){
      let isProjectChanged = this.$store.getters['constructionItems/getProjectName'] !== this.currentProjectName;
      let isItemAbsent = !this.$store.getters['constructionItems/getItems'](this.currentItemId);
      return isProjectChanged || isItemAbsent;
    },
    loadElements (force){
      if(this.isNeedLoadElement() || force)
        this.$store.dispatch('constructionItems/' + GET_CONSTRUCTION_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]});
    }
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    statusList (){
      let statuses = {bought: this.currentItem.quantity.bought};
      if(this.constructionItem)
        statuses['maked'] = this.constructionItem.status;
      return statuses;
    },
    instructions (){
      if(!this.constructionItem) return;
      return this.constructionItem.instructions;
    },
    constructionItem (){
      return this.$store.getters['constructionItems/getItems'](this.currentItemId);
    },
    statusConstructionElement (){
      return this.$store.getters['constructionItems/getStatus'](this.currentItemId);
    },
  },
  created (){
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
.desktop-construction{
  display: flex;
  justify-content: space-between;

  .information{
    width: 40%;
  }
  .instruction{
    width: 40%;
    margin-top: -20px;
  }
}
</style>