FROM node:argon

RUN apt-get update
RUN apt-get install -y build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev
RUN apt-get install -y make
RUN apt-get install -y gcc

RUN mkdir -p /picoShell
WORKDIR /picoShell

RUN touch .pico && echo "/picoShell" > .pico