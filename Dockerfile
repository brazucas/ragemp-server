FROM debian:latest

MAINTAINER Pedro Papadópolis

EXPOSE 22005
EXPOSE 22006/udp

CMD mkdir /ragemp

WORKDIR /ragemp

ADD * /ragemp/

ENTRYPOINT /ragemp/server

VOLUME /ragemp