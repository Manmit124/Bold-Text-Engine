'use client';

import { TextStyle } from '@/types';
import CopyButton from './CopyButton';

interface StyleOutputProps {
  style: TextStyle;
  convertedText: string;
  originalText: string;
}

export default function StyleOutput({ style, convertedText, originalText }: StyleOutputProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-medium text-gray-900 text-sm">{style.name}</h3>
          <p className="text-xs text-gray-500">{style.description}</p>
        </div>
        <CopyButton text={convertedText} />
      </div>
      
      <div className="bg-gray-50 rounded-md p-3 min-h-[60px] flex items-center">
        <p className="text-lg font-mono break-all select-all" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {convertedText || (
            <span className="text-gray-400 italic">
              {originalText ? 'Converting...' : 'Enter text to see conversion'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
