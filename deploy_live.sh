#!/bin/sh
# builds the wallet and deploys it to the live server
# usage: deploy.sh USERNAME
rm -r dist
rm dist.zip
NODE_OPTIONS="--max-old-space-size=4096" npm run build:ci &&
  zip -r dist.zip dist &&
  scp ./dist.zip "$1@18.194.49.174:" &&
  ssh \
    "$1@18.194.49.174" \
    "rm -r dist; unzip dist.zip && rm -rf /wwwroot/* && mv dist/* /wwwroot/"
