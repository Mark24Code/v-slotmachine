<template>
  <div class="helpers">
    <div class="circle" @click="showUp"></div>
    <transition name="helpers-classes-transition"
    enter-active-class="animated bounceInRight"
    leave-active-class="animated bounceOutRight">
    <ul class="navs" v-if="isShow">
      <router-link class="nav-item" :to="{name:'thirdprize'}">三等奖</router-link>
      <router-link class="nav-item" :to="{name:'secondprize30'}">二等奖30个</router-link>
      <router-link class="nav-item" :to="{name:'secondprize20'}">二等奖20个</router-link>
      <router-link class="nav-item" :to="{name:'firstprize'}">一等奖</router-link>
      <router-link class="nav-item" :to="{name:'specialprize'}">特等奖</router-link>
    </ul>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'helpers',
  data() {
    return {
      isShow:false
    }
  },
  props: {

  },
  created() {
    let self = this;
  },
  mounted() {
    let self = this;

  },
  methods: {
    showUp(){
      let self = this;
      self.isShow = true;
      let helperIntervalId = setInterval(() => {
          self.isShow = false;
          clearInterval(helperIntervalId);
      }, 3000)
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a,
a:link,
a:visited,
a:hover {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
  padding: 0;
}
.circle{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0px 100px #ffffff;
}

.helpers {
  width: 95px;
  color: #fff;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navs{
  display: flex;
  flex-direction: column;
  text-align: left;
}
.nav-item{
  background: #503761;
  border-radius: 4px;
  margin:1px 0;
  padding: 5px;
  box-shadow: 0px 0px 10px #e9e8fd;
}

</style>
