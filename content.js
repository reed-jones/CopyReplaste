let regex = ''
chrome.storage.sync.get('regex', function (data) {
  regex = data.regex;
});


// let getHeader = _ => document.querySelector('[data-qa=bk-file__header]')
let getHeader = _ => document.querySelector('.diff-container .diff-actions.secondary')
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const convertSelection = _ => {
  let newLines = []
  window.getSelection().toString().split("\n").forEach(l => {
    newLines = [...newLines, l.replace(new RegExp(regex, "i"), ' ')]
  })
  copyToClipboard(newLines.join('\n'))
}
const init = header => {
  document.querySelectorAll('.diff-container .diff-actions.secondary').forEach(header => {
    let d = document.createElement('div')
    d.id = 'rjones-copy'
    d.classList.add('aui-buttons')
    d.innerHTML = `<button class="aui-button aui-button-light">Copy</button >`
    header.insertBefore(d, header.querySelectorAll('.aui-buttons')[3])
    d.addEventListener('click', _ => {
      convertSelection()
    })
  })
}

let ctrlDown = false,
  ctrlKey = 17,
  cmdKey = 91,
  vKey = 86,
  cKey = 67;

document.addEventListener('keydown', e => {
  if (e.keyCode === ctrlKey || e.keyCode === cmdKey) {
    ctrlDown = true;
  }

  if (ctrlDown && e.keyCode === cKey) {
    convertSelection()
    return false;
  }
})

document.addEventListener('keyup', e => {
  if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
    console.log('ctrl up')
    ctrlDown = false;
  }
})

// wont run as 'copy' will get called recursivly
// document.addEventListener('copy', e => {
  // console.log(e)
  // convertSelection()
// })

window.onload = function () {
  let header = getHeader()
  if (header) init(header);
};

let url = location.href;
document.body.addEventListener('click', () => {
  requestAnimationFrame(() => {
    if (url === location.href) {
      return;
    }
    url = location.href;
    let header = getHeader()
    if (header) init(header);
  });
}, true);
