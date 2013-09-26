#!/bin/bash
# ElasticSearch Installation script
# Piyush <piykumar@gmail.com>

# Note: Install Oracle Sun JDK 1.7 before

echo "Java version: " $(java -version)

ES_DOWNLOAD_URL="https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.5.tar.gz"
INSTALL_DIR="/opt"

cd /tmp
wget ${ES_DOWNLOAD_URL} -O elasticsearch.tar.gz
 
tar -xf elasticsearch.tar.gz
rm elasticsearch.tar.gz
mv elasticsearch-* elasticsearch
mv elasticsearch /opt
 
curl -L http://github.com/elasticsearch/elasticsearch-servicewrapper/tarball/master | tar -xz
mv *servicewrapper*/service /opt/elasticsearch/bin/
rm -Rf *servicewrapper*
sed -i '/set.default.ES_HOME/c\set.default.ES_HOME=/opt/elasticsearch' ${INSTALL_DIR}/elasticsearch/bin/service/elasticsearch.conf
${INSTALL_DIR}/elasticsearch/bin/service/elasticsearch install

# start ES service
/etc/init.d/elasticsearch start

# install plugins
${INSTALL_DIR}/elasticsearch/bin/plugin --install mobz/elasticsearch-head
${INSTALL_DIR}/elasticsearch/bin/plugin --install lukas-vlcek/bigdesk
 
# Test 
curl http://localhost:9200



