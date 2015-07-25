#!/bin/sh
git commit -am'pre-deploy commit'
git checkout -b gh-pages
npm run build
ls | grep -v node_modules | grep -v dev | xargs rm -rf
# mv ./build/* ./
# git add --all
# git commit -am'automated'
# git push origin gh-pages --force
# rm -rf ./build
# git checkout master
# git branch -D gh-pages