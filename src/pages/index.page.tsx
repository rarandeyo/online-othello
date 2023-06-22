import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { Line } from 'src/components/line';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';
const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  const clickLine = async (x: number, y: number) => {
    await apiClient.board.$post({
      body: { x, y },
    });
    await fetchBoard();
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.square}>
          {board.map((raw, y) =>
            raw.map((color, x) => (
              <Line key={`${x}-${y}`} x={x} y={y} color={color} onClick={() => clickLine(x, y)} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
