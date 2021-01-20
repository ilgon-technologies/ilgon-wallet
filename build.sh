#!/bin/sh
rm -r dist
NODE_OPTIONS="--max-old-space-size=4096" npm run build:ci
