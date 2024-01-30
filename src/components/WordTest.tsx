'use client';

import { Button } from '@mui/material';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';
// const { Configuration, OpenAIApi } = require('openai');

const WordTest = () => {
  // '오늘의 단어' 버튼 클릭 시 API 요청 및 응답 처리
  const handleWordOfTheDay = async () => {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'say hi' }],
      temperature: 0,
      max_tokens: 256,
    });

    console.log('gpt response:', response);
  };

  return (
    <>
      <Button variant="contained" onClick={handleWordOfTheDay}>
        오늘의 단어
      </Button>
    </>
  );
};

export default WordTest;
