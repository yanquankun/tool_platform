import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { Fragment, useEffect, useState } from 'react';
import { Switch, Empty, Button, Popover, Image, Tag, FloatButton, Drawer, Modal, Divider, Space, Timeline } from 'antd';
import {
  WechatOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  SplitCellsOutlined,
  ClockCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import routes from './route';
import { FC } from 'react';
import { DateComp } from '~shared/components/timer';
import { Document, Page, pdfjs } from 'react-pdf';
import MarqueeText from '~shared/components/marquee';
import { getStaticConfig } from '~shared/apis/static';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
interface IContainerProps {
  children?: React.ReactNode;
}
type themeType = 'default' | 'eyeHelathy';
const Container: FC<IContainerProps> = (props: IContainerProps) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<themeType>('default');
  const [tip, setTip] = useState<string>('');

  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: true,
    navTheme: 'light',
  };

  const currentPathName = location.pathname;
  const [pathname, setPathname] = useState(currentPathName || '/home/home');

  const changeTheme = (checked: boolean) => {
    if (checked) setTheme('eyeHelathy');
    else setTheme('default');
    localStorage.setItem('theme', checked ? 'eyeHelathy' : 'default');
    const body = document.body;
    body.style.filter = checked ? 'invert(1)' : 'none';
  };

  useEffect(function () {
    (async function () {
      const res = await getStaticConfig();
      if (res.code == 200) {
        const tip = res.data.tip || '';
        setTip(tip);
      }
    })();
  }, []);

  useEffect(() => {
    const themeCache = (localStorage.getItem('theme') || 'default') as themeType;
    setTheme(themeCache);
    const body = document.body;
    body.style.filter = themeCache == 'default' ? 'none' : 'invert(1)';
  }, []);

  const creatQaModal = () => {
    Modal.info({
      closable: false,
      maskClosable: true,
      title: 'Tips',
      content: (
        <div>
          <p>欢迎大家来到我的个人站点</p>
          <p>该网站为个人搭建，之后所有的个人项目将集成到这个网站中</p>
          <p>博客页引入个人微信公众号的文章，和公众号进行打通</p>
          <p>网站目前有以下规划：</p>
          <p>1.工具集合平台，未来会加入更多的前端工具</p>
          <p>2.详细规划时间线可通过右侧悬浮按钮中内容进行查看。</p>
          <p>...嗯 想起来再说吧~</p>
          <strong>个人网站，工作之余进行维护，迭代进度较慢，勿喷~</strong>
        </div>
      ),
    });
  };

  const createPlanDrawer = () => {
    return (
      <Fragment>
        <Divider orientation="left">技术栈</Divider>
        <Space size={[0, 10]} wrap>
          <Tag color="magenta">React</Tag>
          <Tag color="gold">Webpack</Tag>
          <Tag color="red">Nginx</Tag>
          <Tag color="volcano">Docker</Tag>
          <Tag color="orange">Jenkins</Tag>
        </Space>
        <Divider orientation="left">规划线</Divider>
        <Timeline
          items={[
            {
              dot: <CheckCircleTwoTone style={{ fontSize: '16px' }} className="timeline-clock-icon" />,
              children: '已完成',
            },
            {
              color: 'green',
              children: 'Webpack搭建多bundle工程',
            },
            {
              color: 'green',
              children: 'Nginx搭建项目路由、服务规则',
            },
            {
              color: 'green',
              children: 'GitWebhook+jenkins+docker实现自动化部署',
            },
            {
              color: 'green',
              children: '首页+博客页搭建',
            },
            {
              color: 'green',
              children: '博客页打通微信公众号文章',
            },
            {
              dot: (
                <ClockCircleOutlined style={{ fontSize: '16px', color: '#ff4d4f' }} className="timeline-clock-icon" />
              ),
              children: '待完成',
            },
            {
              color: 'gray',
              children: '首页工具集种类补充',
            },
            {
              color: 'gray',
              children: 'java|nodejs+mysql搭建后端服务',
            },
            {
              color: 'gray',
              children: '个人Flutter App引流',
            },
          ]}
        />
      </Fragment>
    );
  };

  return (
    <div id="tool-platform-container">
      <ProLayout
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            left: 85,
            bottom: 100,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            bottom: -68,
            right: -45,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '331px',
          },
        ]}
        {...routes}
        location={{
          pathname,
        }}
        menu={{
          type: 'group',
        }}
        // token={{
        //   header: {
        //     colorBgHeader: '#292f33',
        //     colorHeaderTitle: '#fff',
        //     colorTextMenu: '#dfdfdf',
        //     colorTextMenuSecondary: '#dfdfdf',
        //     colorTextMenuSelected: '#fff',
        //     colorBgMenuItemSelected: '#22272b',
        //     colorTextRightActionsItem: '#dfdfdf',
        //   },
        // }}
        token={{
          colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
          colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
          colorTextAppListIcon: 'rgba(255,255,255,0.85)',
          header: {
            colorBgHeader: '#004FD9',
            colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
            colorTextRightActionsItem: 'rgba(255,255,255,0.65)',
            colorHeaderTitle: '#fff',
            colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
            colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
            colorTextMenuSelected: '#fff',
            colorTextMenu: 'rgba(255,255,255,0.75)',
            colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
            colorTextMenuActive: 'rgba(255,255,255,0.95)',
          },
        }}
        actionsRender={(props) => {
          if (typeof window === 'undefined') return [];
          return [
            <Switch
              className={css(`
              padding-block: inherit;
              margin-right:10px;
            `)}
              size="default"
              checked={theme == 'eyeHelathy'}
              onChange={(checked: boolean) => changeTheme(checked)}
              checkedChildren="关闭护眼模式🤭"
              unCheckedChildren="打开护眼模式😄"
            />,
            <Tag
              color="#3b5999"
              onClick={() => {
                window.open(
                  'https://www.yanquankun.com/cdn/%E9%97%AB%E5%85%A8%E5%A0%83-%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88.pdf',
                  '_blank'
                );
              }}
            >
              个人PDF简历
            </Tag>,
            <Popover
              placement="bottom"
              title={<Image width={200} src="https://www.yanquankun.com/cdn/mini-program-qrcode.png" />}
              trigger="hover"
            >
              <Tag icon={<WechatOutlined />} color="#3b5999">
                个人小程序
              </Tag>
            </Popover>,
            <Popover
              placement="bottom"
              title={
                <Space direction="vertical">
                  <Image width={250} src="https://www.yanquankun.com/cdn/gongzhonghao-qrcode.jpg" />
                  <Image width={250} src="https://www.yanquankun.com/cdn/gongzhonghao-scan.png" />
                  <Image width={250} src="https://www.yanquankun.com/cdn/gongzhonghao-search.png" />
                </Space>
              }
              trigger="hover"
            >
              <Tag icon={<WechatOutlined />} color="#3b5999">
                个人公众号
              </Tag>
            </Popover>,
            props.layout !== 'side' ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <DateComp />
              </div>
            ) : undefined,
          ];
        }}
        // avatarProps={{
        //   src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        //   size: 'small',
        //   title: '闫全堃',
        // }}
        menuItemRender={(item, dom) => (
          <a
            target={item.target == 'blank' ? '_blank' : '_self'}
            onClick={() => setPathname(item.path || '/home/home')}
            href={item.path}
          >
            {dom}
          </a>
        )}
        logo={null}
        headerTitleRender={(logo, __, _) => {
          const defaultDom = (
            <a
              onClick={() => {
                location.href = '/home/home';
              }}
              className={css(`
              font-weight: 500;
              color: #fff;
              font-size: 18px!important;
              &:hover {
                color: rgb(255, 255, 255, .7);
              }
              `)}
            >
              闫全堃（Mint）个人站点
            </a>
          );
          if (typeof document === 'undefined' || document.body.clientWidth < 1400) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return <>{defaultDom}</>;
        }}
        fixedHeader
        {...{ ...settings }}
      >
        <PageContainer
          header={{
            title: '',
            breadcrumb: {},
          }}
        >
          {props.children ? (
            <>
              {MarqueeText(tip)}
              {props.children}
              <Drawer
                title="项目规划"
                placement="right"
                closable={false}
                onClose={() => setOpen(false)}
                open={open}
                key="right"
              >
                {createPlanDrawer()}
              </Drawer>
              <FloatButton.Group shape="square" style={{ right: 24, top: '300px', height: 'fit-content' }}>
                <FloatButton icon={<SplitCellsOutlined />} tooltip="规划" onClick={() => setOpen(true)} />
                <FloatButton icon={<QuestionCircleOutlined />} tooltip="what's this？" onClick={creatQaModal} />
                <FloatButton tooltip="刷新" icon={<SyncOutlined />} onClick={() => location.reload()} />
                <FloatButton.BackTop visibilityHeight={0} />
              </FloatButton.Group>
            </>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={<span>暂无数据，可到主页一游~</span>}
            >
              <Button
                type="primary"
                onClick={() => {
                  location.href = '/home/home';
                }}
              >
                let's go
              </Button>
            </Empty>
          )}
        </PageContainer>
      </ProLayout>
    </div>
  );
};
export default Container;
