import React from 'react';
import { Languages } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Languages className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Banglish Decoder</h1>
      </div>
    </header>
  );
}