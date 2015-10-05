#!/bin/bash
yum update -y
yum install -y nodejs npm --enablerepo=epel
curl -0 -L http://npmjs.org/install.sh | sh
npm install -g npm
npm install forever -g
echo "[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1" > /etc/yum.repos.d/mongodb-org-3.0.repo
yum install -y mongodb-org
yum install -y mongodb-org-3.0.6 mongodb-org-server-3.0.6 mongodb-org-shell-3.0.6 mongodb-org-mongos-3.0.6 mongodb-org-tools-3.0.6
service mongod start
chkconfig mongod on
mkdir /var/www