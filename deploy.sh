#!/bin/sh

# 
# Some var set up. Less typing
#
builddir=./build/*

# Wrap this in a string so '~' doesn't resolve to local users home directory
proddir='~/domains/pinkiering.com/html/'
user=pinkiering.com
server=pinkiering.com

# EOF Didn't work here. 
# Had to wrap the remote commands in a string :/
ssh $user@$server '
zipdate=$(date +%m-%d-%Y-%H-%M)
cd ~/domains/pinkiering.com/html/
zip -r ../backups/$zipdate.zip ./
exit
'
# Build the prod files and mins them
npm run build

# Put them on the server
rsync --ignore-times -r --exclude '.DS_Store' $builddir $user@$server:$proddir

# Clean up (delete) the build directory
npm run build:clean