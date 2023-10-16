import { Button } from '@mui/material';

const WordTest = () => {
  // '오늘의 단어' 버튼 클릭 시 API 요청 및 응답 처리
  const handleWordOfTheDay = async () => {
    try {
      // API 엔드포인트 URL
      const apiUrl = '/api/openAi';
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('오늘의 단어:', data.result);
      } else {
        console.error('API 요청 오류:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
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
