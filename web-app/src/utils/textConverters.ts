import { unicodeMaps } from './unicodeMaps';

export function convertText(text: string, styleId: string): string {
  const map = unicodeMaps[styleId as keyof typeof unicodeMaps];
  
  if (!map) {
    return text;
  }

  // Handle special cases for certain styles
  if (styleId === 'upside-down') {
    return convertUpsideDown(text);
  }

  if (styleId === 'underlined') {
    return addCombiningCharacter(text, '\u0332'); // Combining Low Line
  }

  if (styleId === 'strikethrough') {
    return addCombiningCharacter(text, '\u0336'); // Combining Long Stroke Overlay
  }

  if (styleId === 'overlined') {
    return addCombiningCharacter(text, '\u0305'); // Combining Overline
  }

  // Standard character mapping conversion
  return text
    .split('')
    .map(char => map[char] || char)
    .join('');
}

function convertUpsideDown(text: string): string {
  const map = unicodeMaps['upside-down'];
  return text
    .split('')
    .map(char => map[char] || char)
    .reverse()
    .join('');
}

function addCombiningCharacter(text: string, combiningChar: string): string {
  return text
    .split('')
    .map(char => {
      // Don't add combining characters to spaces or special characters
      if (char === ' ' || char === '\n' || char === '\t') {
        return char;
      }
      return char + combiningChar;
    })
    .join('');
}

export function getAllConversions(text: string): Record<string, string> {
  const conversions: Record<string, string> = {};
  
  Object.keys(unicodeMaps).forEach(styleId => {
    conversions[styleId] = convertText(text, styleId);
  });

  // Add special styles that use combining characters
  conversions['underlined'] = convertText(text, 'underlined');
  conversions['strikethrough'] = convertText(text, 'strikethrough');
  conversions['overlined'] = convertText(text, 'overlined');

  return conversions;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(result);
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}
