#!/bin/sh
echo "Starting server!!!"
#nohup sh -c /root/server/server >/dev/null 2>&1 &
cp -r -n /opt/x64/* /ragemp
cd /ragemp
/ragemp/server