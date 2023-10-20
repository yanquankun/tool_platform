import { CrownFilled, SmileFilled, GithubOutlined } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/home/home',
        name: '个人主页',
        icon: <SmileFilled />,
      },
      {
        path: '/home/blog',
        name: '博客',
        icon: <CrownFilled />,
      },
      {
        path: '',
        name: '工具集合',
        icon: <CrownFilled />,
      },
      { path: 'https://github.com/yanquankun', name: 'GitHub', icon: <GithubOutlined />, target: 'blank' },
    ],
  },
  location: {
    pathname: 'http://platform.yanquankun.com/',
  },
};
