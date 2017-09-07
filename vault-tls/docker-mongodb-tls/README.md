# docker-alpine-mongo

This repository contains Dockerfile for [MongoDB 3.4](https://www.mongodb.org)
container, based on the [Alpine 3.6](https://hub.docker.com/_/alpine/) image.

## Install

As a prerequisite, you need [Docker](https://docker.com) to be installed.

To re-build this image from the dockerfile:

	$ docker build -t client/mongodb .

## Usage

To run `mongod`:

	$ docker run -d --name mongodb -p 27017:27017 client/mongodb

You can also specify the database repository where to store the data
with the volume -v option:

    $ docker run -d --name mongo -p 27017:27017 \
	  -v /somewhere/onmyhost/mydatabase:/mongodb/data/db \
	  client/mongodb

To run a shell session:

    $ docker exec -ti mongodb sh

## TLS/SSL 

This image is configured with TLS/SSL certificates generated from Vault. To be able to connect from any client you will need to set the SSL config:

	$ mongo --ssl --sslPEMKeyFile /mongodb/certs/mongodb-cert.pem --sslCAFile /mongodb/certs/mongodb-ca.pem --host mongodb.client.com

or (in case you want to authenticate with a client side cert)

	$ mongo --ssl --sslPEMKeyFile /mongodb/certs/mongodb-client-cert.pem --sslCAFile /mongodb/certs/mongodb-ca.pem --host mongodb.client.com

Here an example about how to generate users with x509 authentication:

db.getSiblingDB("$external").runCommand(
  {
    createUser: "CN=mongo-client",
    roles: [
             { role: 'readWrite', db: 'admin' },
             { role: 'userAdminAnyDatabase', db: 'admin' }
           ],
    writeConcern: { w: "majority" , wtimeout: 5000 }
  }
)

db.getSiblingDB("$external").auth(
  {
    mechanism: "MONGODB-X509",
    user: "CN=mongo-client"
  }
)
