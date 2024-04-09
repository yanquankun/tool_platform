import { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { CloseCircleFilled } from '@ant-design/icons';

const style = {
  wrapper: `@keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      left: 30px;
    }
  };
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background: papayawhip;
  height: 24px;
  width: -webkit-fill-available;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;`,
};

const MarqueeText = (text: string, showCloseBtn: boolean = true) => {
  const textContentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

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
      }
    });
  }, [text, showCloseBtn]);

  return (
    <>
      {visible && text && (
        <div className={css(style.wrapper)}>
          <div className={css(`position:absolute;`)} ref={textContentRef}></div>
          {closeBtnVisible && (
            <CloseCircleFilled className={css(`position:absolute;right:30px`)} onClick={() => setVisible(false)} />
          )}
        </div>
      )}
    </>
  );
};

export default MarqueeText;
