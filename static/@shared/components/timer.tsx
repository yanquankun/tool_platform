import { useEffect, useState } from 'react';

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
    setDate(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
  };

  return <span>{date}</span>;
};
