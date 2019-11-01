<template>
  <div class="my-project">
    <div class="mobile-container desktop-container">

      <router-link v-if="!isUpper"
        to="/my-project/all"
        tag="div"
        class="go-to-catalog"
        active-class="active">
        Перейти в каталог
      </router-link>

      <div class="catalog-list">
        <div class="catalog-element" v-for="(value, key) in itemsList" :key="key">
          <ProjectScheme :currentItemId="key" :statusMainElement="value.status" :currentProjectName="key" v-if="!isUpper"/>
          <div class="image-scheme" v-if="value.currentItem && isUpper && value.status">
            <div class="scheme-wrapper" @click="goToProject(key)">
              <img :src="value.currentItem.pictures.svg.main.src" alt="">
            </div>
          </div>
          <DetailTitle :currentItem="value.currentItem" :statusMainElement="value.status" @click="goToProject(key)"/>
          <DetailStatus :statusList="statusList(value.currentItem)" v-if="value.status"/>
          
          <p class="section-title" v-if="value.status">Информация о корабле</p>
          <ItemInformation :item="value.currentItem" :statusMainElement="value.status"/>

          <Spinner v-if="!value.status && !notFound" blockHeight="120"/>
        </div>
      </div>

      <p class="alert-not-found" v-if="notFound">Проект не найден.</p>

      <EndMobilePage/>
    </div>

  </div>
</template>

<script>
import { GET_PROJECT_ITEMS, GET_PROJECT_SCOPE_ITEMS } from '@/store/actionConstants/actions'
import Spinner from '@/components/spinners/Spinner.vue'
import ProjectScheme from '@/components/my-project/common/ProjectScheme.vue'
import DetailTitle from '@/components/my-project/common/DetailTitle.vue'
import EndMobilePage from '@/components/EndMobilePage.vue'
import checkLoadedItems from '@/utils/checkLoadedItems'
import DetailStatus from '@/components/my-project/common/DetailStatus.vue'
import ItemInformation from '@/components/my-project/common/ItemInformation.vue'
import apiCall from '@/utils/api'

export default {
  name: 'my-project',
  data: function(){
    return {
      currentItemId: "",
      url: 'get/projects',
      projectItems: {},
      notFound: false,
    }
  },
  components: {
    Spinner,
    ProjectScheme,
    DetailTitle,
    EndMobilePage,
    ItemInformation,
    DetailStatus
  },
  methods: {
    getItemsList (){
      apiCall({url: this.url, data: {items: []}, method: 'POST'}).then(resp => {
        this.projectItems = Object.assign({}, this.projectItems, resp);
        this.$store.dispatch('myProjectItems/' + GET_PROJECT_ITEMS, {upper: true, project: 'all', items: Object.keys(resp)});
      });
    },
    goToProject (link){
      this.$router.push('/my-project/' + link);
    },
    statusList (currentItem){
      return (currentItem)? {started: currentItem.statuses.started} : {};
    },
    loadElements (){
      if(checkLoadedItems.call(this, this.currentItemId))
        this.$store.dispatch('myProjectItems/' + GET_PROJECT_SCOPE_ITEMS, {project: this.currentItemId, items: [this.currentItemId]}).then((resp)=>{
        if(resp.notFound)
          this.notFound = true;
      });
    }
  },
  computed: {
    itemsList (){
      let objItems = {};
      let projectKeys = [];

      if(this.isUpper)
        projectKeys = Object.keys(this.projectItems);
      else
        projectKeys.push(this.currentItemId);

      projectKeys.forEach(element => {
        objItems[element] = {
          currentItem: this.$store.getters['myProjectItems/getItems'](element),
          status: this.$store.getters['myProjectItems/getStatus'](element)
        };
      });
      return objItems;
    },
    isUpper (){
      return this.currentItemId === "all";
    },
  },
  created () {
    this.currentItemId = this.$route.params.projectName;

    if(this.isUpper){
      this.getItemsList();
    }else{
      this.loadElements();
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.currentItemId = to.params.projectName;
    this.notFound = false;

    if(this.isUpper){
      this.getItemsList();
    }else{
      this.loadElements();
    }
    next();
  }
}
</script>

<style lang="scss">
.catalog-element{
  margin: 10px 0;
}
.section-title{
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #40260E;
  margin-top: 15px;
}
.go-to-catalog{
  width: 170px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #40260E;
  box-sizing: border-box;
  border-radius: 18px;
  font-size: 14px;
  line-height: 36px;
  color: #40260E;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
}
.image-scheme{
  margin-top: 15px;

  .scheme-wrapper{
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    .img{
      width: 100%;
      max-height: 200px;
      min-height: 55px;
    }
  }
}
@media (min-width: 1280px) {
  .catalog-list{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .catalog-element{
    margin: 10px 35px;
  }
  .image-scheme{
    margin-bottom: 70px;
  }
}
</style>