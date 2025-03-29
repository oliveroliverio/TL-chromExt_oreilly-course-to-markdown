document.addEventListener('DOMContentLoaded', function() {
  const extractButton = document.getElementById('extract');
  const statusElement = document.getElementById('status');
  
  extractButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      
      // Reset status
      statusElement.textContent = '';
      statusElement.className = 'status';
      
      // Execute content script
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        files: ['content.js']
      }).then(() => {
        // Show success message
        statusElement.textContent = '✅ Markdown copied!';
        statusElement.classList.add('success');
      }).catch(error => {
        // Show error message
        console.error(error);
        statusElement.textContent = '❌ Copy failed!';
        statusElement.classList.add('error');
      });
    });
  });
});
