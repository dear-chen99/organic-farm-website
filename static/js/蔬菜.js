// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
  // =====================  商品分类筛选功能 =====================
  const filterButtons = document.querySelectorAll('.button-filter-group button');
  const productCards = document.querySelectorAll('.container .card');

  // 给每个商品标记分类（根据名称匹配）
  const productCategories = {
    'Cabbage': 'VEGETABLES',
    'Brokoli': 'VEGETABLES',
    'Chicken': 'MEAT',
    'Cucumber': 'VEGETABLES',
    'Mulberry': 'FRUIT',
    'Lemon': 'FRUIT',
    'Meat': 'MEAT',
    'Orange': 'FRUIT'
  };
  // 陈鲜新增
  filterButtons[0].classList.add('active');
  // 筛选按钮点击事件
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      // 陈鲜end
      const filterType = this.textContent.trim().toUpperCase();

      // 筛选商品
      productCards.forEach(card => {
        const productName = card.querySelector('.name').textContent.trim();
        const category = productCategories[productName] || '';

        if (filterType === 'ALL' || category === filterType) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
