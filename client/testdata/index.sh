#!/bin/bash

curl -X DELETE "localhost:9200/$1"
curl -X PUT "localhost:9200/$1" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "doc": {
      "properties": {
        "last_updated": {
          "type":   "date",
          "format": "epoch_second"
        }
      }
    }
  }
}
'
echo
