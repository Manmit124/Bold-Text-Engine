'use client';

import { useState, useCallback } from 'react';
import { textStyles } from '@/data/textStyles';
import { convertText } from '@/utils/textConverters';

export default function TextGenerator() {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMoreStyles, setShowMoreStyles] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);

  const copyToClipboard = async (text: string, styleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(styleId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Get the main bold styles first
  const mainStyles = textStyles.filter(style => 
    style.id === 'bold-serif' || 
    style.id === 'bold-sans' || 
    style.id === 'italic-bold-serif' || 
    style.id === 'italic-bold-sans' ||
    style.id === 'medieval-bold'
  );

  // Get additional popular styles
  const additionalStyles = textStyles.filter(style => 
    style.id === 'double-struck' ||
    style.id === 'negative-squared'
  );

  // Get all remaining styles for "more fonts" section
  const moreStyles = textStyles.filter(style => 
    !mainStyles.some(main => main.id === style.id) &&
    !additionalStyles.some(additional => additional.id === style.id)
  );

  const StyleCard = ({ style, isHighlighted = false }: { style: typeof textStyles[0], isHighlighted?: boolean }) => {
    const convertedText = inputText ? convertText(inputText, style.id) : '';
    const isCopied = copiedId === style.id;
    
    return (
      <div className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 ${isHighlighted ? 'ring-2 ring-purple-500/30' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
              {style.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{style.description}</p>
          </div>
          {convertedText && (
            <button
              onClick={() => copyToClipboard(convertedText, style.id)}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                isCopied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-500/30'
              }`}
            >
              {isCopied ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </span>
              )}
            </button>
          )}
        </div>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 min-h-[70px] flex items-center border border-gray-800/50">
          <p className="text-lg break-all select-all text-white font-medium leading-relaxed">
            {convertedText || (
              <span className="text-gray-500 italic text-base">
                {inputText ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                    Converting...
                  </span>
                ) : 'Enter text to see conversion'}
              </span>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            Bold Text Engine
          </h1>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto w-32"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your text into stunning Unicode styles. Perfect for social media, 
              usernames, and making your content stand out everywhere! ✨
          </p>
        </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Input Section */}
            <div className="xl:col-span-2 space-y-6">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Enter Your Text</h2>
                  </div>
                  
                  <textarea
            value={inputText}
            onChange={handleInputChange}
                    placeholder="Type something amazing here..."
                    className="w-full h-80 p-4 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-lg leading-relaxed transition-all duration-200"
                    maxLength={500}
                  />
                  
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Real-time conversion
                    </span>
                    <span>{inputText.length}/500 characters</span>
        </div>
        </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="xl:col-span-3 space-y-6">
              {/* Popular Styles */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Popular Styles</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {mainStyles.map(style => (
                    <StyleCard key={style.id} style={style} isHighlighted={true} />
                  ))}
                  {additionalStyles.map(style => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              </div>

              {/* More Styles Section */}
              <div>
                <div className="text-center py-8">
                  <button
                    onClick={() => setShowMoreStyles(!showMoreStyles)}
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="text-lg font-medium">
                      {showMoreStyles ? 'Hide' : 'Show'} More Text Fonts
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${showMoreStyles ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {showMoreStyles && (
                  <div className="animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-white">All Text Styles</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {moreStyles.map(style => (
                        <StyleCard key={style.id} style={style} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>

        {/* Footer */}
          <div className="text-center mt-20 py-8 border-t border-gray-800/50">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <span>Made with</span>
              <svg className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>using Unicode characters</span>
            </div>
            <p className="text-sm text-gray-500">
              Works on social media, messaging apps, and anywhere Unicode is supported ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
