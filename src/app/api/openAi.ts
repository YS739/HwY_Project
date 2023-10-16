import { NextApiRequest, NextApiResponse } from 'next';
const { Configuration, OpenAIApi } = require("openai");
// import { Configuration, OpenAIApi } from 'openai'; 공식 문서에 나온 import 방식을 쓰면 계속 error 발생하여 require 쓰는 위의 import 방식 사용

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY,
      organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION_ID,
    });
    try {
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: '영어 단어 3개 알려줘', //test 문구
      });
      res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
      res.status(500).json({ error: '오류 발생' });
    }
  }
};
