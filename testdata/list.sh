#!/bin/bash

echo
curl -XGET 'localhost:9200/'$1'/_search?scroll=10m&size=50' -H'Content-Type: application/json' -d '
{
    "query" : {
        "match_all" : {}
    }
}'
echo
