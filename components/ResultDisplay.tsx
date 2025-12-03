import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, BarChart3, Edit3 } from 'lucide-react';

interface ResultDisplayProps {
  script: string;
  analysis: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ script, analysis }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'analysis'>('script');

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 animate-fade-in-up">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('script')}
          className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-colors ${
            activeTab === 'script' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          생성된 대본
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-colors ${
            activeTab === 'analysis' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          분석 리포트
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Header Actions (Only for script) */}
        {activeTab === 'script' && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCopy}
              className="flex items-center bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-slate-600"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 text-green-400" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  대본 복사
                </>
              )}
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 md:p-8 min-h-[400px] max-h-[800px] overflow-y-auto">
          {activeTab === 'script' ? (
             <div className="prose prose-invert prose-slate max-w-none">
                <ReactMarkdown>{script}</ReactMarkdown>
             </div>
          ) : (
            <div className="bg-blue-900/10 rounded-xl p-6 border border-blue-500/20">
               <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                 <SparklesIcon className="w-5 h-5 mr-2" />
                 성공 요인 분석
               </h3>
               <div className="prose prose-invert prose-blue max-w-none text-slate-300">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
               </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-6 text-slate-500 text-sm">
        * AI가 생성한 대본은 참고용으로 사용하고, 본인의 스타일을 더해 완성도를 높이세요.
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

export default ResultDisplay;