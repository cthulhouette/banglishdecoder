import React from 'react';

interface SuggestionBoxProps {
  suggestions: string[];
}

export default function SuggestionBox({ suggestions }: SuggestionBoxProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}