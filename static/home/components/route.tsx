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
    ],
  },
  location: {
    pathname: 'http://platform.yanquankun.com/',
  },
};
