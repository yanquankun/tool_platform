import React, { useEffect, useRef, KeyboardEvent } from 'react';
import { css } from '@emotion/css';
import { Avatar, Button } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';

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
    max-width: 400px;
    margin: 0 auto;
    position: absolute;
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
    background-color: #ffffff; // 修改背景色为白色
  `,
  messageContainer: css`
    display: flex;
    margin-bottom: 16px;
    gap: 12px;
    align-items: flex-end;
  `,
  message: css`
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.5;
    background-color: #f0f0f0; // 为每条消息添加背景色
  `,
  timeStamp: css`
    font-size: 12px;
    color: #999;
    margin-top: 4px;
    text-align: left; // 确保时间戳在左侧对齐
  `,
  inputArea: css`
    display: flex;
    padding: 16px;
    background-color: white;
    gap: 12px;
    border-top: 1px solid #f0f0f0;
  `,
};

const messageStyles = {
  botMessage: css`
    justify-content: flex-start;
    .${styles.message} {
      background-color: white;
      color: #333;
    }
  `,
  userMessage: css`
    justify-content: flex-end;
    .${styles.message} {
      background-color: #1677ff;
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

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.headerName}>AI 助手</span>
          <span className={styles.headerStatus}>在线</span>
        </div>
        {/* <CloseOutlined className={styles.closeButton} onClick={props.onClose} /> */}
      </div>
      <div className={styles.chatArea} ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageContainer} ${message.isBot ? messageStyles.botMessage : messageStyles.userMessage}`}
          >
            {message.isBot ? (
              <>
                <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
                <div className={styles.message}>
                  {message.loading ? (
                    <span
                      className={css`
                        display: inline-block;
                        width: 70px;
                        text-align: center;
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
              </>
            ) : (
              <>
                <div className={styles.message}>{message.content}</div>
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
          style={{ backgroundColor: '#1677ff' }}
        />
      </div>
    </div>
  );
};

export default ChatBot;
