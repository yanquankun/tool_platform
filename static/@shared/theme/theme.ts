let theme = window.localStorage.getItem('theme') || 'light';

const update = (theme: 'light' | 'dark') => {
  theme = theme as 'light' | 'dark';
};

export const styled = {
  text: theme == 'light' ? 'rgb(0,0,0)' : 'red',
};
