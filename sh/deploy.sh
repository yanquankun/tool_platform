cd nginxProject
cd tool_platfrom
rm -rf backup.zip
zip backup.zip bunde page theme
unzip dist.zip
rm -rf /bundle /page /theme
cd dist
mv * ../
rm -rf dist dist.zip