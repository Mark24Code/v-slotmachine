<template>
  <div class="slot-machine">
    <div>
      <div class="user-cont" v-if="squeue.length>0">
        <div class="avatar-cont">
          <template v-for="user, index in squeue">
            <transition :duration="interval" name="custom-classes-transition2" enter-to-class="animated slideInUp" leave-to-class="animated slideOutUp">
              <div v-show="current_index === index" style="position:absolute;left:0;right:0;">
                <img class="avatar" :src="user.avatar" alt="user.name">
              </div>
            </transition>
          </template>
        </div>
        <p>{{squeue[current_index].name}}</p>
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
import {unorderArr} from '@/util/index';
import EVENT_BUS from '@/Bus';
const interval = 200

export default {
  name: 'SlotMachine',
  data() {
    return {
      current_index: 0,
      intervalId: undefined,
      newName: '',
      isRunning: false,
      squeue:[],
      luckyguy_index:undefined

    }
  },
  props:{
    debug:{
      type:Boolean,
      defalut:false
    },
    queue:{
      type:Array,
      default:[{
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
    interval:{
      type:Number,
      default:200
    },
    luckyguy:{
      type:Object,
      default:null
    }
  },
  created() {
    let self = this;
    self.squeue = unorderArr(self.queue);
    // this.roundRobin()
  },
  mounted(){
    let self = this;
    if(self.luckyguy){
      self.luckyguy_index = self.enqueue(self.luckyguy)
    }
    EVENT_BUS.$on("startevent",function(){
      self.start()
    });
    EVENT_BUS.$on("stopevent",function(){
      self.stop()
    })
  },
  computed:{
    styles(){
      let self = this;
      let interval = self.interval;
      return {
        animationDuration: `${interval / 1000}s`,
        animationFillMode: 'both'
      }
    }
  },
  methods: {
    roundRobin: function() {
      this.intervalId = setInterval(() => {
        if (this.current_index + 1 === this.squeue.length) {
          this.current_index = 0
        } else {
          this.current_index += 1
        }
      }, interval)
    },
    stop: function() {
      let self = this;
      if(self.isRunning){
        clearInterval(this.intervalId);
        console.log('stop');
        console.log('self.luckyguy_index:',self.luckyguy_index);
        console.log('self.current_index:',self.current_index)
        if(self.luckyguy_index){
          self.current_index = self.luckyguy_index;
        }
        this.isRunning = false;
      }
    },
    start: function() {
      let self = this;
      if(!self.isRunning){
        this.roundRobin()
        this.isRunning = true
      }
    },
    add: function(event) {
      let self = this;
      let index = self.squeue.push(self.newName)
      self.newName = '';
      return index;
    },
    enqueue:function(guy){
      let self = this;
      return self.squeue.push(guy)-1
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.user-cont{
  position: relative;
}
.avatar-cont {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border:4px solid black;
  overflow: hidden;
  /*background: red;*/
  position: relative;
}

img.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

</style>
