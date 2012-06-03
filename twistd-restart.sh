#!/bin/bash

#logfile=/var/log/twistd-restart.log
#path=$1
#file=$2
#event=$3

#datetime=`date --rfc-3339=ns`
#echo "${datetime} Change made in path: " ${path} >> ${logfile}
#echo "${datetime} Change made to file: " ${file} >> ${logfile}
#echo "${datetime} Change made due to event: " ${event} >> ${logfile}

PID="`ps -e | grep twistd | awk {'print $1'}`"
echo "${datetime} Killing $PID" #>> ${logfile}
kill $PID
echo "${datetime} End" #>> ${logfile}

CMD="twistd -ny cyclone_server.tac"
echo "${datetime} Starting $CMD" #>> ${logfile}
bash -c "$CMD"
