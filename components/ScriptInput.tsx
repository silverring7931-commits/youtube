import React from 'react';
import { ArrowRight, FileText, Wand2 } from 'lucide-react';

interface ScriptInputProps {
  transcript: string;
  topic: string;
  setTranscript: (val: string) => void;
  setTopic: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({
  transcript,
  topic,
  setTranscript,
  setTopic,
  onGenerate,
  isLoading
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Transcript Input */}
        <div className="flex flex-col space-y-3">
          <label className="flex items-center text-slate-200 font-semibold">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            1. 떡상 영상 대본 (복사/붙여넣기)
          </label>
          <textarea
            className="flex-1 w-full h-64 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none text-sm leading-relaxed placeholder-slate-600 transition-all"
            placeholder="여기에 조회수가 잘 나온 영상의 스크립트를 붙여넣으세요. (인트로, 본론, 결론이 포함된 전체 내용 추천)"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Right: Topic Input & Action */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-3">
            <label className="flex items-center text-slate-200 font-semibold">
              <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
              2. 새로운 주제
            </label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 placeholder-slate-600 transition-all"
              placeholder="예: 다이어트 성공법, 자취 꿀팁, AI로 돈 버는 법..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-400 mb-2">💡 팁</h4>
              <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                <li>대본이 길수록 분석이 정확해집니다.</li>
                <li>특유의 말투나 유행어도 함께 복제됩니다.</li>
                <li>새로운 주제는 구체적일수록 좋습니다.</li>
              </ul>
            </div>

            <button
              onClick={onGenerate}
              disabled={!transcript.trim() || !topic.trim() || isLoading}
              className={`group w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 
                ${(!transcript.trim() || !topic.trim() || isLoading)
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-1'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  분석 및 생성 중...
                </>
              ) : (
                <>
                  대본 생성하기
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptInput;