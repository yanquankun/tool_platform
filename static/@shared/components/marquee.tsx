import { useState, useEffect, useRef, Fragment, useMemo, useCallback } from 'react';
import { css } from '@emotion/css';
import { CloseCircleFilled } from '@ant-design/icons';
import { he } from 'element-plus/es/locale';

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
    position: absolute;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0px 40px 0 30px;
    background: papayawhip;
    width: -webkit-fill-available;
    left: 0;
    top: 57px;
    /* flex-wrap: wrap; */
    width: 100%;
    box-sizing: border-box;
  `,
  inner: `
    line-height: 25px;
  `,
};

const useMarqueeText = (text: string, top: number = 0, showCloseBtn: boolean = true) => {
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
            <div ref={marqueeContentRef} id="marquee" className={css(style.wrapper, `top:${top}px`)}>
              <span className={css(style.inner)} ref={textContentRef}></span>
              {closeBtnVisible && (
                <CloseCircleFilled
                  className={css(`position:absolute;right:20px`)}
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
