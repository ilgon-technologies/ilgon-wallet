cd deployment || exit
# remove all files and folders except for hidden ones and CNAME
find . ! -path '.' ! -path './\.*' ! -name 'CNAME' -exec git rm -r {} +
cp -r ../dist/* ./
cp index.html 404.html
git add ./*
git add ./**/*
