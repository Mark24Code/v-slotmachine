<template>
  <div class="slot-machine" :class="circleSize==='big'?'big':''">
    <div>
      <div class="user-cont" v-if="squeue.length>0">
        <div class="avatar-cont">
          <template v-for="user, index in squeue">
            <transition :duration="interval" name="slot-machine-transition" enter-to-class="animated slideInUp" leave-to-class="animated slideOutUp">
              <div v-show="current_index === index" style="position:absolute;left:0;right:0;">
                <img class="avatar" :src="user.avatar" alt="user.name">
              </div>
            </transition>
          </template>
        </div>
        <div class="user-name">{{squeue[current_index].name}}</div>
      </div>
    </div>
    <template v-if="debug">
      <p>SlotMachine Debug模式</p>
      <div>队列: {{ squeue }}</div>
      <div>中奖:{{luckyguy}},luckyguy_index:{{luckyguy_index}}</div>
      <div>当前 index:{{current_index}},luckyguy_index:{{luckyguy_index}}</div>
      <div>
        <input v-model="newName" type="text" placeholder="New Name" @keyup.enter="add"></input>
        <button @click="add">Add!</button>
      </div>
      <div v-if="isRunning === true" style="margin-bottom:100px;">
        <button @click="stop">Stop!</button>
      </div>
      <div v-else style="margin-bottom:100px;">
        <button @click="start">Start!</button>
      </div>
    </template>
  </div>
</template>
<script>
import { unorderArr } from '@/util/index';
import EVENT_BUS from '@/Bus';

const interval = 200; //slideInUp slideOutUp
const speedArr = [200, 180, 160, 140, 120];
export default {
  name: 'SlotMachine',
  data() {
    return {
      current_index: 0,
      intervalId: undefined,
      moreSpeedIntervalId: undefined,
      newName: '',
      isRunning: false,
      squeue: [],
      luckyguy_index: undefined,
      interval: 200

    }
  },
  props: {
    debug: {
      type: Boolean,
      defalut: false
    },
    circleSize: {
      type: String,
      defalut: 'defalut'
    },
    queue: {
      type: Array,
      default: [{
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
      }]
    },
    luckyguy: {
      type: Object,
      default: null
    },
    slot_index: {
      type: Number,
      default: null
    }
  },
  created() {
    let self = this;
    self.squeue = unorderArr(self.queue);
  },
  mounted() {
    let self = this;
    if (self.luckyguy) {
      self.luckyguy_index = self.enqueue(self.luckyguy)
    }
    EVENT_BUS.$on("start_all_event", function() {
      self.start()
    });
    EVENT_BUS.$on("stop_all_event", function() {
      self.stop()
    });
    EVENT_BUS.$on("start_event", function(slot_index) {
      if (self.slot_index == slot_index) {
        self.start()
      }
    });
    EVENT_BUS.$on("stop_event", function(slot_index) {
      if (self.slot_index == slot_index) {
        self.stop()
      }
    });

  },
  methods: {
    roundRobin: function() {
      let self = this;
      let squeueLen = self.squeue.length;
      self.intervalId = setInterval(() => {
        self.current_index = (self.current_index + 1) % squeueLen;
      }, interval)
    },
    stop: function() {
      let self = this;

      if (self.isRunning) {
        if (self.moreSpeedIntervalId) {
          clearInterval(self.moreSpeedIntervalId);
        }
        clearInterval(this.intervalId);
        if (self.luckyguy_index) {
          self.current_index = self.luckyguy_index;
        }
        this.isRunning = false;
      }
    },
    start: function() {
      let self = this;
      if (!self.isRunning) {
        this.roundRobin()
        this.isRunning = true


        let moreSpeedCount = 0;
        self.moreSpeedIntervalId = setInterval(() => {
          if (moreSpeedCount < 5) {
            self.interval = speedArr[moreSpeedCount]
            moreSpeedCount += 1;
          } else {
            clearInterval(self.moreSpeedIntervalId);
            self.moreSpeedIntervalId = undefined;
          }
        }, 1000)
      }
    },
    add: function(event) {
      let self = this;
      let index = self.squeue.push(self.newName)
      self.newName = '';
      return index;
    },
    enqueue: function(guy) {
      let self = this;
      let squeueLen = self.squeue.length;
      let pos = Math.floor(Math.random() * (squeueLen - 1))
      self.squeue.splice(pos, 0, guy)
      return pos
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slot-machine {
  position: relative;
  width: 140px;
  margin: 15px;
  display: inline-block;
}

.avatar-cont {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 5px solid #fee117;
  box-shadow: 0px 0px 20px #e9e8fd;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}

img.avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}

.user-name {
  font-size: 28px;
  font-weight: 500;
  color: #fee117;
  text-align: center;
  margin: 20px;
  text-shadow: 0px 0px 20px #e9e8fd;
}

.slot-machine.big {
  position: relative;
  width: 200px;
  margin: 15px;
  display: inline-block;
}

.slot-machine.big .avatar-cont {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fee117;
  box-shadow: 0px 0px 20px #e9e8fd;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}

.slot-machine.big img.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.slot-machine.big .user-name {
  font-size: 28px;
  font-weight: 500;
  color: #fee117;
  text-align: center;
  margin: 20px;
  text-shadow: 0px 0px 20px #e9e8fd;
}

</style>
