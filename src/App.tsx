import React, { useState } from 'react';
import Header from './components/Header';
import DecoderForm from './components/DecoderForm';
import ContributionForm from './components/ContributionForm';
import { WebScraper } from './services/webScraper';

function App() {
  const [contributions, setContributions] = useState<Array<{ banglish: string; bangla: string }>>([]);

  const handleContribution = (banglish: string, bangla: string) => {
    setContributions(prev => [...prev, { banglish, bangla }]);
    // In a real app, this would be sent to a backend API
    console.log('New contribution:', { banglish, bangla });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-6">
            Enter your Banglish text (Bengali written with English alphabet) below and we'll help you decode it into proper Bengali text.
          </p>
          
          <DecoderForm />
        </div>

        <ContributionForm onSubmit={handleContribution} />

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Type or paste your Banglish text in the input box</li>
            <li>Click the "Decode" button to convert it to Bengali</li>
            <li>The converted text will appear in the output box below</li>
            <li>Can't find a word? Contribute it using the form below!</li>
          </ul>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>@cthulhouette</p>
          <p>2024</p>
          <p className="mt-2 text-sm">
            Community contributions: {contributions.length} words and growing!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;