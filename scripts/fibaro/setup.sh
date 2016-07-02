#!/bin/bash
ZWAY_LIB_DIR="/opt/z-way-server/libs"

export LD_LIBRARY_PATH=$ZWAY_LIB_DIR:$LD_LIBRARY_PATH; 
export DYLD_LIBRARY_PATH=$ZWAY_LIB_DIR:$DYLD_LIBRARY_PATH;
#./compile.sh;
echo "Setup";
/home/pi/Desktop/access-control-system/scripts/fibaro/setup;