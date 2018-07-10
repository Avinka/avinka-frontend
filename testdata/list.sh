#!/bin/bash

curl -XGET 'localhost:9200/'$1'/_search?scroll=10m&size=50' -d '
{
    "query" : {
        "match_all" : {}
    }
}'
echo
