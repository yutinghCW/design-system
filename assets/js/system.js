function naviArrow() {
  let asideList = document.querySelectorAll('aside li');
  asideList.forEach(element => {
    if ( element.childElementCount > 1 ) {
      element.parentElement.classList.add('ul--slide')
    }
  });
}

function naviByLink() {
  let asideLink = document.querySelectorAll('aside li a');
  asideLink.forEach((element, index) => {
    if ( element.href.indexOf(window.location.pathname) > 0 ) {
      element.classList.add('active');
      element.parentElement.parentElement.parentElement.classList.add('opened');
      element.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('opened');
      element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('opened');
    }
  });
}

function init() {
  naviArrow();
  naviByLink();
}

init();
window.addEventListener('resize', function() {
  init();
});

document.querySelector('aside').addEventListener('click', function(e) {
  const lv1 = e.target.parentElement.parentElement.parentElement;
  if ( lv1.nodeName.toLowerCase() === 'aside' ) {
    for (let i = 0; i < lv1.children[0].children.length; i++) {
      let lv1element = lv1.children[0].children[i];
      lv1element.classList.remove('opened');
      // 第二層關閉
      for (let j = 0; j < lv1element.children[1].children.length; j++) {
        let lv2element = lv1element.children[1].children;
        lv2element[j].classList.remove('opened');
        // 第三層關閉
        for (let k = 0; k < lv2element[j].children[1].children.length; k++) {
          lv2element[j].children[1].children[k].classList.remove('opened');
        }
      }
    }
  }
  e.target.parentElement.classList.toggle('opened');
});
