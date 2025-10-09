// Background script for Bold Text Engine Extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Bold Text Engine Extension installed');
  
  // Set up context menu
  chrome.contextMenus.create({
    id: 'boldTextMenu',
    title: 'Bold Text Engine',
    contexts: ['selection']
  });

  // Add quick style options to context menu
  const quickStyles = [
    { id: 'bold-serif', title: 'Bold Serif (𝐇𝐞𝐥𝐥𝐨)' },
    { id: 'bold-sans', title: 'Bold Sans (𝗛𝗲𝗹𝗹𝗼)' },
    { id: 'italic-bold-serif', title: 'Italic Bold (𝑯𝒆𝒍𝒍𝒐)' },
    { id: 'medieval-bold', title: 'Medieval Bold (𝕳𝖊𝖑𝖑𝖔)' },
    { id: 'double-struck', title: 'Double-Struck (ℍ𝕖𝕝𝕝𝕠)' }
  ];

  quickStyles.forEach(style => {
    chrome.contextMenus.create({
      id: `style_${style.id}`,
      parentId: 'boldTextMenu',
      title: style.title,
      contexts: ['selection']
    });
  });

  // Add "More Styles" option
  chrome.contextMenus.create({
    id: 'moreStyles',
    parentId: 'boldTextMenu',
    title: 'More Styles...',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('style_')) {
    const styleId = info.menuItemId.replace('style_', '');
    applyStyleToSelection(tab.id, styleId);
  } else if (info.menuItemId === 'moreStyles') {
    // Open popup or web app
    chrome.action.openPopup();
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'textSelected') {
    // Store the selected text for popup access
    chrome.storage.local.set({ selectedText: request.text });
  }
});

// Apply style to selected text
async function applyStyleToSelection(tabId, styleId) {
  try {
    // Get the selected text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        return window.getSelection().toString();
      }
    });

    const selectedText = results[0]?.result;
    if (!selectedText) return;

    // Convert the text
    const convertedText = convertText(selectedText, styleId);

    // Replace the selected text
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: (text) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
          selection.removeAllRanges();
        }
      },
      args: [convertedText]
    });

  } catch (error) {
    console.error('Error applying style:', error);
  }
}

// Simple text conversion function (basic version for background script)
function convertText(text, styleId) {
  // This is a simplified version - the full conversion logic is in the content script
  // For now, just return the text with a prefix to indicate it was processed
  return `[${styleId}] ${text}`;
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup automatically due to manifest configuration
});


