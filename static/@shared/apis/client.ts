import request from '@shared/utils/fetch';

const getClientIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');

    const data = await response.json();

    return data.ip;
  } catch (error) {
    return 'IP_UNKNOWN';
  }
};

export { getClientIP };
