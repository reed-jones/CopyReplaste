let regexInput = document.getElementById('regex-input');
let regexBtn = document.getElementById('save-btn');

regexBtn.addEventListener('click', function () {
  chrome.storage.sync.set({ regex: regexInput.value }, function () {
    console.log('regex is ' + regexInput.value);
  })
});

chrome.storage.sync.get('regex', function (data) {
  regexInput.value = data.regex
});