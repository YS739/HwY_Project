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
} from '@mui/material';

// TODO:: 전체 코드 작성 후 component 분리
const Home = () => {
  const [language, setLanguage] = useState('');
  const [userLevel, setUserLevel] = useState('초급');

  // 학습 언어 선택
  const handleSelectLanguage = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  // 학습 수준 선택
  const handleSelectLevel = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setUserLevel(e.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        border: '1px solid black',
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
            justifyContent: 'space-evenly',
            padding: '20px 0',
          }}
        >
          <p style={{ width: '50%' }}>학습 언어 선택</p>
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
          <p style={{ width: '50%' }}>학습 수준 선택</p>
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
        <Button variant="outlined">오늘의 단어</Button>
        {/* chatroom */}
        <Box sx={{ backgroundColor: 'lavender' }}>
          <div>안내 말풍선</div>
        </Box>
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
  );
};
export default Home;
