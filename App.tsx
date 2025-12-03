import React, { useState } from 'react';
import Header from './components/Header';
import ScriptInput from './components/ScriptInput';
import ResultDisplay from './components/ResultDisplay';
import { generateViralScript } from './services/geminiService';
import { ScriptData, GenerationState } from './types';

const App: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [topic, setTopic] = useState('');
  
  const [scriptData, setScriptData] = useState<ScriptData | null>(null);
  const [genState, setGenState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    step: 'idle'
  });

  const handleGenerate = async () => {
    if (!transcript.trim() || !topic.trim()) return;

    setGenState({ isLoading: true, error: null, step: 'analyzing' });
    setScriptData(null);

    try {
      const { script, analysis } = await generateViralScript(transcript, topic);
      
      setScriptData({
        originalTranscript: transcript,
        targetTopic: topic,
        generatedScript: script,
        analysis: analysis
      });
      
      setGenState({ isLoading: false, error: null, step: 'complete' });

      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setGenState({ 
        isLoading: false, 
        error: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.", 
        step: 'idle' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] text-slate-200 selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-20 max-w-5xl">
        <Header />
        
        <main className="flex flex-col gap-8">
          <ScriptInput 
            transcript={transcript}
            topic={topic}
            setTranscript={setTranscript}
            setTopic={setTopic}
            onGenerate={handleGenerate}
            isLoading={genState.isLoading}
          />

          {genState.error && (
            <div className="w-full max-w-4xl mx-auto bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center">
              <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {genState.error}
            </div>
          )}

          {scriptData && !genState.isLoading && (
            <ResultDisplay 
              script={scriptData.generatedScript}
              analysis={scriptData.analysis}
            />
          )}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center py-6 text-slate-600 text-sm relative z-10">
        <p>Powered by Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;