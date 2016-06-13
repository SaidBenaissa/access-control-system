#!/bin/bash
ZWAY_LIB_DIR="/opt/z-way-server/libs"

export LD_LIBRARY_PATH=$ZWAY_LIB_DIR:$LD_LIBRARY_PATH; 
export DYLD_LIBRARY_PATH=$ZWAY_LIB_DIR:$DYLD_LIBRARY_PATH;
#./compile.sh;
echo "Turn off on";
/home/pi/power_measurements_skirpts/program/turn_off_on.runable $1 $2;
