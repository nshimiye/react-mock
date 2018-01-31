# React Mock

Mocking api calls from React Applications, using Pretenderjs and Fakerjs.

# Simple Example usage

```javascript
import { Server, Faker, uid } from 'react-mock'
const endPoint = '/api/v1/guides'

const todoSchema = {
  author: Faker.internet.email(),
  content: () => Faker.lorem.sentence(),
  createdAt: () => Faker.date.past()
}

const requestHandler = (request, generator) => {
  const todoList = generator.next(10, todoSchema);
  return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)];
}

Server.mockGet(endPoint, requestHandler)
Server.on() // to start mocking <host>/api/v1/guides API
```

# Real use case

* Suppose you want to simulate the fetching of 10 guides
  * You know the **API Endpoint**
  * You know the **Format** of each guide object 
  * You know the **Format** of the Error response 

```javascript
// <app-root>/src/mock-server

import { Server, Faker, uid } from 'react-mock'

const apiRoute = '/api/v1/guides'
const requestHandler = (request, generator) => {
  const guides = generator.next(10); // @returns { <id1>: schema1, <id2>: schema2 }
  // const error = generator.error();
  return [200, { 'Content-Type': 'application/json' }, JSON.stringify(guides)];
}

const schema = {
  description: Faker.lorem.sentence(),
  createdAt: Faker.date.past(),
  favoredCount: Faker.random.number(),
  isPublic: random.boolean(),
  author: {
    id: uid.next().value,
    name: Faker.name.findName(),
    picture: Faker.internet.avatar()
  }
};

const errorFormat = {
  message: Faker.lorem.sentence()
}

Server.mockGet(apiRoute, requestHandler, schema, errorFormat)

Server.on() // @returns Promise that resolves with null or rejects with Error
// Server.off()
```