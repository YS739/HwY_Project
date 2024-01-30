
// api 응답은 아주 잘 받아와지나 'res.status is not a function'라는 error 발생 코드
// import { NextApiRequest, NextApiResponse } from 'next';

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     console.log(">>callGPT");

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY}`,
//             },
//             body: JSON.stringify({
//                 model: "gpt-3.5-turbo",
//                 messages: [
//                     { role: "user", content: "초급 사용자를 위한 영어 단어 3개 알려줘" },
//                 ],
//                 temperature: 1,
//                 max_tokens: 100,
//             }),
//         });

//         const responseData = await response.json();
//         console.log(responseData.choices[0].message.content);

//         res.status(200).json({ message: 'API Test Success', responseData });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };


// 최종 정상 작동하는 코드!!!!!!
// 위의 코드에서 app router 버전에 맞게 코드 수정(import, 함수 이름 등)
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "이전 단어와 중복되지 않는 고급 수준의 영어 단어 3개를 '단어[발음기호] - 한국어 뜻' 형식으로 알려줘" },
        ],
        temperature: 1,
        max_tokens: 200,
      }),
    });

    const responseData = await response.json();
    const wordsData = responseData.choices[0].message.content

    return NextResponse.json({ message: wordsData });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
};

