CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(60) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL NOT NULL PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE urls (
    id SERIAL NOT NULL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" DATE NOT NULL DEFAULT NOW(),
    views INTEGER NOT NULL DEFAULT 0
);