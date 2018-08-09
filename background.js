chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ regex: '^[\-\+]' }, function () {
    console.log("Regex is set.");
  });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: { hostEquals: 'bitbucket.org' },
  //     })
  //     ],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});