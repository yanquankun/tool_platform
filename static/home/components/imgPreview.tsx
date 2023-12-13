import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import { Image, Row, Col, Button } from 'antd';
import { css } from '@emotion/css';

export interface IFileInfo {
  sizeList: Array<number>;
  fileNameList: Array<string>;
  fileList: Array<File>;
  size: number;
}

export const ImgPreview: FC = (): JSX.Element => {
  const [imgUrlList, setImgUrlList] = useState<Array<string>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  let inputElement: HTMLInputElement;

  const getFilesInfo = (files: FileList): IFileInfo => {
    let count = 0,
      fileInfo = {
        sizeList: [],
        fileNameList: [],
        fileList: [],
        size: 0,
      } as IFileInfo;
    while (count < files.length) {
      const file = files.item(count) as File;
      fileInfo.sizeList.push(file.size);
      fileInfo.fileNameList.push(file.name);
      fileInfo.fileList.push(file);
      fileInfo.size += file.size;
      count++;
    }
    return fileInfo;
  };

  const fileChange = (files: FileList) => {
    const fileInfo = getFilesInfo(files);
    console.log(fileInfo);
    if (files.length > 3) {
      console.log('文件数不能超过三个');
      return false;
    }
    setImgUrlList([]);
    let imgUrlList: Array<string> = [];
    fileInfo.fileList.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64Src = (event?.target?.result ?? '') as string;
        imgUrlList.push(base64Src);
        imgUrlList.length === fileInfo.fileList.length && setImgUrlList(imgUrlList);
      };
      reader.readAsDataURL(file);
    });
  };

  const inputClick = () => {
    inputRef?.current?.click() ?? null;
  };

  return (
    <div>
      <input
        className={css`
          display: none !important;
        `}
        ref={inputRef}
        multiple
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={(event) => fileChange(event.target.files as FileList)}
      />
      <Button
        className={css`
          margin-bottom: 10px;
        `}
        type="primary"
        onClick={inputClick}
      >
        选择图片
      </Button>
      <Row gutter={16}>
        {Boolean(imgUrlList.length) &&
          imgUrlList.map((url: string, idx: number) => {
            return (
              <Col key={idx}>
                <Image width={200} src={url} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
