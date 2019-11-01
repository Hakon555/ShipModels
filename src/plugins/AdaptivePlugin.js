/**
 * Use v-if with plugin params for adaptive elements.
 * params array: [mobileScreen, desktopScreen]. All params located in "data.adaptive.screens.param".
 * Using:
 * <div v-if="desktopScreen"></div> - this block will show on the desktop
 */
export default (function (){
  'use strict';

  let adaptiveMixin = {
    data: function (){
      return {
        adaptive: {
          scWidth: 1,
          scHeight: 1,
          // breakpoints: {
          //   phone: 320,
          //   desktop: 1280
          // },
          screens: {
            mobileScreen: 320,
            //tabletScreen: 640,
            desktopScreen: 1280,
          },
          resizeScreen: function (event){
            this.scWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.scHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          },
          currentScreen: function(screenName){
            let breakpoint = this.screens[screenName];
            let currentWidth = this.scWidth;
            let result = false;

            if(screenName === 'mobileScreen' && currentWidth < this.screens.mobileScreen) return true;

            if(currentWidth >= breakpoint)
              result = true;

            Object.entries(this.screens).forEach(([key, value]) => {
              if(key === screenName) return;
              if(value < breakpoint) return;
              if(currentWidth > value)
              result = false;
            });
            return result;
          }
        }
      }
    },
    computed: {
      mobileScreen: function() {
        return this.adaptive.currentScreen("mobileScreen");
      },
      desktopScreen: function() {
        return this.adaptive.currentScreen("desktopScreen");
      },
      //tabletScreen: function() {
      //  return this.adaptive.currentScreen("tabletScreen");
      //},
    },
    mounted: function mountedAdaptive() {
      window.addEventListener('resize', () => this.adaptive.resizeScreen());
      this.adaptive.resizeScreen();
    },
    destroyed: function destroyedAdaptive() {
      window.removeEventListener('resize', () => this.adaptive.resizeScreen());
    }
  }
  
  let install = function(Vue){
    Vue.mixin(adaptiveMixin);
  }

  return {install};
}());