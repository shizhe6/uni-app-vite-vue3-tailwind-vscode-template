<template>
  <view class="loading-container">
    <view class="box">
      <view class="box-item1 item"></view>
      <view class="box-item2 item"></view>
      <view class="box-item3 item"></view>
      <view class="box-item4 item"></view>
    </view>
  </view>
</template>

<script setup></script>

<style  lang="scss" scoped>/* stylelint-disable */
.loading-container {
  margin: 0;
  padding: 0;
  /* background-color: #262626; */
  height: 10vh;
  width: 100vw;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
}

.item {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background: #ff0;
  /* border-radius: 50%; */
}
.box-item1 {
  background: #fff900;
  box-shadow: 0 0 25px #fff900;
  animation: animate 2s linear infinite;
}
.box-item2 {
  background: #08ff28;
  box-shadow: 0 0 25px #08ff28;
  animation: animate 2s linear infinite;
  animation-delay: -1s;
}
.box-item3 {
  background: #ff005a;
  box-shadow: 0 0 25px #ff005a;
  animation: animate 2s linear infinite;
  animation-delay: -0.5s;
}
.box-item4 {
  background: #3896ff;
  box-shadow: 0 0 25px #3896ff;
  animation: animate 2s linear infinite;
  animation-delay: -1.5s;
}

@keyframes animate {
  0% {
    top: 0;
    left: 0;
  }
  5% {
    top: 0;
    left: 0;
  }
  20% {
    top: 0;
    left: 50%;
  }
  25% {
    top: 0;
    left: 50%;
  }
  50% {
    top: 50%;
    left: 50%;
  }
  55% {
    top: 50%;
    left: 50%;
  }
  75% {
    top: 50%;
    left: 0;
  }
  80% {
    top: 50%;
    left: 0;
  }
  100% {
    top: 0;
    left: 0;
  }
}
</style>
