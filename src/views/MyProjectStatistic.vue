<template>
  <div class="my-project-statistic" v-if="statusMainElement">
    <div class="section-title-block">
      <p class="section-title">Статистика</p>
      <!-- <div class="side-button"></div> -->
    </div>

    <StatisticList :statusStatisticElement="statusStatisticElement" :statisticItem="statisticItem"/>
  </div>
</template>

<script>
import StatisticList from '@/components/my-project/statistic/StatisticList.vue'
import { GET_STATISTIC_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'my-project-statistic',
  props: ['statusMainElement'],
  data: function(){
    return {
      currentItemId: "",
      currentProjectName: ""
    }
  },
  components: {
    StatisticList
  },
  methods: {
    isNeedLoadElement (){
      let isProjectChanged = this.$store.getters['statisticItems/getProjectName'] !== this.currentProjectName;
      let isItemAbsent = !this.$store.getters['statisticItems/getItems'](this.currentItemId);
      return isProjectChanged || isItemAbsent;
    },
    loadElements (force){
      if(this.isNeedLoadElement() || force)
        this.$store.dispatch('statisticItems/' + GET_STATISTIC_ITEMS, {project: this.currentProjectName, items: [this.currentItemId]});
    }
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    statusList (){
      return {bought: this.currentItem.quantity.bought};
    },
    statisticItem (){
      return this.$store.getters['statisticItems/getItems'](this.currentItemId);
    },
    statusStatisticElement (){
      return this.$store.getters['statisticItems/getStatus'](this.currentItemId);
    },
  },
  created () {
    this.currentItemId = this.$route.params.id;
    this.currentProjectName = this.$route.params.projectName;
    this.loadElements();
  },
  beforeRouteUpdate (to, from, next) {
    this.currentItemId = this.$route.params.id;
    this.currentProjectName = to.params.projectName;
    this.loadElements();
    next();
  }
}
</script>

<style scoped lang="scss">
.section-title-block{
  display: flex;
  align-items: center;

  .side-button{
    background: url("/static/images/go-to-statistic-button.png") no-repeat;
    width: 50px;
    height: 22px;
    margin-top: 15px;
    margin-left: 15px;
  }
}
</style>