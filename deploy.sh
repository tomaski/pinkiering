#!/bin/sh

# Run tests befor we even start
npm test

builddir=./build/*

# Wrap this in a string so '~/' doesn't resolve to my user's home directory
proddir='~/domains/pinkiering.com/html/'

user=pinkiering.com
server=pinkiering.com

# Save a zipped backup of current site
# EOF Didn't work here. 
# Had to wrap the remote commands in a string :/
# TODO - remove old backups after (n) backups
ssh $user@$server '
zipdate=$(date +%m-%d-%Y-%H-%M)
cd ~/domains/pinkiering.com/html/
zip -r ../backups/$zipdate.zip ./
exit
'
# Build and mins the prod files. See package.json
npm run build

# Put built files on the server
rsync --ignore-times -r --exclude '.DS_Store' $builddir $user@$server:$proddir

# Clean up (delete) the build directory
npm run build:clean