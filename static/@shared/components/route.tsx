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
      {
        path: 'https://github.com/yanquankun?tab=repositories',
        name: 'GitHub',
        icon: <GithubOutlined />,
        target: 'blank',
      },
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
      target: '_blank',
    },
    {
      icon: 'https://www.yanquankun.com:9300/cdn/MUI-logo.png',
      title: 'Angular Frame',
      desc: '个人开发AngularUI库',
      url: 'http://www.yanquankun.com/ng-mui/#/start',
      target: '_blank',
    },
    {
      icon: <EditOutlined style={{ fontSize: 30 }} />,
      title: 'JS Editor',
      desc: '闲余时间小小JS编辑器',
      url: 'http://www.yanquankun.com/mint_editor/editor.html',
      target: '_blank',
    },
    {
      icon: <GithubOutlined style={{ fontSize: 30 }} />,
      title: 'GitHub',
      desc: '个人github',
      url: 'https://github.com/yanquankun?tab=repositories',
      target: '_blank',
    },
    {
      icon: 'https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
      title: 'Npm',
      desc: 'Npm Package',
      url: 'https://www.npmjs.com/~yanquankun',
      target: '_blank',
    },
  ],
};
