# Base image from https://github.com/Disinterpreter/docker-ragemp/blob/master/Dockerfile

FROM debian:jessie

ENV RAGEMP 0.2

MAINTAINER Disinterpreter "disinterpreter@protonmail.ch" & Pedro Papadópolis

EXPOSE 20005
EXPOSE 22005/udp
EXPOSE 22006

RUN echo 'deb http://httpredir.debian.org/debian testing main contrib non-free' > /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y -t testing gcc wget && \
    apt-get clean

RUN useradd ragemp && \
    # Mountable volume
    mkdir /ragemp && \
    # Download and extract
    ADD server /tmp/
    mkdir /opt/x64/ && \
    mv /tmp/server /opt/x64/server

RUN chmod +x /opt/x64/server

RUN mkdir /ragemp

ADD start_server.sh /opt

ENTRYPOINT ["/opt/start_server.sh"]