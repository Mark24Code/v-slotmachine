<template>
  <div class="page-cont">
  <div class="prize-title">
    <img src="/static/thirdPrizeTitle.png" alt="三等奖">
  </div>
  <div class="users-pane" @click="watchClick">
    <div class="lucky-slots">
      <template v-for="gid in luckyguys.length/10">
        <div class="slot-row">
          <template v-for="luckyguy,index in luckyguys.slice((gid-1)*10,gid*10)">
            <SlotMachine :queue="queue" :debug="debug" :luckyguy="luckyguy" :slot_index="(gid-1)*10+index"/>
          </template>
        </div>
      </template>
    </div>

    <div class="control-pane" v-if="debug">
      <button @click="startAll">开始</button>
      <button @click="stopAll">结束</button>
      <button @click="startOneByOne">依次开始</button>
      <button @click="stopOneByOne">依次结束</button>
    </div>
  </div>
  <Modal :isShow="isShowModal">
    <div class="prize-title">
      <img src="/static/thirdPrizeTitle.png" alt="三等奖">
    </div>
  </Modal>
  <input ref="switch" class="switch" type="text" @keyup.enter="pressEnterKey"  :v-focus="focusPress" />
  </div>
</template>
<script>
import axios from 'axios';
import SlotMachine from '@/components/SlotMachine';
import Modal from '@/components/Modal';
import EVENT_BUS from '@/Bus';

export default {
  name: 'thirdPrize',
  data() {
    return {
      focusPress:true,
      isRunning:false,
      debug:false,
      stopInterval:1000,
      startInterval:800,
      isShowModal:false,
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
      },{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }, {
        name: 'BAR',
        avatar: '/static/avatar/slot5.png'
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
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
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
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      },{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }, {
        name: 'BAR',
        avatar: '/static/avatar/slot5.png'
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
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
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
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      },{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }, {
        name: 'BAR',
        avatar: '/static/avatar/slot5.png'
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
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      }, {
        name: '铃铛',
        avatar: '/static/avatar/slot4.png'
      }]
    }
  },
  mounted(){
    let self = this;
    self.$refs.switch.focus();
  },
  methods: {
    watchClick(){
      let self = this;
      self.$refs.switch.focus();
    },
    pressEnterKey(event){
      console.log("按下了")
      let self = this;
      if(self.isRunning){
        self.stopAll();
        self.isShowModal = true;
      }else{
        self.startAll();
        self.isShowModal = false;
      }

    },
    startAll(){
      let self = this;
      self.isRunning = true;
      EVENT_BUS.$emit('start_all_event');
      console.log('开始所有');
      self.isShowModal = false;
    },
    stopAll(){
      let self = this;
      self.isRunning = false;
      EVENT_BUS.$emit('stop_all_event');
      console.log('停止所有');
      self.isShowModal = true;

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
    SlotMachine,
    Modal
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-cont{
  margin:70px 0;
}
.prize-title{
  text-align: center;
}
.users-pane{
  margin:60px 5%;
}
.lucky-slots{
  display: flex;
  flex-direction: column;
}
.slot-row{
  display: flex;
  justify-content: space-around;
}
.switch{
  /*visibility: hidden;*/
  position: fixed;
  width: 10px;
  height: 10px;
  top:-15px;
  left:-15px;
/*  top:-100px;
  left:-100px;*/
  z-index: 2000;
}
</style>
