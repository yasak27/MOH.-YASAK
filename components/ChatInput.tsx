
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="p-4 bg-slate-50 border-t border-slate-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tulis pesanmu di sini..."
          disabled={isLoading}
          className="flex-1 p-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 disabled:bg-slate-100"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-sky-600 text-white p-3 rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-sky-300 disabled:cursor-not-allowed transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
