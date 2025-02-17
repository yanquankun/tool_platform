import React, { useEffect, useRef, KeyboardEvent } from 'react';
import { css } from '@emotion/css';
import { Avatar, Button } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { isMobile } from '~shared/utils/util';

// 在文件顶部 import 下方添加
interface IMessage {
  content: string;
  isBot: boolean;
  loading?: boolean;
}

interface IProps {
  onClose: () => void;
}

// 修复 header 样式
const styles = {
  container: css`
    max-width: ${isMobile() ? '75%' : '400px'};
    margin: 0 auto;
    position: fixed;
    bottom: 75px;
    right: 75px;
    z-index: 999;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `,
  header: css`
    padding: 16px;
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  closeButton: css`
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      color: #40798c;
    }
  `,
  headerTitle: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  headerName: css`
    font-size: 16px;
    font-weight: 500;
  `,
  headerStatus: css`
    font-size: 12px;
    color: #52c41a;
  `,
  chatArea: css`
    height: 400px;
    overflow-y: auto;
    padding: 20px;
    background-color: #f9fafb;
    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 8px; /* 滚动条宽度 */
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff; /* 滚动条颜色 */
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent; /* 滚动条轨道颜色 */
    }
  `,
  messageContainer: css`
    display: flex;
    margin-bottom: 16px;
    gap: 12px;
    align-items: flex-start;
  `,
  message: css`
    max-width: 70%;
    border-radius: 20px;
    line-height: 1.5;
    padding: 10px 12px;
  `,
  timeStamp: css`
    font-size: 12px;
    color: #999;
    margin-top: 4px;
    text-align: left;
  `,
  inputArea: css`
    display: flex;
    padding: 16px;
    background-color: white;
    gap: 12px;
    border-top: 1px solid #f0f0f0;
  `,
  userMessageContent: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  messageContent: css`
    width: calc(100% - 45px);
  `,
  sendBtn: css`
    backgroundcolor: #1677ff;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const messageStyles = {
  botMessage: css`
    justify-content: flex-start;
    .${styles.message} {
      color: #333;
    }
  `,
  userMessage: css`
    justify-content: flex-end;
    .${styles.message} {
      color: white;
    }
  `,
};

const ChatBot: React.FC<IProps> = (props: IProps) => {
  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      content: "Hi I'm DocsBot. I'm here to help you explain how I work.",
      isBot: true,
    },
    {
      content: "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatBot = document.getElementsByClassName('chatbot')[0];
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && event.target !== chatBot) {
        props.onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
  // 在 ChatBot 组件内添加模拟回复函数
  const mockBotReply = async (userMessage: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `这是对 "${userMessage}" 的回复`;
  };

  // 修改 handleSendMessage 函数
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = inputValue;
      setInputValue('');
      // 添加用户消息
      setMessages((prev) => [...prev, { content: userMessage, isBot: false }]);

      // 添加机器人加载消息
      setMessages((prev) => [...prev, { content: '', isBot: true, loading: true }]);

      // 获取机器人回复
      const reply = await mockBotReply(userMessage);

      // 更新机器人消息
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1) {
            return { content: reply, isBot: true };
          }
          return msg;
        })
      );
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.headerName}>AI 助手</span>
          <span className={styles.headerStatus}>在线</span>
        </div>
        <CloseOutlined className={styles.closeButton} onClick={props.onClose} />
      </div>
      {/* 修改消息渲染部分 */}
      <div className={styles.chatArea} ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageContainer} ${message.isBot ? messageStyles.botMessage : messageStyles.userMessage}`}
          >
            {message.isBot ? (
              <>
                <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
                <div className={styles.messageContent}>
                  <div className={styles.message} style={{ backgroundColor: '#fff', borderRadius: '8px 8px 8px 0' }}>
                    {message.loading ? (
                      <span
                        className={css`
                          display: inline-block;
                          width: calc(100% - 45px);
                          text-align: left;
                          &::after {
                            content: '...';
                            animation: ellipsis 1.5s infinite;
                          }
                          @keyframes ellipsis {
                            0% {
                              content: '.';
                            }
                            33% {
                              content: '..';
                            }
                            66% {
                              content: '...';
                            }
                          }
                        `}
                      >
                        正在输入
                      </span>
                    ) : (
                      message.content
                    )}
                  </div>
                  {!message.loading && (
                    <div className={styles.timeStamp}>
                      {new Date().toLocaleTimeString('zh-CN', { hour12: true, hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={styles.userMessageContent}>
                  <div
                    className={styles.message}
                    style={{ backgroundColor: '#2B6BF3', borderRadius: '8px 8px 0 8px', color: 'white' }}
                  >
                    {message.content}
                  </div>
                  <div className={styles.timeStamp}>
                    {new Date().toLocaleTimeString('zh-CN', { hour12: true, hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <Avatar style={{ backgroundColor: '#40798c' }}>U</Avatar>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
          className={css`
            flex: 1;
            padding: 8px 16px;
            border: 1px solid #e8e8e8;
            border-radius: 20px;
            &:focus {
              outline: none;
              border-color: #1677ff;
            }
          `}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          className={styles.sendBtn}
        />
      </div>
    </div>
  );
};

export default ChatBot;
