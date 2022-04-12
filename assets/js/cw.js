const view = {
  width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
};

function footerType() {
  let bodyClass = document.querySelector('body').classList;
  document.querySelector('footer .container').children.length < 2 ? bodyClass.add('footer--simple') : bodyClass.add('footer--complete');
}

// Tab 切換：Start
function changTab() {
  const tab = document.querySelectorAll('.tab');
  const tab_navs = document.querySelectorAll('.tab__nav > ul > li');
  let tab_nav = {
    li: null,
    current: null,
    array: []
  };
  let tab_content = {
    index: null,
  };
  // 計算選單會不會超過外層
  tab.forEach((element) => {
    let tab_width = element.offsetWidth;
    let tab_ul = element.children[0];
    let tab_next = element.children[1];
    let tab_li = tab_ul.children[0].children;
    let tab_li_width = 0;
    for (let a = 0; a < tab_li.length; a++) {
      tab_li_width += tab_li[a].offsetWidth;
    }
    let tab_divergence = tab_li_width - tab_width;
    tab_ul.classList.remove('tab__nav--scroll');
    tab_ul.classList.remove('tab__nav--static');
    if ( tab_divergence > 0 ) {
      tab_ul.children[0].style.width = `${tab_li_width}px`;
      tab_ul.classList.add('tab__nav--scroll');
    } else {
      tab_ul.classList.add('tab__nav--static');
    }
    tab_next.addEventListener('click', function(){
      if ( tab_next.classList.contains('tab__nav--prev') ) {
        tab_next.classList.remove('tab__nav--prev');
        tab_ul.children[0].style.marginLeft = 0;
      } else {
        tab_next.classList.add('tab__nav--prev');
        tab_ul.children[0].style.marginLeft = `${-tab_divergence - 50}px`;
      }
    })
  });
  // 點擊選單切換內容
  tab_navs.forEach((element) => {
    element.addEventListener("click", function (e) {
      tab_nav.array = [];
      if ( e.target.tagName.toLowerCase() === 'li' ) {
        tab_nav.li = e.target.parentNode.children;
        tab_nav.current = e.target;
        // tab_content.index = 
      } else if ( e.target.tagName.toLowerCase() === 'span' ) {
        tab_nav.li = e.target.parentNode.parentNode.children;
        tab_nav.current = e.target.parentNode;
      }
      for (let i = 0; i < tab_nav.li.length; i++) {
        const item = tab_nav.li[i];
        item.classList.remove('active');
        for (let j = 0; j < item.parentNode.parentNode.parentNode.children[2].children.length; j++) {
          item.parentNode.parentNode.parentNode.children[2].children[j].classList.remove('active');
        }
      }
      tab_nav.current.classList.add('active');

      for (let k = 0; k < tab_nav.li.length; k++) {
        if ( tab_nav.li[k].classList[0] === 'active' ) {
          tab_content.index = k;
        }
      }
      tab_nav.current.parentNode.parentNode.parentNode.children[2].children[tab_content.index].classList.add('active');
    });
  });
}
// Tab 切換：End

function init() {
  footerType();
  changTab();
}

init();
window.addEventListener('resize', function() {
  init();
});
