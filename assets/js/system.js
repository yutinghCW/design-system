let domain = '';

if ( window.location.origin.indexOf('github.io') > 0 ) {
  domain = 'https://yutinghcw.github.io/design-system';
} else {
  domain = window.location.origin;
}

console.log(domain);

function insertChannelLink() {
  document.querySelector('header a.channel').setAttribute('href', `${domain}/`);
}

function insertAside() {
  let str = `<ul>
    <li><a href="${domain}/download.html">資源下載</a></li>
    <li><span>品牌</span>
        <ul>
            <li><span>設計指南</span>
                <ul>
                    <li><a href="${domain}/brand/principle.html">設計原則與範例</a></li>
                </ul>
            </li>
            <li><span>LOGO CI</span>
                <ul>
                    <li><a href="${domain}/brand/specification.html">基本規範</a></li>
                    <li><a href="${domain}/brand/graphic-application.html">平面應用</a></li>
                    <li><a href="${domain}/brand/digital-application.html">數位應用</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><span>平面產品</span>
        <ul>
            <li><span>Foundations</span>
                <ul>
                    <li><a href="${domain}/graphic/color.html">Color</a></li>
                    <li><a href="..${domain}graphic/typography.html">Typography</a></li>
                </ul>
            </li>
            <li><span>Patterns</span>
                <ul>
                    <li><a href="${domain}/graphic/usage.html">Usage</a></li>
                    <li><a href="${domain}/graphic/charts.html">Charts</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><span>數位產品</span>
        <ul>
            <li><span>Foundations</span>
                <ul>
                    <li><a href="${domain}/digital/color.html">Color</a></li>
                    <li><a href="${domain}/digital/typography.html">Typography</a></li>
                    <li><a href="${domain}/digital/iconography.html">Iconography</a></li>
                </ul>
            </li>
            <li><span>Components</span>
                <ul>
                    <li><span>Windows and Views</span>
                        <ul>
                            <li><a href="${domain}/digital/alert.html">Alerts</a></li>
                            <li><a href="${domain}/digital/cookie.html">Cookies</a></li>
                            <li><a href="${domain}/digital/dialog.html">Dialogs</a></li>
                            <li><a href="${domain}/digital/drawer.html">Drawer</a></li>
                            <li><a href="${domain}/digital/menu.html">Menu</a></li>
                            <li><a href="${domain}/digital/notification.html">Notification</a></li>
                            <li><a href="${domain}/digital/tab.html">Tabs</a></li>
                            <li><a href="${domain}/digital/tooltip.html">Tooltips</a></li>
                        </ul>
                    </li>
                    <li><span>Controls</span>
                        <ul>
                            <li><a href="${domain}/digital/accordion.html">Accordions</a></li>
                            <li><a href="${domain}/digital/button.html">Buttons</a></li>
                            <li><a href="${domain}/digital/checkbox.html">Checkboxes</a></li>
                            <li><a href="${domain}/digital/pagination.html">Paginations</a></li>
                            <li><a href="${domain}/digital/radio-button.html">Radio Buttons</a></li>
                        </ul>
                    </li>
                    <li><span>Fields and Labels</span>
                        <ul>
                            <li><a href="${domain}/digital/search-field.html">Search Fields</a></li>
                            <li><a href="${domain}/digital/text-field.html">Text Fields</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><span>Patterns</span>
                <ul>
                    <li><a href="${domain}/digital/generator/insider.html">insider 實驗產生器</a></li>
                    <li><a href="${domain}/digital/generator/cwdaily.html">電子報產生器</a></li>
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

function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		return clipboardData.setData("Text", text);
	} else if (
		document.queryCommandSupported &&
		document.queryCommandSupported("copy")
	) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";
		document.body.appendChild(textarea);
		textarea.select();
		try {
      toggleMsg();
			return document.execCommand("copy");
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return false;
		} finally {
			document.body.removeChild(textarea);
		}
  }
}

function toggleMsg() {
  let messageCopied = document.getElementById('messageCopied');
  fadeIn(messageCopied, 30);
  setTimeout(function(){
    fadeOut(messageCopied, 30);
  }, 3000);
}

function hexToRgb(hex) {
  var red   = parseInt(hex[1] + hex[2], 16);
  var green = parseInt(hex[3] + hex[4], 16);
  var blue  = parseInt(hex[5] + hex[6], 16);
  return `${red} ${green} ${blue}`;
}

function colorBoard() {
  let board = document.querySelectorAll('.color-board');
  for (let i = 0; i < board.length; i++) {
    const element = board[i];
    let hex = element.children[1].innerText;
    let rgb = hexToRgb(element.children[1].innerText);
    element.dataset.hex = hex;
    element.dataset.rgb = rgb;
  }
}

function toggleColorBoard() {
  let toggle = document.querySelectorAll('.toggle__color > .item');
  let boards = document.querySelectorAll('.color-board');
  let type = 'hex';
  for (let h = 0; h < toggle.length; h++) {
    const element = toggle[h];
    element.addEventListener('click', (e) => {
      type = e.target.value;
      let self = e.target;
      let siblings = null;
      if ( type === 'hex' ) {
        siblings = e.target.nextElementSibling;
      } else if ( type === 'rgb' ) {
        siblings = e.target.previousElementSibling;
      }
      siblings.classList.remove('active');
      self.classList.add('active');
      let children = e.target.parentElement.parentElement.children;
      for (let i = 0; i < children.length; i++) {
        const element = children[i].children;
        for (let j = 0; j < element.length; j++) {
          const item = element[j];
          if ( item.classList.length > 2 ) {
            element[j].children[1].innerText = element[j].dataset[type]
          }
        }
      }
    });
  }
  for (let g = 0; g < boards.length; g++) {
    const element = boards[g];
    element.addEventListener('click', (e) => {
      if ( e.target.classList.length < 3 ) {
        copyToClipboard(e.target.parentElement.dataset[type]);
      } else {
        copyToClipboard(e.target.dataset[type]);
      }
    });
  }
}

function init() {
  insertChannelLink();
  insertAside();
  naviArrow();
  naviByLink();
  colorBoard();
  toggleColorBoard();
}

init();
window.addEventListener('resize', function() {
  init();
});

document.querySelector('aside').addEventListener('click', function(e) {
  let classArray = [];
  for (let ary = 0; ary < e.target.parentElement.classList.length; ary++) {
    const element = e.target.parentElement.classList[ary];
    classArray.push(element);
  }
  const lv1 = e.target.parentElement.parentElement.parentElement;
  if ( lv1.nodeName.toLowerCase() === 'aside' ) {
    for (let i = 0; i < lv1.children[0].children.length; i++) {
      let lv1element = lv1.children[0].children[i];
      lv1element.classList.remove('opened');
      // 第二層關閉
      if ( lv1element.children[1] ) {
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
  }
  if ( !classArray.includes('opened') ) {
    e.target.parentElement.classList.toggle('opened');
  }
});
