let selectedPrice = 0;
let currentQuantity = 1;

// 初始化元素
const quantityInput = document.getElementById('quantity');
const totalPriceElement = document.getElementById('totalPrice');
const minusBtn = document.querySelector('.minus-btn');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

// 初始化总价显示
updateTotalPriceDisplay(0);

// 监听手机号输入验证
phoneInput.addEventListener('input', function () {
  const phoneError = document.getElementById('phoneError');
  if (this.value && !/^1[3-9]\d{9}$/.test(this.value)) {
    phoneError.style.display = 'block';
  } else {
    phoneError.style.display = 'none';
  }
});

// 监听邮箱输入验证
emailInput.addEventListener('input', function () {
  const emailError = document.getElementById('emailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (this.value && !emailPattern.test(this.value)) {
    emailError.style.display = 'block';
  } else {
    emailError.style.display = 'none';
  }
});

// 监听姓名输入验证
nameInput.addEventListener('input', function () {
  const nameError = document.getElementById('nameError');
  if (this.value && this.value.trim().length < 2) {
    nameError.style.display = 'block';
  } else {
    nameError.style.display = 'none';
  }
});

// 选择产品/体验项目
function selectProduct(btn) {
  // 移除所有产品的选中状态
  const allBtns = document.querySelectorAll('.select-product-btn');
  allBtns.forEach(b => {
    b.classList.remove('active');
    // 根据卡片类型设置按钮文字
    const card = b.closest('.product-card');
    b.textContent = card.querySelector('.product-name').textContent.includes('体验') ? '选择该体验' : '选择该产品';
  });

  // 设置当前产品为选中状态
  btn.classList.add('active');
  btn.textContent = '已选中';

  // 获取选中产品的单价
  selectedPrice = parseFloat(btn.closest('.product-card').dataset.price);

  // 重新计算总价
  calculateTotalPrice();
}

// 改变数量（增减）
function changeQuantity(change) {
  // 计算新数量
  let newQty = currentQuantity + change;

  // 数量最小值为1
  if (newQty < 1) {
    return;
  }

  // 更新数量
  currentQuantity = newQty;
  quantityInput.value = currentQuantity;

  // 更新减号按钮状态
  minusBtn.disabled = currentQuantity <= 1;

  // 重新计算总价
  calculateTotalPrice();
}

// 计算总价
function calculateTotalPrice() {
  const total = selectedPrice * currentQuantity;
  updateTotalPriceDisplay(total);
}

// 更新总价显示
function updateTotalPriceDisplay(amount) {
  totalPriceElement.textContent = `¥${amount.toFixed(2)}`;
}

// 表单提交处理
document.getElementById('reserveForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // 验证是否选择了产品/体验
  if (selectedPrice === 0) {
    alert('请先选择需要预约的产品或体验项目！');
    return;
  }

  // 验证表单输入
  if (!this.checkValidity()) {
    alert('请检查并填写所有必填项，确保信息格式正确！');
    // 触发HTML5原生验证提示
    this.reportValidity();
    return;
  }

  // 构建预约信息
  const reservationInfo = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    quantity: currentQuantity,
    totalPrice: (selectedPrice * currentQuantity).toFixed(2),
    product: document.querySelector('.select-product-btn.active') ?
      document.querySelector('.select-product-btn.active').closest('.product-card').querySelector('.product-name').textContent : ''
  };

  // 显示预约成功信息
  const successMessage = `🎉 预约成功！
📋 预约信息：
姓名：${reservationInfo.name}
手机号：${reservationInfo.phone}
邮箱：${reservationInfo.email}
预约项目：${reservationInfo.product}
预约数量：${reservationInfo.quantity}
预约总价：¥${reservationInfo.totalPrice}

我们会尽快与您联系确认预约详情，感谢您的支持！`;

  alert(successMessage);

  // 重置表单和状态
  resetForm();
});

// 重置表单和状态
function resetForm() {
  // 重置表单输入
  document.getElementById('reserveForm').reset();

  // 重置数量
  currentQuantity = 1;
  quantityInput.value = 1;
  minusBtn.disabled = true;

  // 重置总价
  selectedPrice = 0;
  updateTotalPriceDisplay(0);

  // 重置产品选中状态
  const allBtns = document.querySelectorAll('.select-product-btn');
  allBtns.forEach(b => {
    b.classList.remove('active');
    const card = b.closest('.product-card');
    b.textContent = card.querySelector('.product-name').textContent.includes('体验') ? '选择该体验' : '选择该产品';
  });

  // 隐藏验证提示
  document.querySelectorAll('.validation-message').forEach(el => {
    el.style.display = 'none';
  });
}

// 页面加载完成后初始化减号按钮状态
window.addEventListener('DOMContentLoaded', function () {
  minusBtn.disabled = currentQuantity <= 1;
});
