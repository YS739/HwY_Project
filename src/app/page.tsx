import styles from './page.module.css';
import { Button } from '@mui/material';

// TODO:: 전체 코드 작성 후 component 분리
const Home = () => {
  return (
    <main className={styles.main}>
      <div>Language Learning app with GPT</div>
      {/* mui custom test - sx prop 사용 */}
      <Button
        sx={{
          color: 'red',
          backgroundColor: 'skyblue',
        }}
        variant="text"
      >
        Text
      </Button>
      <Button variant="contained">Contained</Button>
    </main>
  );
};
export default Home;
