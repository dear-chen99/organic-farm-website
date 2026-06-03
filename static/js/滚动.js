// 监听页面滚动事件
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  // 滚动距离超过 20px 时触发效果（可根据需求调整阈值）
  if (window.scrollY > 20) {
    header.classList.add('scroll-active');
  } else {
    header.classList.remove('scroll-active');
  }
});
