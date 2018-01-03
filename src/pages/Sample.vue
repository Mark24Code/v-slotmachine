<template>
  <div class="users-pane">
    <div class="">
      <template v-for="luckyguy in luckyguys">
        <SlotMachine :queue="queue" :debug="debug" :luckyguy="luckyguy"/>
      </template>
    </div>
    <div class="control-pane">
      <button @click="startAll">开始</button>
      <button @click="stopAll">结束</button>
    </div>

  </div>
</template>
<script>
import SlotMachine from '@/components/SlotMachine';
import EVENT_BUS from '@/Bus';

export default {
  name: 'Sample',
  data() {
    return {
      driveData:[{
        queue:[]
      }],
      isRunning:false,
      debug:false,
      queue:[{
        name: '樱桃',
        avatar: '/static/avatar/slot1.png'
      }, {
        name: '橙子',
        avatar: '/static/avatar/slot2.png'
      }, {
        name: '茄子',
        avatar: '/static/avatar/slot3.png'
      }, {
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      }],
      luckyguys:[{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }, {
        name: 'BAR',
        avatar: '/static/avatar/slot5.png'
      }, {
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      }]
    }
  },
  methods: {
    startAll(){
      let self = this;
      console.log('开始所有');
      self.isRunning = true;
      EVENT_BUS.$emit('startevent');
    },
    stopAll(){
      let self = this;
      self.isRunning = false;
      EVENT_BUS.$emit('stopevent');
      console.log('停止所有');

    }
  },
  components:{
    SlotMachine
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
