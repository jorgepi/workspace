FROM alpine:3.6

RUN \
apk add --no-cache mongodb && \
rm /usr/bin/mongoperf

RUN mkdir -p /mongodb/data/db && \
    mkdir -p /mongodb/certs && \
    mkdir -p /mongodb/config && \
    mkdir -p /mongodb/bin

VOLUME /mongodb/data/db
EXPOSE 27017 28017

COPY files/docker-entrypoint.sh /mongodb/bin/
COPY files/*.pem /mongodb/certs/
COPY files/mongod.conf /mongodb/config/
ENTRYPOINT [ "/mongodb/bin/docker-entrypoint.sh" ]
CMD [ "mongod" ]
