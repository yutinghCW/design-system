function insertAside() {
  let str = `<ul>
    <li><span>品牌</span>
        <ul>
            <li><span>設計指南</span>
                <ul>
                    <li><a href="../brand/principle.html">設計原則與範例</a></li>
                </ul>
            </li>
            <li><span>LOGO CI</span>
                <ul>
                    <li><a href="../brand/specification.html">基本規範</a></li>
                    <li><a href="../brand/graphic-application.html">平面應用</a></li>
                    <li><a href="../brand/digital-application.html">數位應用</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><span>平面產品</span>
        <ul>
            <li><span>Foundations</span>
                <ul>
                    <li><a href="../graphic/color.html">Color</a></li>
                    <li><a href="../graphic/typography.html">Typography</a></li>
                </ul>
            </li>
            <li><span>Patterns</span>
                <ul>
                    <li><a href="../graphic/usage.html">Usage</a></li>
                    <li><a href="../graphic/charts.html">Charts</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><span>數位產品</span>
        <ul>
            <li><span>Foundations</span>
                <ul>
                    <li><a href="../digital/color.html">Color</a></li>
                    <li><a href="../digital/typography.html">Typography</a></li>
                    <li><a href="../digital/iconography.html">Iconography</a></li>
                </ul>
            </li>
            <li><span>Components</span>
                <ul>
                    <li><span>Windows and Views</span>
                        <ul>
                            <li><a href="../digital/alert.html">Alerts</a></li>
                            <li><a href="../digital/cookie.html">Cookies</a></li>
                            <li><a href="../digital/dialog.html">Dialogs</a></li>
                            <li><a href="../digital/drawer.html">Drawer</a></li>
                            <li><a href="../digital/menu.html">Menu</a></li>
                            <li><a href="../digital/notification.html">Notification</a></li>
                            <li><a href="../digital/tab.html">Tabs</a></li>
                            <li><a href="../digital/tooltip.html">Tooltips</a></li>
                        </ul>
                    </li>
                    <li><span>Controls</span>
                        <ul>
                            <li><a href="../digital/accordion.html">Accordions</a></li>
                            <li><a href="../digital/button.html">Buttons</a></li>
                            <li><a href="../digital/checkbox.html">Checkboxes</a></li>
                            <li><a href="../digital/pagination.html">Paginations</a></li>
                            <li><a href="../digital/radio-button.html">Radio Buttons</a></li>
                        </ul>
                    </li>
                    <li><span>Fields and Labels</span>
                        <ul>
                            <li><a href="../digital/search-field.html">Search Fields</a></li>
                            <li><a href="../digital/text-field.html">Text Fields</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><span>Patterns</span>
                <ul>
                    <li><a href="../digital/generator/insider.html">insider 實驗產生器</a></li>
                    <li><a href="../digital/generator/cwdaily.html">電子報產生器</a></li>
                </ul>
            </li>
        </ul>
    </li>
  </ul>`;
  document.querySelector('aside').innerHTML = str;
}

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
  insertAside();
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
