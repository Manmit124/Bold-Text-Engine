// Popup functionality for Bold Text Engine Extension

// Import the text conversion functions
// Note: In extension popup, we need to use a different approach for imports

class BoldTextPopup {
  constructor() {
    this.selectedStyle = null;
    this.inputText = '';
    this.quickStyles = [
      'bold-serif',
      'bold-sans', 
      'italic-bold-serif',
      'italic-bold-sans',
      'medieval-bold',
      'double-struck',
      'script-bold',
      'negative-squared'
    ];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.populateStyles();
    this.checkForSelectedText();
  }

  setupEventListeners() {
    // Text input
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('input', (e) => {
      this.inputText = e.target.value;
      this.updateCharCount();
      this.updatePreview();
      this.updateButtons();
    });

    // Apply button
    document.getElementById('applyBtn').addEventListener('click', () => {
      this.applyToSelectedText();
    });

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', () => {
      this.copyToClipboard();
    });

    // More styles button
    document.getElementById('moreStylesBtn').addEventListener('click', () => {
      this.openWebApp();
    });

    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.openSettings();
    });
  }

  populateStyles() {
    const stylesGrid = document.getElementById('stylesGrid');
    stylesGrid.innerHTML = '';

    this.quickStyles.forEach(styleId => {
      const style = this.getStyleInfo(styleId);
      if (!style) return;

      const button = document.createElement('button');
      button.className = 'style-btn';
      button.dataset.styleId = styleId;
      
      button.innerHTML = `
        <span class="style-name">${style.name}</span>
        <span class="style-preview">${style.example}</span>
      `;

      button.addEventListener('click', () => {
        this.selectStyle(styleId);
      });

      stylesGrid.appendChild(button);
    });
  }

  getStyleInfo(styleId) {
    const styles = {
      'bold-serif': { name: 'Bold Serif', example: '𝐇𝐞𝐥𝐥𝐨' },
      'bold-sans': { name: 'Bold Sans', example: '𝗛𝗲𝗹𝗹𝗼' },
      'italic-bold-serif': { name: 'Italic Bold', example: '𝑯𝒆𝒍𝒍𝒐' },
      'italic-bold-sans': { name: 'Italic Bold Sans', example: '𝙃𝙚𝙡𝙡𝙤' },
      'medieval-bold': { name: 'Medieval Bold', example: '𝕳𝖊𝖑𝖑𝖔' },
      'double-struck': { name: 'Double-Struck', example: 'ℍ𝕖𝕝𝕝𝕠' },
      'script-bold': { name: 'Script Bold', example: '𝓗𝓮𝓵𝓵𝓸' },
      'negative-squared': { name: 'Blocks', example: '🅷🅴🅻🅻🅾' }
    };
    return styles[styleId];
  }

  selectStyle(styleId) {
    // Remove active class from all buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to selected button
    const selectedBtn = document.querySelector(`[data-style-id="${styleId}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('active');
    }

    this.selectedStyle = styleId;
    this.updatePreview();
    this.updateButtons();
  }

  updateCharCount() {
    const charCount = document.getElementById('charCount');
    charCount.textContent = this.inputText.length;
  }

  updatePreview() {
    const previewSection = document.getElementById('previewSection');
    const previewBox = document.getElementById('previewBox');

    if (this.inputText && this.selectedStyle) {
      const convertedText = this.convertText(this.inputText, this.selectedStyle);
      previewBox.textContent = convertedText;
      previewSection.style.display = 'block';
    } else {
      previewSection.style.display = 'none';
    }
  }

  updateButtons() {
    const applyBtn = document.getElementById('applyBtn');
    const copyBtn = document.getElementById('copyBtn');
    
    const hasText = this.inputText.trim().length > 0;
    const hasStyle = this.selectedStyle !== null;

    applyBtn.disabled = !hasText || !hasStyle;
    copyBtn.disabled = !hasText || !hasStyle;
  }

  async checkForSelectedText() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Get selected text from content script
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'getSelectedText' });
      
      if (response && response.text) {
        document.getElementById('textInput').value = response.text;
        this.inputText = response.text;
        this.updateCharCount();
        this.updatePreview();
        this.updateButtons();
      }
    } catch (error) {
      console.log('Could not get selected text:', error);
    }
  }

  async applyToSelectedText() {
    if (!this.inputText || !this.selectedStyle) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const convertedText = this.convertText(this.inputText, this.selectedStyle);

      // Send message to content script to replace text
      await chrome.tabs.sendMessage(tab.id, {
        action: 'replaceSelectedText',
        text: convertedText
      });

      // Show success feedback
      this.showSuccess('Text applied successfully!');
      
      // Close popup after short delay
      setTimeout(() => {
        window.close();
      }, 1000);

    } catch (error) {
      console.error('Error applying text:', error);
      this.showError('Failed to apply text. Please try again.');
    }
  }

  async copyToClipboard() {
    if (!this.inputText || !this.selectedStyle) return;

    try {
      const convertedText = this.convertText(this.inputText, this.selectedStyle);
      await navigator.clipboard.writeText(convertedText);
      this.showSuccess('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying text:', error);
      this.showError('Failed to copy text. Please try again.');
    }
  }

  openWebApp() {
    // Open the main web app in a new tab
    chrome.tabs.create({
      url: 'https://your-web-app-url.com' // Replace with your actual web app URL
    });
  }

  openSettings() {
    // Open extension options page
    chrome.runtime.openOptionsPage();
  }

  // Simplified text conversion function for popup
  convertText(text, styleId) {
    const maps = {
      'bold-serif': {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
        'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
        'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
        'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
        'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
        '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
      },
      'bold-sans': {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
        'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
        'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
        'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
        'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
      },
      'italic-bold-serif': {
        'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
        'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
        'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
        'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
        'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
        'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛'
      },
      'italic-bold-sans': {
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
        'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
        'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
        'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
        'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯'
      },
      'medieval-bold': {
        'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵',
        'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿',
        'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
        'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏',
        'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙',
        'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟'
      },
      'double-struck': {
        'A': 'ℂ', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
        'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
        'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
        'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛',
        'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥',
        'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
        '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
      },
      'script-bold': {
        'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙',
        'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣',
        'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
        'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳',
        'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽',
        'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃'
      },
      'negative-squared': {
        'A': '🅰', 'B': '🅱', 'C': '🅲', 'D': '🅳', 'E': '🅴', 'F': '🅵', 'G': '🅶', 'H': '🅷', 'I': '🅸', 'J': '🅹',
        'K': '🅺', 'L': '🅻', 'M': '🅼', 'N': '🅽', 'O': '🅾', 'P': '🅿', 'Q': '🆀', 'R': '🆁', 'S': '🆂', 'T': '🆃',
        'U': '🆄', 'V': '🆅', 'W': '🆆', 'X': '🆇', 'Y': '🆈', 'Z': '🆉'
      }
    };

    const map = maps[styleId];
    if (!map) return text;

    return text
      .split('')
      .map(char => map[char] || char)
      .join('');
  }

  showSuccess(message) {
    const applyBtn = document.getElementById('applyBtn');
    const originalText = applyBtn.innerHTML;
    
    applyBtn.innerHTML = `<span class="btn-icon">✅</span> ${message}`;
    applyBtn.classList.add('success');
    
    setTimeout(() => {
      applyBtn.innerHTML = originalText;
      applyBtn.classList.remove('success');
    }, 2000);
  }

  showError(message) {
    const applyBtn = document.getElementById('applyBtn');
    const originalText = applyBtn.innerHTML;
    
    applyBtn.innerHTML = `<span class="btn-icon">❌</span> ${message}`;
    applyBtn.classList.add('error');
    
    setTimeout(() => {
      applyBtn.innerHTML = originalText;
      applyBtn.classList.remove('error');
    }, 2000);
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BoldTextPopup();
});