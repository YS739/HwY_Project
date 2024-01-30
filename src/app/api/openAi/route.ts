import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  try {

    const requestData = await req.json();
    const { language, userLevel } = requestData;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `이전 단어와 중복되지 않는 ${userLevel} 수준의 ${language} 단어 3개를 '단어[IPA] - 한국어 뜻' 형식으로 알려줘` },
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

