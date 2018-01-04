<template>
  <div class="users-pane">
    <div class="circle"></div>
  </div>
</template>
<script>
import axios from 'axios';
import SlotMachine from '@/components/SlotMachine';
import EVENT_BUS from '@/Bus';

export default {
  name: 'Sample',
  data() {
    return {}

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users-pane{
  height: 1000px;
  width: 1000px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0px 20px #ffffff;
}

</style>
