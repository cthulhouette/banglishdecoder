import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

interface ContributionFormProps {
  onSubmit: (banglish: string, bangla: string) => void;
}

export default function ContributionForm({ onSubmit }: ContributionFormProps) {
  const [banglish, setBanglish] = useState('');
  const [bangla, setBangla] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(banglish, bangla);
    setIsSubmitted(true);
    setTimeout(() => {
      setBanglish('');
      setBangla('');
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Contribute a Word</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="banglish" className="block text-sm font-medium text-gray-700">
            Banglish Word
          </label>
          <input
            type="text"
            id="banglish"
            value={banglish}
            onChange={(e) => setBanglish(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="bangla" className="block text-sm font-medium text-gray-700">
            Bengali Translation
          </label>
          <input
            type="text"
            id="bangla"
            value={bangla}
            onChange={(e) => setBangla(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 font-bengali"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
            isSubmitted
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white`}
          disabled={isSubmitted}
        >
          {isSubmitted ? (
            <>
              <Check className="w-5 h-5" />
              Submitted!
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Word
            </>
          )}
        </button>
      </form>
    </div>
  );
}