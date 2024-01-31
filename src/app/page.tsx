'use client';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [language, setLanguage] = useState('');
  const [userLevel, setUserLevel] = useState('초급');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [words, serWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 로딩중 표시
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 학습 언어 선택
  const handleSelectLanguage = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setLanguage(e.target.value);
    setIsLanguageSelected(true);
  };

  // 학습 수준 선택
  const handleSelectLevel = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setUserLevel(e.target.value);
  };

  // '오늘의 단어' 버튼 클릭 시 API 요청
  const handleWordOfTheDay = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/openAi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          userLevel: userLevel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response status:', response.status);
        serWords((prevResponses) => [...prevResponses, data.message]);
      } else {
        console.log('API 요청 실패. 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          padding: '0',
          textAlign: 'center',
        }}
      >
        {/* header */}
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="header">
              Language Learning with GPT
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Box => header 제외한 body에 해당하는 부분 */}
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            padding: '0 20px',
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          {/* Language select */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '20px 0',
            }}
          >
            <p style={{ width: '50%' }}>학습 언어</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Language"
                onChange={handleSelectLanguage}
                // FIXME:border color custom 필요
                sx={{
                  '&:focus': {
                    borderColor: 'lavender',
                  },
                }}
              >
                <MenuItem value="영어">영어</MenuItem>
                <MenuItem value="스페인어">스페인어</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Level select */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              padding: '20px 0',
            }}
          >
            <p style={{ width: '50%' }}>학습 수준</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">UserLevel</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userLevel}
                label="UserLevel"
                onChange={handleSelectLevel}
                // FIXME:border color custom 필요
                sx={{
                  '&:focus': {
                    borderColor: 'lavender',
                  },
                }}
              >
                <MenuItem value="초급">초급</MenuItem>
                <MenuItem value="중급">중급</MenuItem>
                <MenuItem value="고급">고급</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* '오늘의 단어' 버튼 */}
          <Button
            variant="contained"
            disabled={!isLanguageSelected || loading}
            onClick={handleWordOfTheDay}
            sx={{ margin: '10px 0' }}
          >
            오늘의 단어
          </Button>

          {/* 학습 언어 선택 경고 */}
          {isLanguageSelected ? null : (
            <Alert
              variant="outlined"
              severity="warning"
              sx={{
                width: '100%',
                height: '50px',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              학습할 언어를 선택해주세요.
            </Alert>
          )}

          {/* chatroom */}
          <Paper
            elevation={5}
            sx={{
              minHeight: '200px',
              maxHeight: '250px',
              backgroundColor: 'lightBlue',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              margin: '20px 0',
            }}
          >
            {/* ChatGPT 응답 출력 */}
            {loading && words.length === 0 ? (
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
                sx={{ margin: '20px 0' }}
              />
            ) : (
              words.map((word, index) => (
                <div key={index}>
                  {/* FIXME: 마지막 응답 말풍선에 로딩 표시가 생김 */}
                  {loading && index === words.length - 1 ? (
                    <LinearProgress
                      variant="buffer"
                      value={progress}
                      valueBuffer={buffer}
                      sx={{ margin: '20px 0' }}
                    />
                  ) : (
                    <Chip
                      sx={{
                        height: 'auto',
                        margin: '10px',
                        padding: '3px',
                        fontSize: '14px',
                        backgroundColor: 'lightskyblue',
                        '& .MuiChip-label': {
                          display: 'block',
                          whiteSpace: 'normal',
                        },
                      }}
                      label={word}
                    />
                  )}
                </div>
              ))
            )}
          </Paper>

          {/* 언어 번역 input form */}
          {/* <Box
            // TODO: 속성 수정 필요
            component="form"
            sx={{ display: 'flex', '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" variant="standard" />
            <Button>확인</Button>
          </Box> */}
        </Box>
      </Container>
    </>
  );
};
export default Home;
