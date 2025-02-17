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

const styles = {
  container: css`
    max-width: 400px;
    margin: 0 auto;
    position: absolute;
    bottom: 75px;
    right: 75px;
    z-index: 999;
  `,
  header: css`
    padding: 5px 0 5px 20px;
    background-color: #efe8e8;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #fff;
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
  chatArea: css`
    height: 300px;
    overflow-y: auto;
    padding: 20px;
    background-color: #efe8e8;
  `,
  messageContainer: css`
    display: flex;
    margin-bottom: 16px;
    gap: 12px;
  `,
  botMessage: css`
    justify-content: flex-start;
  `,
  userMessage: css`
    justify-content: flex-end;
  `,
  message: css`
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #40798c;
    color: white;
  `,
  inputArea: css`
    display: flex;
    padding: 16px;
    background-color: #efe8e8;
    border-top: 1px solid #fff;
    border-radius: 0 0 8px 8px;
    gap: 8px;
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

  // 在消息渲染部分修改
  <div className={styles.chatArea} ref={chatAreaRef}>
    {messages.map((message, index) => (
      <div
        key={index}
        className={`${styles.messageContainer} ${message.isBot ? styles.botMessage : styles.userMessage}`}
      >
        {message.isBot ? (
          <>
            <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
            <div className={styles.message}>
              {message.loading ? (
                <span
                  className={css`
                    display: inline-block;
                    width: 50px;
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
  </div>;

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>智慧QA</span>
        <CloseOutlined className={styles.closeButton} onClick={props.onClose} />
      </div>
      {/* 修改消息渲染部分 */}
      <div className={styles.chatArea} ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageContainer} ${message.isBot ? styles.botMessage : styles.userMessage}`}
          >
            {message.isBot ? (
              <>
                <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
                <div className={styles.message}>{message.content}</div>
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
          placeholder="Write your message here"
          className={css`
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            &:focus {
              outline: none;
              border-color: #40798c;
            }
          `}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          style={{ backgroundColor: '#40798c' }}
        />
      </div>
    </div>
  );
};

export default ChatBot;
