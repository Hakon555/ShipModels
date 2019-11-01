<template>
  <div class="statistic-list">

    <template v-if="statusStatisticElement">
      <div class="statistic-scheme">

        <div class="statistic-scheme-item" v-for="item in statisticItems" :key="item.id">
          <div class="time-column">
            <p class="time">{{item.value}}</p>
          </div>
          <div class="description-column">
            <span class="title">{{item.name}}</span>
            <span>{{item.description}}</span>
          </div>
        </div>

      </div>
      <!-- <p class="statistic-scheme-added-text">*для изменения данных кликните на значение.</p> -->
    </template>
    <Spinner v-else size="30"/>

  </div>
</template>

<script>
import Spinner from '@/components/spinners/Spinner.vue'

export default {
  name: 'statistic-list',
  props: ['statisticItem', 'statusStatisticElement'],
  components: {
    Spinner
  },
  methods: {
    parseValue ({value, type}){
      switch(type){
        case "t":
          let minutes = value % 60;
          let hours = (value - minutes) / 60;
          return hours + "h" + minutes + "m"
          break;
        case "m":
          return value + "р"
          break;
      }
      return;
    }
  },
  computed: {
    statisticItems (){
      let statisticListItems = [];
      Object.entries(this.statisticItem.common).forEach(([key, value]) => {
        statisticListItems.push({
          id: key,
          name: value.name,
          value: this.parseValue(value),
          description: value.description,
        });
      });
      return statisticListItems;
    }
  }
}
</script>

<style scoped lang="scss">
.statistic-scheme{
  margin-top: 25px;

  .statistic-scheme-item{
    display: flex;
    align-items: center;
    margin-top: 15px;

    .time-column{
      min-width: 100px;

      .time{
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #B8934B;
      }
    }
    .description-column{
      font-size: 12px;
      line-height: 14px;
      color: #40260E;

      .title{
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}
.statistic-scheme-added-text{
  font-size: 12px;
  line-height: 14px;
  color: #40260E;
  margin-top: 25px;
}
</style>