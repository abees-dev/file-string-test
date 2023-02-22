#!/bin/bash
tar --exclude="node_modules" --exclude="build" --exclude=".github"  --exclude=".idea"  -zcvf SERVICE.tgz *