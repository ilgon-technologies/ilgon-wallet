#!/bin/sh
# builds the wallet and deploys it to the dev server
# usage: deploy.sh USERNAME
rm -r dist
rm dist.zip
NODE_OPTIONS="--max-old-space-size=4096" npm run build:ci &&
  zip -r dist.zip dist &&
  scp ./dist.zip "$1@18.193.173.193:" &&
  ssh \
    "$1@18.193.173.193" \
    "rm -r dist; unzip dist.zip && sudo rm -rf /var/www/html.bak/* && sudo mv dist/* /var/www/html.bak/"
