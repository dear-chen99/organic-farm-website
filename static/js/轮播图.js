document.addEventListener('DOMContentLoaded', function () {
  // 1. 获取核心元素
  const slidesContainer = document.getElementById('top'); // 对应你的carousel-slides的id
  const radioBtns = document.querySelectorAll('.carousel-radio');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.carousel-dot');
  const totalSlides = 3; // 固定3张轮播图
  let currentIndex = 0;
  let autoplayTimer;
  const autoplayDelay = 5000; // 5秒自动切换

  // 2. 核心：更新轮播显示（控制方向动画）
  function updateCarousel(targetIndex, isPrev = false) {
    // 左箭头：从左至右动画（反向偏移技巧）
    if (isPrev) {
      slidesContainer.style.transition = 'none';
      slidesContainer.style.transform = `translateX(-${(targetIndex + totalSlides) * 33.333}%)`;
      void slidesContainer.offsetWidth; // 强制重绘
      slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    }
    // 执行最终偏移
    slidesContainer.style.transform = `translateX(-${targetIndex * 33.333}%)`;
    // 同步指示器选中状态
    radioBtns[targetIndex].checked = true;
    currentIndex = targetIndex;
  }

  // 3. 右箭头：下一张（从右至左）
  nextBtn.addEventListener('click', function () {
    const nextIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(nextIndex);
    resetAutoplay();
  });

  // 4. 左箭头：上一张（从左至右）
  prevBtn.addEventListener('click', function () {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(prevIndex, true); // 标记为左箭头，触发反向动画
    resetAutoplay();
  });

  // 5. 指示器点击切换
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      updateCarousel(index);
      resetAutoplay();
    });
  });

  // 6. 自动播放逻辑
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      updateCarousel(nextIndex);
    }, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // 7. 悬停暂停自动播放
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  carouselContainer.addEventListener('mouseleave', startAutoplay);

  // 8. 初始化
  startAutoplay();
});
