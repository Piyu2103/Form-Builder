import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import FormBuilder from './components/FormBuilder';
import FormRenderer from './components/FormRenderer';

function App() {
  const [mode, setMode] = useState<'builder' | 'renderer'>('builder');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode('builder')}
            className={`px-4 py-2 rounded ${
              mode === 'builder'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            }`}
          >
            Form Builder
          </button>
          <button
            onClick={() => setMode('renderer')}
            className={`px-4 py-2 rounded ${
              mode === 'renderer'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            }`}
          >
            Form Preview
          </button>
        </div>
        {mode === 'builder' ? <FormBuilder /> : <FormRenderer />}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;