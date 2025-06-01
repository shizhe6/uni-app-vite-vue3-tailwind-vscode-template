<template>
  <!-- 加载动画容器，用于包裹整个加载效果 -->
  <div class="loading-container">
    <!-- 旋转动画的父容器，控制花瓣的定位范围 -->
    <div class="loading-spinner">
      <!-- 第1个花瓣，对应左上位置 -->
      <div class="petal petal-1"></div>
      <!-- 第2个花瓣，对应右上位置 -->
      <div class="petal petal-2"></div>
      <!-- 第3个花瓣，对应右下位置 -->
      <div class="petal petal-3"></div>
      <!-- 第4个花瓣，对应左下位置 -->
      <div class="petal petal-4"></div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑区域（组合式API）
// 这里可以添加组件的业务逻辑（如接收props、定义方法等），当前无额外逻辑
</script>

<style scoped>
/* 加载容器样式：控制整体布局 */
.loading-container {
  /* 弹性布局，使子元素垂直水平居中 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 高度占满视口 */
}

/* 旋转动画父容器样式：控制花瓣的定位基准 */
.loading-spinner {
  position: relative;      /* 相对定位，作为子元素绝对定位的基准 */
  width: 60px;             /* 容器宽度 */
  height: 60px;            /* 容器高度 */
}

/* 通用花瓣样式：定义所有花瓣的公共属性 */
.petal {
  position: absolute;      /* 绝对定位，基于父容器定位 */
  width: 48%;              /* 宽度占父容器的50%（60px*50%=30px） */
  height: 48%;             /* 高度占父容器的50%（60px*50%=30px） */
  border-radius: 100% 0 0 0; /* 左上角圆角100%，其他角无圆角（形成扇形） */
  /* 定义旋转动画：1.5秒无限循环，线性过渡 */
  animation: spin 1.5s infinite linear;
  /* 旋转中心点：设置为父容器的右下角（60px*100%=60px，即父容器右下角） */
  transform-origin: 100% 100%;
}

/* 第1个花瓣样式（左上位置） */
.petal-1 {
  top: 0;                  /* 顶部对齐父容器 */
  left: 0;                 /* 左侧对齐父容器 */
  background-color: #ff6b6b; /* 背景颜色 */
  animation-delay: 0s;     /* 动画延迟0秒（立即开始） */
}

/* 第2个花瓣样式（右上位置） */
.petal-2 {
  top: 0;                  /* 顶部对齐父容器 */
  right: 0;                /* 右侧对齐父容器 */
  background-color: #4ecdc4; /* 背景颜色 */
  border-radius: 0 100% 0 0; /* 右上角圆角100%（调整扇形方向） */
  transform-origin: 0 100%; /* 旋转中心点：父容器左下角 */
  animation-delay: 0s;     /* 动画延迟0秒（立即开始） */
}

/* 第3个花瓣样式（右下位置） */
.petal-3 {
  bottom: 0;               /* 底部对齐父容器 */
  right: 0;                /* 右侧对齐父容器 */
  background-color: #63ca63; /* 背景颜色 */
  border-radius: 0 0 100% 0; /* 右下角圆角100%（调整扇形方向） */
  transform-origin: 0 0;    /* 旋转中心点：父容器左上角 */
  animation-delay: 0s;     /* 动画延迟0秒（立即开始） */
}

/* 第4个花瓣样式（左下位置） */
.petal-4 {
  bottom: 0;               /* 底部对齐父容器 */
  left: 0;                 /* 左侧对齐父容器 */
  background-color: #1a535c; /* 背景颜色 */
  border-radius: 0 0 0 100%; /* 左下角圆角100%（调整扇形方向） */
  transform-origin: 100% 0; /* 旋转中心点：父容器右上角 */
  animation-delay: 0s;     /* 动画延迟0秒（立即开始） */
}

/* 定义旋转动画关键帧 */
@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1); /* 初始状态：0度旋转，不缩放 */
    opacity: 1;                       /* 完全不透明 */
  }
  50% {
    transform: rotate(180deg) scale(0.8); /* 中间状态：180度旋转，缩放0.8倍 */
    opacity: 0.7;                       /* 半透明 */
  }
  100% {
    transform: rotate(360deg) scale(1); /* 结束状态：360度旋转（回到初始角度），恢复缩放 */
    opacity: 1;                       /* 完全不透明 */
  }
}
</style>