import { useState, useEffect, useRef, Fragment, useMemo, useCallback } from 'react';
import { css } from '@emotion/css';
import { CloseCircleOutlined } from '@ant-design/icons';

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
   font-size: 15px;
   font-weight: 300;
   margin-right: 10px;
  `,
};

const useMarqueeText = (text: string, showCloseBtn: boolean = true) => {
  const textContentRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!!text) setVisible(true);
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
              <span className={css(style.inner)} ref={textContentRef}></span>
              {closeBtnVisible && (
                <CloseCircleOutlined
                  onClick={() => {
                    setVisible(false);
                    setHeight(0);
                  }}
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
