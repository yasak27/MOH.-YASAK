
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';
import { initialBotMessage, SYSTEM_INSTRUCTION } from './constants';
import { geminiService } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = geminiService.createChatSession(SYSTEM_INSTRUCTION);
    } catch (e) {
      console.error(e);
      setError('Gagal memulai sesi chat. Pastikan API Key sudah benar.');
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error("Sesi chat belum diinisialisasi.");
      }
      const botResponse = await geminiService.sendMessage(chatRef.current, userInput);
      const botMessage: Message = { role: 'model', content: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Terjadi kesalahan tidak diketahui.';
      console.error(errorMessage);
      setError(`Maaf, terjadi masalah saat menghubungi AI. Coba lagi nanti. (${errorMessage})`);
      const errorBotMessage: Message = { role: 'model', content: `Maaf, aku sedang mengalami gangguan. Mohon coba beberapa saat lagi ya.` };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white shadow-2xl">
      <Header />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && <div className="text-center text-red-500 text-sm p-2">{error}</div>}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
