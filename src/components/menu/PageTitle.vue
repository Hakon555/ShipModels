<template>
  <p class="page-title" :class="{'desktop-styles': desktop}">{{title | capitalize}}</p>
</template>

<script>
export default {
  name: 'page-title',
  props: ['desktop'],
  data: function(){
    return {
      title: ""
    }
  },
  methods: {
    getTitle (route){
      if(route.path.indexOf('my-project') !== -1 && route.name !== "my-project")
        this.title = this.currentProject;
      else
        this.title = route.name;
    },
    capitalize (value) { 
      let capitalFirst = value.charAt(0).toUpperCase() 
      let noCaseTail = value.slice(1, value.length) 
      return capitalFirst + noCaseTail;
    }
  },
  computed: {
    currentProject (){
      let projectName = this.$store.getters['myProjectItems/getProjectName'];
      let hmsIndex = projectName.indexOf("hms-");
      if(hmsIndex !== -1)
        projectName = "HMS " + this.capitalize(projectName.slice(hmsIndex + 4))
      return projectName;
    }
  },
  watch: {
    '$route' (to, from) {
      this.getTitle(to);
    }
  },
  filters: {
    capitalize (value) { 
      let capitalFirst = value.charAt(0).toUpperCase() 
      let noCaseTail = value.slice(1, value.length) 
      return capitalFirst + noCaseTail;
    }
  },
  created (){
    this.getTitle(this.$route);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.desktop-styles{
  text-align: center;
  margin-top: 25px;
  font-size: 24px;
  font-weight: bold;
}
</style>
