<template>
  <div class="users-pane">
    <div class="lucky-slots">
      <template v-for="luckyguy,index in luckyguys">
        <SlotMachine :queue="queue" :debug="debug" :luckyguy="luckyguy" :slot_index="index"/>
      </template>
    </div>
    <div class="control-pane">
      <button @click="startAll">开始</button>
      <button @click="stopAll">结束</button>
      <button @click="startOneByOne">依次开始</button>
      <button @click="stopOneByOne">依次结束</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import SlotMachine from '@/components/SlotMachine';
import EVENT_BUS from '@/Bus';

export default {
  name: 'Sample',
  data() {
    return {
      isRunning:false,
      debug:false,
      stopInterval:1000,
      startInterval:800,

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
      },{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }, {
        name: 'BAR',
        avatar: '/static/avatar/slot5.png'
      }, {
        name: '樱桃',
        avatar: '/static/avatar/slot1.png'
      }, {
        name: '橙子',
        avatar: '/static/avatar/slot2.png'
      }, {
        name: '茄子',
        avatar: '/static/avatar/slot3.png'
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
      self.isRunning = true;
      EVENT_BUS.$emit('start_all_event');
      console.log('开始所有');
    },
    stopAll(){
      let self = this;
      self.isRunning = false;
      EVENT_BUS.$emit('stop_all_event');
      console.log('停止所有');

    },
    startOneByOne(){
      let self = this;
      let slot_index = 0;
      let startIntervalId= setInterval(()=>{
        if(slot_index>=self.luckyguys.length-1){
          clearInterval(startIntervalId)
        }
        EVENT_BUS.$emit('start_event',slot_index);
        console.log('依次开始:',slot_index);
        slot_index += 1

      },self.startInterval)
    },
    stopOneByOne(){
      let self = this;
      let slot_index = 0;
      let stopIntervalId= setInterval(()=>{
        if(slot_index>=self.luckyguys.length-1){
          clearInterval(stopIntervalId)
        }
        EVENT_BUS.$emit('stop_event',slot_index);
        console.log('依次结束:',slot_index);
        slot_index += 1

      },self.stopInterval)
    }
  },
  components:{
    SlotMachine
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.lucky-slots{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
