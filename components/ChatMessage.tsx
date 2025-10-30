
import React from 'react';
import { Message } from '../types';

const BotAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        AI
    </div>
);

const UserAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        U
    </div>
);

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <BotAvatar />}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl whitespace-pre-wrap ${
          isUser
            ? 'bg-sky-500 text-white rounded-br-none'
            : 'bg-slate-200 text-slate-800 rounded-bl-none'
        }`}
      >
        {message.content}
      </div>
       {isUser && <UserAvatar />}
    </div>
  );
};

export default ChatMessage;
