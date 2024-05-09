#!/bin/sh

# http://download.redis.io/releases/

VERSION="7.0.0"
INIT_PATH=$(dirname "$0")

echo "CURRENT_PATH:" && pwd

echo "INIT_PATH:" $INIT_PATH

mkdir temp

cd temp

wget -O redis-$VERSION.tar.gz "http://download.redis.io/releases/redis-$VERSION.tar.gz"

tar xzf redis-$VERSION.tar.gz

rm redis-$VERSION.tar.gz

cd redis-$VERSION

make -j"$(nproc)"

mkdir redis-portable
find src/ -perm /a+x -exec cp {} redis-portable/ \;

cd ../

cp -r redis-$VERSION/redis-portable redis-portable

rm -rf redis-$VERSION

sudo apt update
sudo apt install tmux -y
tmux new -d "redis-portable/redis-server --loadmodule ../modules/redis/rejson.so"
