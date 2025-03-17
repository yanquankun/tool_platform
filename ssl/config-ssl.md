1. 安装ssl工具

```bash
# mac
brew install mkcert
# windows
choco install mkcert
```

2. 创建证书

```bash
mkcert -install
```

3. 为特定域名生成证书

```bash
mkcert local.platform.yanquankun.cn
```
