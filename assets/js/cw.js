const view = {
  width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
};

let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

let slideDown = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') {
    display = 'block';
  }
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

let fadeIn = (target, duration = 500) => {
  target.style.display = 'block';
  target.style.opacity = 0;
  if (target.style.opacity == 0 && target.style.opacity != '') {
    var num = 0;
    var timer = setInterval(function () {
      num++;
      target.style.opacity = num / 10;
      if (num >= 10) {
        clearInterval(timer);
      }
    }, duration);
  }
};

let fadeOut = (target, duration = 500) => {
  target.style.display = 'block';
  if (target.style.opacity == 1 || target.style.opacity == '') {
    var num = 10;
    var timer = setInterval(function () {
      num--;
      target.style.opacity = num / 10;
      if (num == 0) {
        clearInterval(timer);
      }
    }, duration);
  }
};

let fadeToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return fadeOut(target, duration);
  } else {
    return fadeIn(target, duration);
  }
};

let getSiblings = function (e) {
  let siblings = [];
  if (!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

function footerType() {
  let bodyClass = document.querySelector('body').classList;
  document.querySelector('footer .container').children.length < 2
    ? bodyClass.add('footer--simple')
    : bodyClass.add('footer--complete');
}

function buttonRipple() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.onclick = function (e) {
      let x = e.layerX;
      let y = e.layerY;
      let ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 1000); // 1second = 1000ms
    };
  });
}

function createBlackTouch() {
  const div = document.createElement('div');
  div.classList.add('black');
  document.body.appendChild(div);
}

// Drawer：Start
function toggleDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.menubar--left');
  const black = document.querySelector('.black');
  hamburger?.addEventListener('click', () => {
    drawer.classList.toggle('opened');
    black.classList.toggle('opened');
  });
  black.addEventListener('click', () => {
    drawer.classList.toggle('opened');
    black.classList.toggle('opened');
  });
}
function toggleDrawerLi() {
  const drawerLi = document.querySelectorAll(
    '.menubar--left > ul> li > div > .icon'
  );
  drawerLi.forEach((item) => {
    item.addEventListener('click', (e) => {
      let subChannel = e.target.parentElement.nextElementSibling;
      let siblingUl = getSiblings(
        e.target.parentElement.parentElement.parentElement
      );
      let siblingli = getSiblings(e.target.parentElement.parentElement);
      siblingUl.forEach((ul) => {
        for (let i = 0; i < ul.children.length; i++) {
          const li = ul.children[i];
          if (li.children.length > 1) {
            li.children[0].children[1].classList.remove('active');
            slideUp(li.children[1], 200);
          }
        }
      });
      siblingli.forEach((element) => {
        if (element.children.length > 1) {
          element.children[0].children[1].classList.remove('active');
          slideUp(element.children[1], 200);
        }
      });
      e.target.classList.toggle('active');
      slideToggle(subChannel, 200);
    });
  });
}
// Drawer：End

// Tab 切換：Start
function changTab() {
  const tab = document.querySelectorAll('.tab');
  const tab_navs = document.querySelectorAll('.tab__nav > ul > li');
  let tab_nav = {
    li: null,
    current: null,
    array: [],
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
    if (tab_divergence > 0) {
      tab_ul.children[0].style.width = `${tab_li_width}px`;
      tab_ul.classList.add('tab__nav--scroll');
    } else {
      tab_ul.classList.add('tab__nav--static');
    }
    tab_next.addEventListener('click', function () {
      if (tab_next.classList.contains('tab__nav--prev')) {
        tab_next.classList.remove('tab__nav--prev');
        tab_ul.children[0].style.marginLeft = 0;
      } else {
        tab_next.classList.add('tab__nav--prev');
        tab_ul.children[0].style.marginLeft = `${-tab_divergence - 50}px`;
      }
    });
  });
  // 點擊選單切換內容
  tab_navs.forEach((element) => {
    element.addEventListener('click', function (e) {
      tab_nav.array = [];
      if (e.target.tagName.toLowerCase() === 'li') {
        tab_nav.li = e.target.parentNode.children;
        tab_nav.current = e.target;
        // tab_content.index =
      } else if (e.target.tagName.toLowerCase() === 'span') {
        tab_nav.li = e.target.parentNode.parentNode.children;
        tab_nav.current = e.target.parentNode;
      }
      for (let i = 0; i < tab_nav.li?.length; i++) {
        const item = tab_nav.li[i];
        item.classList.remove('active');
        for (
          let j = 0;
          j < item.parentNode.parentNode.parentNode.children[2].children.length;
          j++
        ) {
          item.parentNode.parentNode.parentNode.children[2].children[
            j
          ].classList.remove('active');
        }
      }
      tab_nav.current.classList.add('active');

      for (let k = 0; k < tab_nav.li.length; k++) {
        if (tab_nav.li[k].classList[0] === 'active') {
          tab_content.index = k;
        }
      }
      tab_nav.current.parentNode.parentNode.parentNode.children[2].children[
        tab_content.index
      ].classList.add('active');
    });
  });
}
// Tab 切換：End

function init() {
  createBlackTouch();
  footerType();
  buttonRipple();
  toggleDrawer();
  toggleDrawerLi();
  changTab();
}

init();
window.addEventListener('resize', function () {
  init();
});
