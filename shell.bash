#!/bin/bash
#feito esse script pra automatizar o deploy na cloud
APP_NAME="api"
GIT_WORK_TREE="/repo/api.com"
GIT_DIR="/repo/api.git"
NODE_VERSION="v8.6.0"

echo
echo "--> Selecting Node version $NODE_VERSION"
. $HOME/.nvm/nvm.sh
nvm use $NODE_VERSION

echo
echo "--> Deleting old process..."
pm2 delete $APP_NAME

echo
echo "--> Git checkout..."
git --work-tree=$GIT_WORK_TREE --git-dir=$GIT_DIR checkout -f

echo
echo "--> Installing libraries..."
cd $GIT_WORK_TREE
npm install

echo
echo "--> Restarting server..."
pm2 start npm --name $APP_NAME -- start

echo
echo "--> New build running!"
echo

