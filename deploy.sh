#!/bin/sh
git commit -am'pre-deploy commit'
git checkout -b gh-pages
ls | grep -v node_modules | grep -v dev | xargs rm -rf
mv dev/* ./
git add --all
git commit -am'automated'
git push origin gh-pages --force
git checkout master
git branch -D gh-pages