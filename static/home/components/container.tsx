import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { useState } from 'react';
import { Switch, Empty, Button } from 'antd';
import routes from './route';
import { FC } from 'react';

interface IContainerProps {
  children?: React.ReactNode;
}
const Container: FC<IContainerProps> = (props: IContainerProps) => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: true,
  };

  const currentPathName = location.pathname;
  const [pathname, setPathname] = useState(currentPathName || '/home/home');
  const [themeChecked, setThemeChecked] = useState<boolean>(true);

  const themeChange = function (checked: boolean) {
    console.log(checked);
    setThemeChecked(checked);
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
                <Switch onChange={themeChange} checkedChildren="亮色" unCheckedChildren="暗黑" checked={themeChecked} />
              </div>
            ) : undefined,
          ];
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '闫全堃',
        }}
        menuItemRender={(item, dom) => (
          <a onClick={() => setPathname(item.path || '/home/home')} href={item.path}>
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
              color: ${themeChecked ? 'rgba(0, 0, 0, 0.95)' : '#fff'};
              font-size: 18px!important;
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
        {...{ ...settings, navTheme: themeChecked ? 'light' : 'realDark' }}
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
