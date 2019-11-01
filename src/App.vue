<template>
  <div id="app" class="wrapper">
    <HeaderComponent/>
    <main>
        <router-view/>
    </main>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'


export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
@import "assets/css/normalize.css";
@import "assets/css/common-styles.scss";

body{
  height: 100%;//прижатие футера к низу
  width: 100%;//прижатие футера к низу
  position: absolute//прижатие футера к низу
}
.wrapper{
  display: flex;//прижатие футера к низу
	flex-direction: column;//прижатие футера к низу
	min-height: 100%;//прижатие футера к низу
}
main{
  width: 100%;
  flex: 1 0 auto;//прижатие футера к низу
}
footer{
  flex: 0 0 auto;//прижатие футера к низу
}
.mobile-container{
  margin-left: 20px;
  margin-right: 20px;
}
.router-link-exact-active{
  font-weight: bold;
  color: #6d340a;
}
.alert-not-found{
  text-align: center;
  font-size: 20px;
  color: #6d340a;
  margin-top: 25px;
}
@media (min-width: 1280px) {
  .desktop-container{
    max-width: 1500px;
    padding: 0 100px;
    margin: 0 auto;
  }
}
</style>
