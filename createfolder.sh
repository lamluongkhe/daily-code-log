#!/bin/bash
TODAY=$(date +%Y-%m-%d)
mkdir -p $TODAY
cp "$1" $TODAY/
git add .
git commit -m "Daily log: $TODAY"
git push origin main

