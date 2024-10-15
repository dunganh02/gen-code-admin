#!/bin/bash
echo "Start build"
workdir="/srv/GenCode/admin"
docker compose build
cd /srv/GenCode
docker compose up -d