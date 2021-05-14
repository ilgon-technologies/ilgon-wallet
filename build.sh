#!/bin/sh
if [ "$VUE_APP_MODE" != "test" ] && [ "$VUE_APP_MODE" != "prod" ]; then
  echo "Must provide correct VUE_APP_MODE in environment" 1>&2
  exit 1
fi
npm run update:lists && NODE_OPTIONS="--max-old-space-size=4096" vue-cli-service build
