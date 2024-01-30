'use client';
import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Container,
  Box,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Alert,
  Paper,
  Chip,
} from '@mui/material';

const Home = () => {
  const [language, setLanguage] = useState('');
  const [userLevel, setUserLevel] = useState('초급');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [words, serWords] = useState('');

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
      const response = await fetch('/api/openAi', { method: 'POST' });

      if (response.ok) {
        const data = await response.json();
        console.log('Response status:', response.status);
        serWords(data.message);
      } else {
        console.log('API 요청 실패. 상태 코드:', response.status);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          padding: '0',
          height: '100vh',
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
        <Box sx={{ bgcolor: '#cfe8fc', padding: '0 20px' }}>
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
            disabled={!isLanguageSelected}
            onClick={handleWordOfTheDay}
          >
            오늘의 단어
          </Button>
          {/* 학습 언어 선택 경고 */}
          {isLanguageSelected ? null : (
            <Alert
              variant="outlined"
              severity="warning"
              sx={{ width: '50%', height: '50px', border: 'none' }}
            >
              학습할 언어를 선택해주세요.
            </Alert>
          )}

          {/* chatroom */}
          <Paper
            elevation={5}
            sx={{
              minHeight: '180px',
              backgroundColor: 'lightBlue',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 말풍선 */}
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
              label="학습 언어를 선택 후 '오늘의 단어'를 눌러보세요."
            />

            {/* ChatGPT 응답 출력 */}
            {words ? (
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
                label={words}
              />
            ) : null}
          </Paper>

          {/* input form */}
          <Box
            // TODO: 속성 수정 필요
            component="form"
            sx={{ display: 'flex', '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" variant="standard" />
            <Button>확인</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Home;
