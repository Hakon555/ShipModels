<template>
  <div class="main-pop-up for-scripts-detail-info" v-if="currentItemId">
    <div class="pop-up-header">
      <p class="title">Информация о детали</p>
      <div class="close-pop-up" @click="$emit('closePopup')"></div>
    </div>
    <div class="pop-up-content">
      <div class="image-container" @click="goToDetail">
        <img :src="currentItem.pictures.svg.main.src" alt="">
      </div>

      <DetailTitle :currentItem="currentItem" :statusMainElement="statusMainElement" @click="goToDetail"/>
      <DetailStatus :statusList="statusList"/>

      <p class="section-title">Каталог</p>

      <p class="alert-necessary-details" v-if="isNecessary">! Необходима для текущей детали</p>

      <BuyingBlock :statusCatalogElement="statusCatalogElement" :catalogItem="catalogItem"/>

      <div class="button" @click="goToDetail">Подробнее</div>
    </div>
  </div>
</template>

<script>
import DetailTitle from '@/components/my-project/common/DetailTitle.vue'
import DetailStatus from '@/components/my-project/common/DetailStatus.vue'
import BuyingBlock from '@/components/my-project/catalog/BuyingBlock.vue'
import { GET_CATALOG_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'modal-project-scheme',
  props: ['currentItemId', 'currentProjectName', 'mainElement'],
  data: function(){
    return {

    }
  },
  components: {
    DetailTitle,
    DetailStatus,
    BuyingBlock
  },
  methods: {
    goToDetail (){
      this.$router.push(this.detailLink);
      this.$emit('closePopup');
    },
    isNeedLoadElement (){
      let isProjectChanged = this.$store.getters['myProjectItems/getProjectName'] !== this.currentProjectName;
      let isItemAbsent = !this.$store.getters['catalogItems/getItems'](this.currentItemId);
      return isProjectChanged || isItemAbsent;
    }
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    statusMainElement (){
      return this.$store.getters['myProjectItems/getStatus'](this.currentItemId);
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
    isNecessary (){
      return !!this.mainElement.assemblyConnections.details[this.currentItemId];
    },
    detailLink (){
      return '/my-project/catalog/' + this.$route.params.projectName + '/' + this.currentItemId;
    }
  },
  created () {
    if(this.isNeedLoadElement())
      this.$store.dispatch('catalogItems/' + GET_CATALOG_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]});
  },
}
</script>

<style scoped lang="scss">
.image-container{
  width: 100%;
  cursor: pointer;

  img{
    width: 100%;
    max-height: 120px;
  }
}
.section-title{
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #40260E;
  margin-top: 15px;
}
.alert-necessary-details{
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #CA3110;
  margin-top: 15px;
}
.button{
  width: 100px;
  height: 36px;
  border: 1px solid #6d340a;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  font-weight: normal;
  font-size: 16px;
  line-height: 33px;
  text-align: center;
  color: #6d340a;
  margin: 5px auto;
  margin-top: 15px;
  background: none;
  cursor: pointer;
}
</style>
