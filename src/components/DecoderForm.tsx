import React, { useState } from 'react';
import { ArrowDownUp, HelpCircle } from 'lucide-react';
import { decodeBanglish, getSuggestions } from '../utils/decoder';
import SuggestionBox from './SuggestionBox';

export default function DecoderForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    
    // Get suggestions for the last word
    const words = newInput.split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord.length > 1) {
      setSuggestions(getSuggestions(lastWord));
    } else {
      setSuggestions([]);
    }
  };

  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault();
    const decoded = decodeBanglish(input);
    setOutput(decoded);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleDecode} className="space-y-6">
        <div className="relative">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Banglish Text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Example: tome kamon aso? ame balo asi"
          />
          {suggestions.length > 0 && <SuggestionBox suggestions={suggestions} />}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <ArrowDownUp className="w-5 h-5" />
          Decode
        </button>
      </form>

      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decoded Text
          </label>
          <div className="w-full min-h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg">
            <p className="text-lg font-bengali">{output}</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-gray-600">
        <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Type your Banglish text and see suggestions as you type. The decoder supports
          complex words like "tome" (তুমি), "kamon" (কেমন), and "asan" (আছেন).
        </p>
      </div>
    </div>
  );
}