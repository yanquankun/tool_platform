import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const DateComp = function () {
  const [date, setDate] = useState<string>(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let timer: any = null;

  useEffect(() => {
    timer = setInterval(() => {
      setTimeDate();
    }, 1000);

    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  const setTimeDate = function () {
    setDate(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  };

  return <span style={{ display: 'flex', width: '170px' }}>{date}</span>;
};
