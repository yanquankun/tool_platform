# !/bin/bash

FILE=dist
if [ -d "$FILE" ]; then
    echo "存在 $FILE 目录，将删除后进行项目构建" && rm -rf "$FILE"
fi
