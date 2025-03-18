import request from '@shared/utils/fetch';

const getClientIP = async () => {
  try {
    const response = await fetch('https://ipinfo.io/json');

    const data = await response.json();

    return data.ip;
  } catch (error) {
    return 'IP_UNKNOWN';
  }
};

export { getClientIP };
