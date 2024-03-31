// Listen for user input and send the text to the background script
document.addEventListener('input', function(event) {
    const input = event.target.value;
    chrome.runtime.sendMessage({ input });
  });