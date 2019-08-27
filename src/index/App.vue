<!--
 * @Description: In User Settings Edit;
 * @Author: your name
 * @Date: 2019-08-06 19:51:50
 * @LastEditTime: 2019-08-27 16:13:44
 * @LastEditors: hangzhang
 -->
<template>
   <div>
     <p> {{msg}} </p>
     <img :src="test"/>
     <helloWorld></helloWorld>
   </div>
</template>
<script>
import test from '@/index/assets/logo.jpg'
import helloWorld from '@/index/pages/helloworld'

export default {
  components: { helloWorld },
  created () {
    const a = 1
    const pro = new Promise((resolve) => { resolve('hello word123') })
    console.log(pro)
    console.log(a)
  },
  data () {
    return {
      msg: 'hello world   xxworld dqwedd',
      test: test
    }
  }
}
</script>
<style scoped>

p {
  color: red;
  box-sizing: border-box;
  box-shadow:2px 2px 5px #333333;
}
</style>
