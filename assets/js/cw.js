// Tab Li 切換
const tabNav = document.querySelectorAll('.tab__nav > ul > li');
tabNav.forEach((element, index) => {
  element.addEventListener("click", function (e) {
    let tabNavLi = e.target.parentNode.children;
    for (let i = 0; i < tabNavLi.length; i++) {
      const item = tabNavLi[i];
      item.classList.remove('active');
    }
    e.target.classList.add('active');
  });
});
