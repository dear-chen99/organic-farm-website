let cart = [
  { id: 1, name: "Onicon Salty", price: 12.52, quantity: 1, img: "static/picture/16.1-300x300.jpg" },
  { id: 2, name: "Salty Kettle Corn", price: 12.52, quantity: 1, img: "static/picture/32.1-300x300.jpg" }
];
let cartTimer = null;

const cartIconWrapper = document.querySelector('.cart-wrapper');
const cartDropdown = document.querySelector('.cart-content');
const cartCount = document.querySelector('.cart-btn span:last-child');
const cartItems = document.querySelector('.cart-items');
const subtotalPrice = document.querySelector('.cart-row:nth-child(1) h4');
const shippingPrice = document.querySelector('.cart-row:nth-child(2) h4');
const taxesPrice = document.querySelector('.cart-row:nth-child(3) h4');
const totalPrice = document.querySelector('.total-value');
const viewCartBtn = document.querySelector('.checkout-btn');
const checkoutBtn = document.querySelector('.checkout-bth');

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== parseInt(id));
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';

  let subtotal = 0;
  let count = 0;
  const shipping = 10.00;
  const taxes = 5.00;

  // 遍历购物车商品
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="item-image"><img src="${item.img}" alt="${item.name}"></div>
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <div class="item-spec">
          <h3>$${item.price.toFixed(2)}</h3>
          <h5 class="remove-item" data-id="${item.id}">×</h5>
        </div>
        <div class="item-footer">
          <div class="item-quantity">
            <span class="quantity-btn minus" data-id="${item.id}">-</span>
            <span class="quantity-value">${item.quantity}</span>
            <span class="quantity-btn plus" data-id="${item.id}">+</span>
          </div>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  // 更新数量和价格显示
  cartCount.textContent = count;
  subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
  shippingPrice.textContent = `$${shipping.toFixed(2)}`;
  taxesPrice.textContent = `$${taxes.toFixed(2)}`;
  totalPrice.textContent = `$${(subtotal + shipping + taxes).toFixed(2)}`;

  // 处理空购物车状态
  if (cart.length === 0) {
    cartItems.innerHTML = '<div style="text-align:center; padding:20px; color:#757575;">Your cart is empty</div>';
  }

  // 绑定数量操作事件
  bindQuantityEvents();
}

//修改商品数量
function changeQuantity(id, type) {
  const item = cart.find(item => item.id === parseInt(id));
  if (!item) return;

  if (type === 'plus') {
    item.quantity++;
  } else if (type === 'minus' && item.quantity > 1) {
    item.quantity--;
  }

  updateCart();
}

// 绑定数量操作事件
function bindQuantityEvents() {
  // 减号按钮
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // 阻止事件冒泡到document
      const id = this.dataset.id;
      changeQuantity(id, 'minus');
    });
  });

  // 加号按钮
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // 阻止事件冒泡到document
      const id = this.dataset.id;
      changeQuantity(id, 'plus');
    });
  });

  // 删除按钮
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // 阻止事件冒泡到document
      const id = this.dataset.id;
      removeFromCart(id);
    });
  });
}

//结算按钮功能
function bindCheckoutEvents() {
  // 查看购物车按钮
  viewCartBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // 阻止事件冒泡到document
    clearTimeout(cartTimer); // 清除定时器防止弹窗消失
    if (cart.length === 0) {
      alert("Your cart is empty! Please add some items first.");
      return;
    }
    // 实际项目替换为跳转购物车页面
    alert("Redirecting to Cart Page...\nTotal items: " + cartCount.textContent);
  });

  // 结算按钮
  checkoutBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // 阻止事件冒泡到document
    clearTimeout(cartTimer); // 清除定时器防止弹窗消失
    if (cart.length === 0) {
      alert("Your cart is empty! Please add some items first.");
      return;
    }
    // 实际项目替换为跳转结算页面
    alert(`Proceed to Checkout!\nTotal Amount: ${totalPrice.textContent}`);
  });
}
// ESC 键关闭购物车弹窗
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    // 只有购物车弹窗显示时，才执行关闭
    if (cartDropdown.style.visibility === "visible") {
      hideCart();
    }
  }
});

// 核心：显示购物车
function showCart() {
  clearTimeout(cartTimer);
  cartDropdown.style.opacity = "1";
  cartDropdown.style.visibility = "visible";
  cartDropdown.style.transform = "translateY(0)";
}

// 核心：隐藏购物车
function hideCart() {
  clearTimeout(cartTimer);
  cartDropdown.style.opacity = "0";
  cartDropdown.style.visibility = "hidden";
  cartDropdown.style.transform = "translateY(10px)";
}

// 1. 点击购物车容器 → 切换显示/隐藏
cartIconWrapper.addEventListener('click', function (e) {
  e.stopPropagation(); // 阻止事件冒泡到document
  // 判断当前购物车是否显示
  const isVisible = cartDropdown.style.visibility === "visible";
  if (isVisible) {
    hideCart(); // 显示状态 → 隐藏
  } else {
    showCart(); // 隐藏状态 → 显示
  }
});

// 2. 阻止购物车弹窗内部点击事件冒泡（避免点击内部关闭）
cartDropdown.addEventListener('click', function (e) {
  e.stopPropagation();
});

// 3. 点击页面其他区域 → 隐藏购物车
document.addEventListener('click', function () {
  hideCart();
});

// 初始化绑定
bindCheckoutEvents();
updateCart();

// 初始状态：隐藏购物车
hideCart();
