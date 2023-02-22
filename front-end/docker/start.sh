#!/bin/bash

cd /SERVICE


yarn global add serve
serve -s -l 8001 build

exec "$@"