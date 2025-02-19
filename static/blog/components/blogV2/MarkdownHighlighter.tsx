import { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { marked } from 'marked';
import Prism from 'prismjs';
// 引入你需要的语言支持
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markdown';

const styles = {
  code: css`
    * {
      max-width: 100%;
    }
  `,
};

interface IProps {
  markdown: string;
  isMedia?: boolean;
}
const MarkdownHighlighter = ({ markdown = '', isMedia = false }: IProps) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (markdown.indexOf('</think>') > -1) {
      markdown = `<p>思考过程🤔...\n ${markdown.replace('</think>', '')}</p>`;
    }

    // 使用 marked 解析 Markdown
    const parsedHtml = marked.parse(markdown) as string;
    setHtml(parsedHtml);
  }, [markdown]);

  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

  return (
    <pre
      style={{
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
      }}
    >
      {isMedia ? (
        <div
          className={cx('language-javascript', styles.code)}
          style={{
            width: '100%',
            whiteSpace: 'pre-wrap',
            /* 旧版浏览器使用 word-wrap，新版使用 overflow-wrap */
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      ) : (
        <code
          className="language-javascript"
          style={{
            width: '100%',
            whiteSpace: 'pre-wrap',
            /* 旧版浏览器使用 word-wrap，新版使用 overflow-wrap */
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></code>
      )}
    </pre>
  );
};

export default MarkdownHighlighter;
