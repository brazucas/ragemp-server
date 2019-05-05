#!/bin/sh
echo "Starting server"
cp -r -n /opt/x64/* /ragemp
cd /ragemp
npm install --no-package-lock
/ragemp/server
