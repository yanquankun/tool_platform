import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { Switch, Empty, Button, Space } from 'antd';
import routes from './route';
import { FC } from 'react';

interface IContainerProps {
  children?: React.ReactNode;
}
type theme = 'light' | 'dark';
const Container: FC<IContainerProps> = (props: IContainerProps) => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: true,
  };

  const currentPathName = location.pathname;
  const [pathname, setPathname] = useState(currentPathName || '/home/home');
  const [themeChecked, setThemeChecked] = useState<theme>((window.localStorage.getItem('theme') as theme) || 'light');
  const [date, setDate] = useState<string>(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);

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

  const themeChange = function (checked: boolean) {
    window.localStorage.setItem('theme', checked ? 'light' : 'dark');
    setThemeChecked(checked ? 'light' : 'dark');
  };

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
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
        token={{
          header: {
            colorBgHeader: '#292f33',
            colorHeaderTitle: '#fff',
            colorTextMenu: '#dfdfdf',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextRightActionsItem: '#dfdfdf',
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          if (typeof window === 'undefined') return [];
          return [
            props.layout !== 'side' ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Switch
                  onChange={themeChange}
                  checkedChildren="亮色"
                  unCheckedChildren="暗黑"
                  checked={themeChecked == 'light'}
                />
                <span
                  css={{
                    marginLeft: '20px',
                  }}
                >
                  {date}
                </span>
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
        {...{ ...settings, navTheme: themeChecked == 'light' ? 'light' : 'realDark' }}
      >
        <PageContainer
          header={{
            title: '',
            breadcrumb: {},
          }}
        >
          {props.children ? (
            props.children
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
