import { FC, Fragment, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Space, Image, Tag, Popover, Button, Drawer, message } from 'antd';
import { QrcodeOutlined, DownOutlined } from '@ant-design/icons';
import { isMobile } from '~shared/utils/util';
import { Slider } from './slider';
import useMarqueeText from '~shared/components/marquee';
import { getLastedNotice } from '~shared/apis/static';

interface IProps {
  transportBlogId: (blogId: string, content: string) => void;
}
export const Header: FC<IProps> = function (props: IProps): JSX.Element {
  const _isMobile = isMobile();
  const [open, setOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const [tip, setTip] = useState<string>('');
  const { height, createMarguee } = useMarqueeText(tip, 57);

  useEffect(() => {
    (async function () {
      const message = await getLastedNotice();
      setTip(message);
    })();
  }, []);

  useEffect(() => {
    const slider = document.getElementById('slider');
    const content = document.getElementById('content');
    if (slider) {
      slider.style.paddingTop = `${height}px`;
    }
    if (content) {
      content.style.paddingTop = `${height}px`;
    }
  }, [height]);

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
        className={css`
          color: #aaa;
          display: inline-block;
          vertical-align: middle;
          position: relative;
          top: -1px;
          margin-left: 0.1rem;
        `}
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
        <Tag
          bordered={false}
          className={css`
            background-color: transparent;
            font-weight: 500;
            color: inherit;
            font-size: 14px;
            margin-right: -3px;
            cursor: pointer;
          `}
        >
          {_isMobile ? (
            <a href="/home/resume" target="_self">
              个人主页
            </a>
          ) : (
            <a href="/home/resume" target="_blank">
              个人主页
            </a>
          )}
        </Tag>
        <Popover
          placement="bottom"
          title={<Image width={200} src="https://www.yanquankun.cn/cdn/mini-program-qrcode.png" />}
          trigger="hover"
        >
          <Tag
            bordered={false}
            className={css`
              background-color: transparent;
              font-weight: 500;
              color: inherit;
              font-size: 14px;
              margin-right: -3px;
              cursor: pointer;
            `}
          >
            <span>个人小程序</span>
            <QrcodeOutlined
              className={css`
                color: #aaa;
                margin-inline-start: 3px !important;
              `}
            />
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
          <Tag
            bordered={false}
            className={css`
              background-color: transparent;
              font-weight: 500;
              color: inherit;
              font-size: 14px;
              margin-right: -3px;
              cursor: pointer;
            `}
          >
            <span>个人公众号</span>
            <QrcodeOutlined
              className={css`
                color: #aaa;
                margin-inline-start: 3px !important;
              `}
            />
          </Tag>
        </Popover>
        {_isMobile ? (
          <a
            className={css`
              text-decoration: none;
              margin-left: 0.6rem;
              font-weight: 500;
              color: inherit;
            `}
            href="https://github.com/yanquankun?tab=repositories"
            target="_self"
          >
            github
            {getSvgComponent()}
          </a>
        ) : (
          <a
            className={css`
              text-decoration: none;
              margin-left: 0.6rem;
              font-weight: 500;
              color: inherit;
            `}
            href="https://github.com/yanquankun?tab=repositories"
            target="_blank"
          >
            github
            {getSvgComponent()}
          </a>
        )}
      </div>
    );
  };

  const handleOpenChange = (newOpen: boolean) => {
    setExtraOpen(newOpen);
  };

  return (
    <header
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        right: 0;
        height: 3.6rem;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #eaecef;
        padding: 0.7rem 1.5rem;
        line-height: 2.2rem;
        width: 100vw;
      `}
    >
      {_isMobile ? (
        <Fragment>
          <Drawer
            title="博客列表"
            placement="right"
            onClose={() => setOpen(false)}
            closable={false}
            open={open}
            width="80%"
          >
            <Slider transportBlog={props.transportBlogId} />
          </Drawer>
          {/* 展示默认的博客，先显示一次侧边栏 */}
          <div style={{ display: 'none' }}>
            <Slider transportBlog={props.transportBlogId} />
          </div>
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <Button size="large" type="text" onClick={() => setOpen(!open)}>
              <span
                className={css`
                  font-size: 1.3rem;
                  font-weight: 600;
                  color: #2c3e50;
                  position: relative;
                `}
              >
                堃堃博客
              </span>
              <DownOutlined />
            </Button>
            <Popover
              content={getExtraDom()}
              title="小程序&个人站点"
              trigger="click"
              open={extraOpen}
              onOpenChange={handleOpenChange}
            >
              <Button size="large" type="text" onClick={() => setExtraOpen(!extraOpen)}>
                <span
                  className={css`
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #2c3e50;
                    position: relative;
                  `}
                >
                  Extra
                </span>
              </Button>
            </Popover>
          </div>
        </Fragment>
      ) : (
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            className={css`
        line-height: 2.2rem;
        font-size: 1.3rem;
        font-weight: 600;
        color: #2c3e50;
        position: relative;
  }`}
          >
            堃堃博客
          </span>
          {getExtraDom()}
        </div>
      )}
      {createMarguee()}
    </header>
  );
};
