#!/bin/sh
# builds the wallet and deploys it to the dev server
# usage: deploy.sh USERNAME
if [ "$1" = "" ]; then
  echo "Must provide first arg" 1>&2
  exit 1
fi
rm dist.zip
VUE_APP_MODE="test" ./build.sh &&
  zip -r dist.zip dist &&
  scp ./dist.zip "$1@18.193.173.193:" &&
  ssh \
    "$1@18.193.173.193" \
    "rm -r dist; unzip dist.zip && sudo rm -rf /var/www/html.bak/* && sudo mv dist/* /var/www/html.bak/"
