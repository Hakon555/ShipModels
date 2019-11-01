<template>
  <div class="item-information" v-if="statusMainElement">
    <div class="detail-description">
      <div v-if="weight" class="description-item">
        <span class="title">Вес:</span>
        <span>{{weight}}</span>
      </div>
      <div v-if="length" class="description-item">
        <span class="title">Длина:</span>
        <span>{{length}}</span>
      </div>
      <div v-if="width" class="description-item">
        <span class="title">Ширина:</span>
        <span>{{width}}</span>
      </div>
      <div v-if="height" class="description-item">
        <span class="title">Высота:</span>
        <span>{{height}}</span>
      </div>
      <div v-if="buildComplexity" class="description-item">
        <span class="title">Сложность:</span>
        <span>{{buildComplexity}}</span>
      </div>
      <div v-if="description" class="description-item">
        <span class="title">Описание:</span>
        <span>{{description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-information',
  props: ['item', 'addedInformation', 'statusMainElement'],
  computed: {
    weight (){
      return (this.item.detailParams.weight) ? this.item.detailParams.weight + " гр": "";
    },
    length (){
      return (this.item.detailParams.dimensions.length) ? this.item.detailParams.dimensions.length + " мм": "";
    },
    width (){
      return (this.item.detailParams.dimensions.width) ? this.item.detailParams.dimensions.width + " мм": "";
    },
    height (){
      return (this.item.detailParams.dimensions.height) ? this.item.detailParams.dimensions.height + " мм": "";
    },
    buildComplexity (){
      return this.item.detailParams.buildComplexity;
    },
    description (){
      return this.item.detailParams.description;
    }
  }
}
</script>

<style scoped lang="scss">
.detail-description{
  margin-top: 20px;

  .description-item{
    font-size: 12px;
    line-height: 14px;
    color: #40260E;
    margin-bottom: 3px;

    .title{
      font-weight: bold;
      margin-right: 0.5em;
    }
  }
}
</style>