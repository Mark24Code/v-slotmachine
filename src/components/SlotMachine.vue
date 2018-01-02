<template>
  <div class="slot-machine">
    <div>
      <div class="user-cont">
        <div class="avatar-cont">
          <template v-for="user, index in mqueque">
            <transition :duration="interval" name="custom-classes-transition2" enter-to-class="animated slideInUp" leave-to-class="animated slideOutUp">
              <div v-show="current_index === index" style="position:absolute;left:0;right:0;">
                <img class="avatar" :src="user.avatar" alt="user.name">
              </div>
            </transition>
          </template>
        </div>
        <p>{{mqueque[current_index].name}}</p>
      </div>
    </div>
    <template v-if="debug">
      <p>SlotMachine Debug模式</p>
      <div>队列: {{ mqueque }}</div>
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
import EVENT_BUS from '@/Bus';
const interval = 200

export default {
  name: 'SlotMachine',
  data() {
    return {
      current_index: 0,
      intervalId: undefined,
      newName: '',
      isRunning: true
    }
  },
  props:{
    debug:{
      type:Boolean,
      defalut:false
    },
    mqueque:{
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
    }
  },
  created() {
    this.roundRobin()
  },
  mounted(){
    EVENT_BUS.$on("startevent",function(msg){
      console.log('听到了startEvent:',msg)
    });
    EVENT_BUS.$on("stopevent",function(msg){
      console.log('听到了stopEvent:',msg)
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
        if (this.current_index + 1 === this.mqueque.length) {
          this.current_index = 0
        } else {
          this.current_index += 1
        }
      }, interval)
    },
    stop: function() {
      clearInterval(this.intervalId)
      this.isRunning = false
    },
    start: function() {
      this.roundRobin()
      this.isRunning = true
    },
    add: function(event) {
      this.mqueque.push(this.newName)
      this.newName = ''
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
