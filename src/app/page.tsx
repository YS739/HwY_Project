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
} from '@mui/material';

// TODO:: 전체 코드 작성 후 component 분리
const Home = () => {
  const [language, setLanguage] = useState('');
  const [userLevel, setUserLevel] = useState('초급');

  // 언어 선택
  const handleSelectLanguage = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

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
      <Box sx={{ bgcolor: '#cfe8fc' }}>
        <header>Language Learning with GPT</header>

        {/* Language select */}
        <div style={{ display: 'flex' }}>
          <div>언어 선택</div>
          <FormControl fullWidth sx={{ width: '50%' }}>
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
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Level select */}
        <div style={{ display: 'flex' }}>
          <div>학습 수준 선택</div>
          <FormControl fullWidth sx={{ width: '50%' }}>
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
