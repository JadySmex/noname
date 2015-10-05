#!/bin/bash
cd /home/ec2-user
npm install
bower --allow-root install
forever start server.js