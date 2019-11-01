<template>
  <div class="my-project-items">

    <div class="mobile-container desktop-container">
      <MyProjectTypeMenu/>

      <BreadCrumbs :currentItemId="currentItemId" :statusMainElement="statusMainElement"/>
      <ProjectScheme :currentItemId="currentItemId" :statusMainElement="statusMainElement" :currentProjectName="currentProjectName"/>
      <DetailTitle :currentItem="currentItem" :statusMainElement="statusMainElement"/>

      <router-view :statusMainElement="statusMainElement"></router-view>
      
      <template v-if="mobileScreen">
        <AdditionalBlock v-if="isAuthenticated" necessaryType="details" :itemId="currentItemId" :currentProjectName="currentProjectName" :statusMainElement="statusMainElement"/>
        <AdditionalBlock v-if="isAuthenticated" necessaryType="fasteners" :itemId="currentItemId" :currentProjectName="currentProjectName" :statusMainElement="statusMainElement"/>
      </template>
      <template v-if="desktopScreen">
        <div class="desktop-additional">
          <AdditionalBlock v-if="isAuthenticated" necessaryType="details" :itemId="currentItemId" :currentProjectName="currentProjectName" :statusMainElement="statusMainElement"/>
          <AdditionalBlock v-if="isAuthenticated" necessaryType="fasteners" :itemId="currentItemId" :currentProjectName="currentProjectName" :statusMainElement="statusMainElement"/>
        </div>
      </template>

      <Spinner v-if="!statusMainElement && !notFound" blockHeight="120"/>
      <p class="alert-not-found" v-if="notFound">Товар не найден.</p>
      <EndMobilePage/>
    </div>

  </div>
</template>

<script>
import { GET_PROJECT_ITEMS, GET_PROJECT_SCOPE_ITEMS } from '@/store/actionConstants/actions'
import MyProjectTypeMenu from '@/components/my-project/common/MyProjectTypeMenu.vue'
import BreadCrumbs from '@/components/my-project/common/BreadCrumbs.vue'
import Spinner from '@/components/spinners/Spinner.vue'
import ProjectScheme from '@/components/my-project/common/ProjectScheme.vue'
import DetailTitle from '@/components/my-project/common/DetailTitle.vue'
import AdditionalBlock from '@/components/my-project/common/AdditionalBlock.vue'
import EndMobilePage from '@/components/EndMobilePage.vue'
import checkLoadedItems from '@/utils/checkLoadedItems'

export default {
  name: 'my-project-items',
  data: function(){
    return {
      currentItemId: "",
      currentProjectName: "",
      notFound: false
    }
  },
  components: {
    MyProjectTypeMenu,
    BreadCrumbs,
    Spinner,
    ProjectScheme,
    DetailTitle,
    AdditionalBlock,
    EndMobilePage,
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    statusMainElement (){
      return this.$store.getters['myProjectItems/getStatus'](this.currentItemId);
    },
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  },
  created () {
    this.currentItemId = this.$route.params.id;
    this.currentProjectName = this.$route.params.projectName;
    this.notFound = false;

    if(checkLoadedItems.call(this, this.currentItemId))
      this.$store.dispatch('myProjectItems/' + GET_PROJECT_SCOPE_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]}).then((resp)=>{
        if(resp.notFound)
          this.notFound = true;
      });
  },
  beforeRouteUpdate (to, from, next) {
    this.currentItemId = to.params.id;
    this.currentProjectName = to.params.projectName;
    this.notFound = false;

    if(checkLoadedItems.call(this, this.currentItemId))
      this.$store.dispatch('myProjectItems/' + GET_PROJECT_SCOPE_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]}).then((resp)=>{
        if(resp.notFound)
          this.notFound = true;
      });
    next();
  }
}
</script>

<style lang="scss">
.section-title{
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #40260E;
  margin-top: 15px;
}
.desktop-additional{
  width: 70%;
  min-width: 320px;
}
</style>