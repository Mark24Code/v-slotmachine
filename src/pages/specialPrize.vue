<template>
  <div class="page-cont" @click="watchClick">
    <input ref="switch" class="switch" type="text" @keyup.enter="pressEnterKey" />
    <div class="prize-title">
      <img src="/static/specialPrizeTitle.png" alt="特等奖">
    </div>
    <div class="lucky-slots">
      <template v-for="gid in luckyguys.length/numPerRow">
        <div class="slot-row">
          <template v-for="luckyguy,index in luckyguys.slice((gid-1)*numPerRow,gid*numPerRow)">
            <SlotMachine :queue="queue" :debug="debug" :luckyguy="luckyguy" :slot_index="(gid-1)*numPerRow+index" :circleSize="circleSize" />
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
    <Helpers />
  </div>
</template>
<script>
import axios from 'axios';
import SlotMachine from '@/components/SlotMachine';
import EVENT_BUS from '@/Bus';
import Helpers from '@/components/Helpers';

export default {
  name: 'specialPrize',
  data() {
    return {
      numPerRow: 1,
      circleSize: 'big',
      isRunning: false,
      debug: false,
      stopInterval: 1000,
      startInterval: 800,
      queue: [{
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
      }, {
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

      luckyguys: [{
        name: '777',
        avatar: '/static/avatar/slot6.png'
      }]
    }
  },
  mounted() {
    let self = this;
    self.$refs.switch.focus();
  },
  methods: {
    watchClick() {
      let self = this;
      self.$refs.switch.focus();
    },
    pressEnterKey(event) {
      console.log("按下了")
      let self = this;
      if (self.isRunning) {
        self.stopAll();
      } else {
        self.startAll();
      }

    },
    startAll() {
      let self = this;
      self.isRunning = true;
      EVENT_BUS.$emit('start_all_event');
      console.log('开始所有');
    },
    stopAll() {
      let self = this;
      self.isRunning = false;
      EVENT_BUS.$emit('stop_all_event');
      console.log('停止所有');
    },
    startOneByOne() {
      let self = this;
      let slot_index = 0;
      let startIntervalId = setInterval(() => {
        if (slot_index >= self.luckyguys.length - 1) {
          clearInterval(startIntervalId)
        }
        EVENT_BUS.$emit('start_event', slot_index);
        console.log('依次开始:', slot_index);
        slot_index += 1

      }, self.startInterval)
    },
    stopOneByOne() {
      let self = this;
      let slot_index = 0;
      let stopIntervalId = setInterval(() => {
        if (slot_index >= self.luckyguys.length - 1) {
          clearInterval(stopIntervalId)
        }
        EVENT_BUS.$emit('stop_event', slot_index);
        console.log('依次结束:', slot_index);
        slot_index += 1

      }, self.stopInterval)
    }
  },
  components: {
    SlotMachine,
    Helpers
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
