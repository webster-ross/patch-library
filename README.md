# Patch Library API

### Usage
Start service on port 3000:
``` 
$ docker-comose up
```

Stop service:
``` 
$ docker-comose down
```

### Endpoints
#### Get auth token
``` 
$ curl -XPOST -H "Content-type: application/json" -d '{"email": "librarian@library.com", "password": "password"}' localhost:3000/tokens
```

#### Add book
``` 
curl -XPOST -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" -d '{"title": "Good Read", "isbn": "9780316707046"}' localhost:3000/books
```

#### Remove book
``` 
curl -XDELETE -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" localhost:3000/books/2
```

#### Get overdue books
``` 
curl -XGET -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" localhost:3000/books/overdue
```

#### Checkout book
``` 
curl -XPOST -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" localhost:3000/books/9780316707046/checkout
```

#### Return book
``` 
curl -XDELETE -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" 'localhost:3000/books/9780316707046/checkout'
```

#### Get all checked out books
``` 
curl -XGET -H 'X-Access-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxpYnJhcmlhbkBsaWJyYXJ5LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC9jZi82bk5qLktTdWZkenExdUJ5ZWVFemhzdXpYb0JpTW1RVFM1eFkuai5rVURnSGJ6VTdhIiwiZmlyc3RfbmFtZSI6Iklzb20iLCJsYXN0X25hbWUiOiJZdW5kdCIsInJvbGUiOiJsaWJyYXJpYW4iLCJjcmVhdGVkX2F0IjoiMjAyMC0wNS0xMVQxNDoxMjoxNS4yMjZaIn0sImlhdCI6MTU4OTIwNjg4NTA3OSwiZXhwIjoxNTg5MjA2ODg1OTc5fQ.Z_UWLgEUtAU14StXc-zPjTOMe27Uvn56KCGyBb4T8To' -H "Content-type: application/json" 'localhost:3000/books/checkout'
```


