node --inspect dist/server.js

curl -d '{"actor":{"id":"P:123","type":"Person"},"object":{"id":"Bot:123","type":"Bot"},"type":"Login"}' -H "Content-Type: application/json" -X POST http://localhost:3000/activity

curl -X GET "localhost:3000/activity" -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_all": {}
    }
}
'
