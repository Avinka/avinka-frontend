tsc && DEBUG=express:* node --inspect dist/server.js

### Activity queries ###

```bash
curl -d '{"actor":{"id":"P:123","type":"Person"},"object":{"id":"Bot:123","type":"Bot"},"type":"Login"}' -H "Content-Type: application/json" -X POST http://localhost:3000/activity
curl -X GET "localhost:3000/activity" -H 'Content-Type: application/json' -d'{"query": {"match_all": {}}}'
```

### Admin queries ###

```bash
curl -X GET "localhost:3000/admin/generateData"
curl -X GET "localhost:3000/admin/deleteData"
```

### Dashboard queries ###

```bash
curl "http://localhost:3000/dashboard/"
curl "http://localhost:3000/dashboard" -XPOST -d'{"name":"test"}' -H'content-type:application/json'
curl "http://localhost:3000/dashboard/5bb33aabd23dba7c102e8d0c/"
curl "http://localhost:3000/dashboard/5bb33aabd23dba7c102e8d0c/graph"
curl "http://localhost:3000/dashboard/5bb33aabd23dba7c102e8d0c/graph" -XPOST -d'{"_id":"5bb3551d42c7b37eb28e7ad5"}' -H'content-type:application/json'
```

### Graph queries ###

```bash
curl "http://localhost:3000/graph"
curl "http://localhost:3000/graph" -XPOST -d'{"name":"test"}' -H'content-type:application/json'
curl "http://localhost:3000/graph/5bb3552042c7b37eb28e7ad7"
curl "http://localhost:3000/graph/5bb3552042c7b37eb28e7ad7/dataseries"
curl "http://localhost:3000/graph/5bb3552042c7b37eb28e7ad7/graph" -XPOST -d'{"_id":"5bb3551d42c7b37eb28e7ad5"}' -H'content-type:application/json'
```
