import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';

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
        path: '/home/home2',
        name: '管理页',
        icon: <CrownFilled />,
      },
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <ChromeFilled />,
      },
    ],
  },
  location: {
    pathname: 'http://platform.yanquankun.com/',
  },
};
