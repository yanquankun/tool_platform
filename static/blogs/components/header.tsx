import { FC, useState } from 'react';
import { css } from '@emotion/css';
import { Space, Tag, Popover, Image, Button } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { isMobile } from '~shared/utils/util';

const styled = {
  header: css`
    height: 64px;
    width: 100%;
    border-bottom: 1px solid #e5e7eb;
    background-color: #fefefe;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    box-sizing: border-box;
  `,
  headerLeft: css`
    font-size: 1.3rem;
    font-weight: bold;
    cursor: not-allowed;
    color: rgb(44, 62, 80);
  `,
  headerRight: css`
    font-size: 16px;
  `,
  svg: css`
    color: #aaa;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px;
    margin-left: 0.1rem;
  `,
  tag: css`
    background-color: transparent;
    font-weight: 500;
    color: inherit;
    font-size: 0.89rem;
    margin-right: -3px;
    cursor: pointer;
  `,
  link: css`
    text-decoration: none;
    margin-left: 0.6rem;
    font-weight: 500;
    color: inherit;
    font-size: 0.89rem;
  `,
  qrCodeIcon: css`
    color: #aaa;
    margin-inline-start: 3px !important;
  `,
  headerIcon: css`
    width: 1.5rem;
    margin-right: 0.6rem;
    vertical-align: middle;
  `,
  extra: css`
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
  `,
};

const Header: FC<{ showDrawer: () => void }> = ({ showDrawer }) => {
  const _isMobile = isMobile();
  const [extraOpen, setExtraOpen] = useState(false);

  const getSvgComponent = (): JSX.Element => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        width="15"
        height="15"
        className={styled.svg}
      >
        <path
          fill="currentColor"
          d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
        ></path>{' '}
        <polygon
          fill="currentColor"
          points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
        ></polygon>
      </svg>
    );
  };

  const getExtraDom = (): JSX.Element => {
    return (
      <div>
        <Tag bordered={false} className={styled.tag}>
          <a href="https://www.yanquankun.cn/pdf/?lang=zh_CN" target={_isMobile ? '_self' : '_blank'}>
            pdf工具
          </a>
        </Tag>
        <Tag bordered={false} className={styled.tag}>
          <a href="/home/resume" target={_isMobile ? '_self' : '_blank'}>
            个人主页
          </a>
        </Tag>
        <Popover
          placement="bottom"
          title={<Image width={200} src="https://www.yanquankun.cn/cdn/mini-program-qrcode.png" />}
          trigger="hover"
        >
          <Tag bordered={false} className={styled.tag}>
            <span>个人小程序</span>
            <QrcodeOutlined className={styled.qrCodeIcon} />
          </Tag>
        </Popover>
        <Popover
          placement="bottom"
          title={
            <Space direction="vertical">
              <Image width={250} src="https://www.yanquankun.cn/cdn/gongzhonghao-qrcode.jpg" />
              <Image width={250} src="https://www.yanquankun.cn/cdn/gongzhonghao-scan.png" />
              <Image width={250} src="https://www.yanquankun.cn/cdn/gongzhonghao-search.png" />
            </Space>
          }
          trigger="hover"
        >
          <Tag bordered={false} className={styled.tag}>
            <span>个人公众号</span>
            <QrcodeOutlined className={styled.qrCodeIcon} />
          </Tag>
        </Popover>
        {_isMobile ? (
          <a className={styled.link} href="https://github.com/yanquankun?tab=repositories" target="_self">
            github
            {getSvgComponent()}
          </a>
        ) : (
          <a className={styled.link} href="https://github.com/yanquankun?tab=repositories" target="_blank">
            github
            {getSvgComponent()}
          </a>
        )}
      </div>
    );
  };

  return (
    <header className={styled.header}>
      <div className={styled.headerLeft}>
        {_isMobile ? (
          <img
            src="https://www.yanquankun.cn/cdn/blog/menu.png"
            onClick={showDrawer}
            className={styled.headerIcon}
            alt=""
          />
        ) : (
          <>
            <img src="https://www.yanquankun.cn/cdn/blog/blog-header-icon.png" className={styled.headerIcon} alt="" />
            堃堃博客
          </>
        )}
      </div>
      <div className={styled.headerRight}>
        {_isMobile ? (
          <Popover
            content={getExtraDom()}
            title=""
            trigger="click"
            open={extraOpen}
            onOpenChange={() => setExtraOpen(!extraOpen)}
          >
            <Button size="small" type="link" onClick={() => setExtraOpen(!extraOpen)}>
              <span className={styled.extra}>个人项目</span>
            </Button>
          </Popover>
        ) : (
          getExtraDom()
        )}
      </div>
    </header>
  );
};

export default Header;
