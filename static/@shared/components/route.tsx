import { CrownFilled, SmileFilled, GithubOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

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
        path: '/blog/blog',
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
  appList: [
    {
      icon: <UserOutlined style={{ fontSize: 30 }} />,
      title: '个人履历',
      desc: '个人履历，更新较少，可移步个人小程序',
      url: 'http://www.yanquankun.com/myself/index.html',
    },
    {
      icon: 'http://www.yanquankun.com:9300/cdn/MUI-logo.png',
      title: 'Angular Frame',
      desc: '个人开发AngularUI库',
      url: 'http://www.yanquankun.com/ng-mui/#/start',
    },
    {
      icon: <EditOutlined style={{ fontSize: 30 }} />,
      title: 'JS Editor',
      desc: '闲余时间小小JS编辑器',
      url: 'http://www.yanquankun.com/mint_editor/editor.html',
    },
    {
      icon: <GithubOutlined style={{ fontSize: 30 }} />,
      title: 'GitHub',
      desc: '个人github',
      url: 'https://github.com/yanquankun',
    },
  ],
};
