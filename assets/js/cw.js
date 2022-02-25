// Tab Li 切換
const tab_navs = document.querySelectorAll('.tab__nav > ul > li');
let tab_nav = {
  li: null,
  current: null,
  array: []
};
let tab_content = {
  index: null,
};
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
