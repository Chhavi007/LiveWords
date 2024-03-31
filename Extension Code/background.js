// Background script (background.js)

// Listen for a message from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'activateExtension') {
      // Perform any necessary activation logic here
      console.log('Extension activated!');
      // Optionally, display a popup or overlay to indicate activation
      // For example:
      // chrome.browserAction.setBadgeText({ text: 'ON' });
    }
  });
  
  // Automatically activate the extension when the browser starts
  chrome.runtime.onStartup.addListener(function() {
    // Perform auto-activation logic here
    // For example, you can simulate a context menu click or directly activate the extension
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, { action: 'activateExtension' });
    // });
  });
  
  // Context menu item to activate the extension
  chrome.contextMenus.create({
    id: 'activateExtension',
    title: 'Activate Extension',
    contexts: ['page'],
  })
  
  // Handle context menu item click
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'activateExtension') {
      // Send a message to the content script to activate the extension
      chrome.tabs.sendMessage(tab.id, { action: 'activateExtension' });
    }
  });
  