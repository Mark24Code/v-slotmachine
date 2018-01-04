<template>
  <div class="modal" v-if="isShow" @mousewheel.native.prevent>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data() {
    return {

    }
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  mounted(){

  },
  computed:{

  },
  methods: {
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.72);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  padding:70px 0;
}
</style>
