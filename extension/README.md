# Bold Text Engine - Browser Extension

Transform your text into stunning Unicode styles directly in your browser! Perfect for LinkedIn, social media, and anywhere you want to make your text stand out.

## ✨ Features

- **8 Quick Styles**: Most popular text styles at your fingertips
- **Direct Text Replacement**: Replace selected text instantly
- **Popup Interface**: Clean, modern popup for easy access
- **Context Menu**: Right-click selected text for quick styling
- **LinkedIn Optimized**: Works perfectly on LinkedIn and other social platforms
- **Chrome First**: Optimized for Chrome with Manifest V3

## 🚀 Installation

### For Development (Chrome)

1. **Download/Clone** this extension folder
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

### For Production

The extension will be available on the Chrome Web Store once published.

## 🎯 How to Use

### Method 1: Popup Interface
1. **Select text** on any webpage
2. **Click the extension icon** in your toolbar
3. **Choose a style** from the quick styles
4. **Click "Apply to Selected Text"** to replace it instantly

### Method 2: Context Menu
1. **Select text** on any webpage
2. **Right-click** on the selected text
3. **Choose "Bold Text Engine"** from the context menu
4. **Select your preferred style** from the submenu

### Method 3: Manual Input
1. **Click the extension icon** without selecting text
2. **Type your text** in the input field
3. **Choose a style** and see the preview
4. **Copy to clipboard** or apply to selected text

## 🎨 Available Styles

### Quick Styles (8 most popular)
- **Bold Serif** (𝐇𝐞𝐥𝐥𝐨) - Mathematical bold serif characters
- **Bold Sans** (𝗛𝗲𝗹𝗹𝗼) - Mathematical bold sans-serif characters  
- **Italic Bold Serif** (𝑯𝒆𝒍𝒍𝒐) - Mathematical bold italic serif
- **Italic Bold Sans** (𝙃𝙚𝙡𝙡𝙤) - Mathematical bold italic sans-serif
- **Medieval Bold** (𝕳𝖊𝖑𝖑𝖔) - Mathematical Fraktur bold
- **Double-Struck** (ℍ𝕖𝕝𝕝𝕠) - Mathematical double-struck
- **Script Bold** (𝓗𝓮𝓵𝓵𝓸) - Mathematical bold script
- **Blocks** (🅷🅴🅻🅻🅾) - White characters on black squares

### More Styles
Click "View All Styles →" to access 25+ additional text styles including:
- Circled, Squared, Underlined, Strikethrough
- Small Caps, Upside Down, Superscript, Subscript
- Fullwidth, Regional Indicator, and more!

## 🔧 Technical Details

- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **Permissions**: activeTab, contextMenus, storage
- **Content Scripts**: Injected on all pages for text detection
- **Background Script**: Service worker for context menu and messaging
- **Popup**: Modern UI with real-time preview

## 🌐 Supported Websites

Works on virtually any website, with special optimization for:
- **LinkedIn** (posts, comments, messages)
- **Twitter/X** (tweets, replies)
- **Facebook** (posts, comments)
- **Instagram** (captions, comments)
- **Discord** (messages, status)
- **Slack** (messages, status)
- **WhatsApp Web** (messages)
- **Any text input field** on any website

## 🛠️ Development

### File Structure
```
extension/
├── manifest.json              # Extension configuration
├── popup/
│   ├── popup.html            # Main popup interface
│   ├── popup.css             # Popup styling
│   └── popup.js              # Popup functionality
├── content/
│   └── content.js            # Content script for page interaction
├── background/
│   └── background.js         # Background script
├── utils/
│   ├── textConverters.js     # Text conversion logic
│   ├── unicodeMaps.js        # Unicode character mappings
│   └── textStyles.js         # Style definitions
└── assets/
    └── icons/                # Extension icons
```

### Building
No build process required - the extension runs directly from source files.

### Testing
1. Load the extension in Chrome
2. Test on various websites
3. Verify text replacement works correctly
4. Check context menu functionality

## 📝 License

This project is part of the Bold Text Engine suite. See the main project for license details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Bug Reports

If you encounter any issues:
1. Check the browser console for errors
2. Try refreshing the page
3. Reload the extension
4. Report the issue with details about:
   - Website where it occurred
   - Text you were trying to style
   - Browser version
   - Extension version

## 🔮 Future Features

- [ ] More text styles (25+ total)
- [ ] Custom style creation
- [ ] Keyboard shortcuts
- [ ] Style favorites
- [ ] Bulk text processing
- [ ] Firefox/Edge support
- [ ] Mobile browser support

---

**Made with ❤️ for making your text stand out everywhere!**

