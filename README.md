# React Mock

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/nshimiye/react-mock.svg?branch=master)](https://travis-ci.org/nshimiye/react-mock)
[![Coverage Status](https://coveralls.io/repos/github/nshimiye/react-mock/badge.svg?branch=master)](https://coveralls.io/github/nshimiye/react-mock?branch=master)
[![Dev Dependencies](https://david-dm.org/nshimiye/react-mock/dev-status.svg)](https://david-dm.org/nshimiye/react-mock?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/nshimiye/react-mock.svg)](https://greenkeeper.io/)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/nshimiyetech)


Mocking api calls from React Applications, using Pretenderjs and Fakerjs.

# Simple Example usage

```javascript
import { Server, Faker, uid } from 'react-mock'
const endPoint = '/api/v1/todos'

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
Server.on() // to start mocking /api/v1/todos API
```

```javascript
axios.get('/api/v1/todos').then(({ data }) => {
  // data is an array of 10 todo objects
})
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
  isPublic: Faker.random.boolean(),
  author: {
    id: uid.next(),
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
