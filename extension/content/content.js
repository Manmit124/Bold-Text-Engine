// Content script for Bold Text Engine Extension

class BoldTextContentScript {
  constructor() {
    this.isActive = false;
    this.selectedText = '';
    this.selectedRange = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMessageListener();
  }

  setupEventListeners() {
    // Listen for text selection
    document.addEventListener('mouseup', (e) => {
      this.handleTextSelection();
    });

    // Listen for keyboard selection
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
          e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        this.handleTextSelection();
      }
    });

    // Listen for clicks to clear selection
    document.addEventListener('click', (e) => {
      if (!e.shiftKey) {
        this.clearSelection();
      }
    });
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'getSelectedText') {
        sendResponse({ text: this.selectedText });
      } else if (request.action === 'applyStyle') {
        this.applyStyle(request.styleId, request.text);
        sendResponse({ success: true });
      } else if (request.action === 'replaceSelectedText') {
        this.replaceSelectedText(request.text);
        sendResponse({ success: true });
      }
    });
  }

  handleTextSelection() {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && text !== this.selectedText) {
      this.selectedText = text;
      this.selectedRange = selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;
      
      // Notify popup about new selection
      chrome.runtime.sendMessage({
        action: 'textSelected',
        text: text
      });
    } else if (!text) {
      this.clearSelection();
    }
  }

  clearSelection() {
    this.selectedText = '';
    this.selectedRange = null;
  }

  applyStyle(styleId, text) {
    if (!text) return;

    const convertedText = convertText(text, styleId);
    this.replaceSelectedText(convertedText);
  }

  replaceSelectedText(newText) {
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(newText));
      
      // Clear selection after replacement
      selection.removeAllRanges();
      
      // Dispatch input event to trigger any listeners
      const inputEvent = new Event('input', { bubbles: true });
      const target = range.commonAncestorContainer.parentElement;
      if (target) {
        target.dispatchEvent(inputEvent);
      }
    }
  }

  // Enhanced method for LinkedIn and other dynamic sites
  replaceTextInInput(newText) {
    const activeElement = document.activeElement;
    
    if (activeElement && (
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.tagName === 'INPUT' ||
      activeElement.contentEditable === 'true'
    )) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      
      if (start !== undefined && end !== undefined) {
        const value = activeElement.value || activeElement.textContent || '';
        const newValue = value.substring(0, start) + newText + value.substring(end);
        
        if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
          activeElement.value = newValue;
        } else {
          activeElement.textContent = newValue;
        }
        
        // Set cursor position after the inserted text
        const newPosition = start + newText.length;
        activeElement.setSelectionRange(newPosition, newPosition);
        
        // Trigger input event
        const inputEvent = new Event('input', { bubbles: true });
        activeElement.dispatchEvent(inputEvent);
      }
    }
  }
}

// Initialize content script
const boldTextContentScript = new BoldTextContentScript();

// Make functions available globally for popup communication
window.boldTextContentScript = boldTextContentScript;
