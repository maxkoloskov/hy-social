```
export ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDAwMDMsImlhdCI6MTY2ODM3NDQwMywiZXhwIjoxNjY4Mzc4MDAzfQ.c8aQh-Ibk_AIB4779-qQkwI4wIK57BRWN-L9Bgjx9Dc";
wrk \
  --latency \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -t 10 \
  -c 100 \
  -d 30s \
  http://localhost:3000/api/profiles/search?anthroponym=Si&limit=100
```
