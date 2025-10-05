export interface TextStyle {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
}

export const textStyles: TextStyle[] = [
  // Bold Variations
  {
    id: 'bold-serif',
    name: 'Bold (serif)',
    category: 'Bold & Italic',
    description: 'Mathematical bold serif characters',
    example: '𝐇𝐞𝐥𝐥𝐨'
  },
  {
    id: 'bold-sans',
    name: 'Bold (sans)',
    category: 'Bold & Italic',
    description: 'Mathematical bold sans-serif characters',
    example: '𝗛𝗲𝗹𝗹𝗼'
  },
  {
    id: 'italic-bold-serif',
    name: 'Italic Bold (serif)',
    category: 'Bold & Italic',
    description: 'Mathematical bold italic serif characters',
    example: '𝑯𝒆𝒍𝒍𝒐'
  },
  {
    id: 'italic-bold-sans',
    name: 'Italic Bold (sans)',
    category: 'Bold & Italic',
    description: 'Mathematical bold italic sans-serif characters',
    example: '𝙃𝙚𝙡𝙡𝙤'
  },
  {
    id: 'italic-serif',
    name: 'Italic (serif)',
    category: 'Bold & Italic',
    description: 'Mathematical italic serif characters',
    example: '𝐻𝑒𝓁𝓁𝑜'
  },
  {
    id: 'italic-sans',
    name: 'Italic (sans)',
    category: 'Bold & Italic',
    description: 'Mathematical italic sans-serif characters',
    example: '𝘏𝘦𝘭𝘭𝘰'
  },

  // Special Unicode Styles
  {
    id: 'medieval-bold',
    name: 'Medieval Bold',
    category: 'Special Unicode',
    description: 'Mathematical Fraktur bold characters',
    example: '𝕳𝖊𝖑𝖑𝖔'
  },
  {
    id: 'double-struck',
    name: 'Double-Struck',
    category: 'Special Unicode',
    description: 'Mathematical double-struck characters',
    example: 'ℍ𝕖𝕝𝕝𝕠'
  },
  {
    id: 'script',
    name: 'Script',
    category: 'Special Unicode',
    description: 'Mathematical script characters',
    example: '𝓗𝓮𝓵𝓵𝓸'
  },
  {
    id: 'script-bold',
    name: 'Script Bold',
    category: 'Special Unicode',
    description: 'Mathematical bold script characters',
    example: '𝓗𝓮𝓵𝓵𝓸'
  },
  {
    id: 'fraktur',
    name: 'Fraktur',
    category: 'Special Unicode',
    description: 'Mathematical Fraktur characters',
    example: 'ℌ𝔢𝔩𝔩𝔬'
  },
  {
    id: 'monospace',
    name: 'Monospace',
    category: 'Special Unicode',
    description: 'Mathematical monospace characters',
    example: '𝙷𝚎𝚕𝚕𝚘'
  },

  // Decorative Styles
  {
    id: 'circled',
    name: 'Circled',
    category: 'Decorative',
    description: 'Characters enclosed in circles',
    example: 'Ⓗⓔⓛⓛⓞ'
  },
  {
    id: 'squared',
    name: 'Squared',
    category: 'Decorative',
    description: 'Characters in square blocks',
    example: '🄷🄴🄻🄻🄾'
  },
  {
    id: 'negative-squared',
    name: 'Blocks',
    category: 'Decorative',
    description: 'White characters on black squares',
    example: '🅷🅴🅻🅻🅾'
  },
  {
    id: 'underlined',
    name: 'Underlined',
    category: 'Decorative',
    description: 'Characters with underline',
    example: 'H̲e̲l̲l̲o̲'
  },
  {
    id: 'strikethrough',
    name: 'Strikethrough',
    category: 'Decorative',
    description: 'Characters with strikethrough',
    example: 'H̶e̶l̶l̶o̶'
  },
  {
    id: 'overlined',
    name: 'Overlined',
    category: 'Decorative',
    description: 'Characters with overline',
    example: 'H̅e̅l̅l̅o̅'
  },

  // Fun & Creative
  {
    id: 'small-caps',
    name: 'Small Caps',
    category: 'Fun & Creative',
    description: 'Small capital letters',
    example: 'ʜᴇʟʟᴏ'
  },
  {
    id: 'upside-down',
    name: 'Upside Down',
    category: 'Fun & Creative',
    description: 'Flipped text',
    example: 'ollǝH'
  },
  {
    id: 'superscript',
    name: 'Superscript',
    category: 'Fun & Creative',
    description: 'Raised characters',
    example: 'ᴴᵉˡˡᵒ'
  },
  {
    id: 'subscript',
    name: 'Subscript',
    category: 'Fun & Creative',
    description: 'Lowered characters',
    example: 'ₕₑₗₗₒ'
  },
  {
    id: 'fullwidth',
    name: 'Fullwidth',
    category: 'Fun & Creative',
    description: 'Wide characters',
    example: 'Ｈｅｌｌｏ'
  },
  {
    id: 'regional-indicator',
    name: 'Regional Indicator',
    category: 'Fun & Creative',
    description: 'Flag-style letters',
    example: '🇭🇪🇱🇱🇴'
  },

  // Mathematical
  {
    id: 'sans-serif',
    name: 'Sans-serif',
    category: 'Mathematical',
    description: 'Mathematical sans-serif characters',
    example: '𝖧𝖾𝗅𝗅𝗈'
  },
  {
    id: 'sans-serif-bold',
    name: 'Sans-serif Bold',
    category: 'Mathematical',
    description: 'Mathematical bold sans-serif characters',
    example: '𝗛𝗲𝗹𝗹𝗼'
  },
  {
    id: 'sans-serif-italic',
    name: 'Sans-serif Italic',
    category: 'Mathematical',
    description: 'Mathematical italic sans-serif characters',
    example: '𝘏𝘦𝘭𝘭𝘰'
  },
  {
    id: 'sans-serif-bold-italic',
    name: 'Sans-serif Bold Italic',
    category: 'Mathematical',
    description: 'Mathematical bold italic sans-serif characters',
    example: '𝙃𝙚𝙡𝙡𝙤'
  }
];

export const styleCategories = [
  'Bold & Italic',
  'Special Unicode',
  'Decorative',
  'Fun & Creative',
  'Mathematical'
];
