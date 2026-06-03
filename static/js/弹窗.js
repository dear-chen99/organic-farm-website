document.addEventListener('DOMContentLoaded', function () {
  const POPUP_OVERLAY = document.getElementById('featurePopup');
  const POPUP_CLOSE_BTN = document.getElementById('popupCloseBtn');

  // 显示弹窗
  function showPopup() {
    if (!POPUP_OVERLAY) return; // 容错：避免元素不存在报错
    POPUP_OVERLAY.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // 隐藏弹窗
  function hidePopup() {
    if (!POPUP_OVERLAY) return;
    POPUP_OVERLAY.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 弹窗关闭事件（按钮）
  if (POPUP_CLOSE_BTN) {
    POPUP_CLOSE_BTN.addEventListener('click', hidePopup);
  }

  // 点击遮罩层关闭弹窗
  if (POPUP_OVERLAY) {
    POPUP_OVERLAY.addEventListener('click', (e) => {
      if (e.target === POPUP_OVERLAY) {
        hidePopup();
      }
    });
  }

  // ESC键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && POPUP_OVERLAY?.classList.contains('active')) {
      hidePopup();
    }
  });

  // 1. 对需要保护的区域（购物车、注册表单、底部导航）整体阻止冒泡
  const PROTECTED_CONTAINERS = [
    '.carousel-btn',
    '.cart-wrapper',
    '.register-container',
    '.dark-icon',
    '.button-filter-group button',
    'form'
  ];

  PROTECTED_CONTAINERS.forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      // 容器内所有点击事件都阻止冒泡，且不触发弹窗
      container.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止冒泡到document
      });
    }
  });

  // 2. 只选择需要触发弹窗的元素
  const POPUP_TRIGGERS = [
    '.lim button',
    '.contact-bar-button',
    '.three-card-grid button',
    '.shop-btn',
    '.bottom-nav-item',
    '.view-all-btn',
    '.button-group button:not(.register)',
    '.donations .button-group button',
    'a.read-more'
  ];

  // 找到所有.nav-link元素
  const NAV_LINKS = document.querySelectorAll('.nav-main-link, .nav-sub-link');
  NAV_LINKS.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止a标签跳转
      showPopup(); // 触发弹窗
    });
  });

  // 合并选择器并绑定弹窗事件
  const TRIGGER_ELEMENTS = document.querySelectorAll(POPUP_TRIGGERS.join(','));
  TRIGGER_ELEMENTS.forEach(el => {
    if (el.closest(PROTECTED_CONTAINERS.join(','))) return;

    el.addEventListener('click', (e) => {
      showPopup();
      e.stopPropagation();
    });
  });
});
