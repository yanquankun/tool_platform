import { useState, useEffect, useRef, Fragment, useMemo, useCallback } from 'react';
import { css } from '@emotion/css';
import { CloseCircleOutlined, SoundFilled } from '@ant-design/icons';

const style = {
  wrapper: `
    @keyframes scroll {
      0% {
        transform: translateX(100%);
      }
      100% {
        left: 30px;
      }
    };
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFBEB;
    border: 1px solid #FEF3C7;
    width: 100%;
    box-sizing: border-box;
    height: auto;
    padding: 10px 20px;
  `,
  inner: `
   font-size: 0.98rem;
   font-weight: 300;
   margin-right: 10px;
  `,
  trumpet: css`
    margin-right: 0.5rem;
    animation: scaleIcon 2.4s ease-in-out 3;
    @keyframes scaleIcon {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
  `,
  close: css`
    width: 0.8rem;
    cursor: pointer;
  `,
};

const useMarqueeText = (text: string, showCloseBtn: boolean = true) => {
  const textContentRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!!text) setVisible(!!text);
    setCloseBtnVisible(showCloseBtn);

    setTimeout(() => {
      const textContent = textContentRef.current;
      if (textContent) {
        // 获取实际宽度
        const { width } = textContent.getBoundingClientRect();
        let duration = '3s';
        if (width > document.body.clientWidth - 60) {
          duration = width / 30 + 's';
        }
        textContent.innerText = text;
        textContent.style.animation = `${duration} scroll linear`;

        const height = textContent.getBoundingClientRect()?.height ?? 0;
        setHeight(height);
      }
    });
  }, [text, showCloseBtn]);

  return {
    createMarguee: () => {
      return (
        <Fragment>
          {visible && text && (
            <div ref={marqueeContentRef} id="marquee" className={css(style.wrapper)}>
              <SoundFilled className={style.trumpet} />
              <span className={css(style.inner)} ref={textContentRef}></span>
              {closeBtnVisible && (
                <img
                  className={css(style.close)}
                  onClick={() => {
                    setVisible(false);
                  }}
                  src="https://www.yanquankun.cn/cdn/blog/close.png"
                  alt=""
                />
              )}
            </div>
          )}
        </Fragment>
      );
    },
    height,
  };
};

export default useMarqueeText;
