import React from 'react';
import { Sparkles, Youtube } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center space-x-2 mb-2">
        <Youtube className="w-8 h-8 text-red-500 fill-current" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          ViralScript AI
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        떡상 대본의 <span className="text-red-500">DNA</span>를 복제하세요
      </h1>
      <p className="text-slate-400 max-w-2xl text-lg">
        조회수 폭발한 영상의 대본을 넣으세요. <br className="hidden md:inline" />
        Gemini가 그 성공 공식을 분석해 당신의 주제로 재탄생시킵니다.
      </p>
    </header>
  );
};

export default Header;