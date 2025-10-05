'use client';

import { useState, useEffect } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextInput({ value, onChange, placeholder = "Enter your text here..." }: TextInputProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Input Text</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{charCount} characters</span>
          {value && (
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        maxLength={500}
      />
      
      <div className="mt-2 text-xs text-gray-500">
        Maximum 500 characters
      </div>
    </div>
  );
}
