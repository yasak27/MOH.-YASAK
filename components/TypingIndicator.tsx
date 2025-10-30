
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 justify-start">
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AI
        </div>
        <div className="px-4 py-3 rounded-2xl bg-slate-200 rounded-bl-none flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
    </div>
  );
};

export default TypingIndicator;
