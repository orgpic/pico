FROM node:argon

RUN apt-get update
RUN apt-get install -y build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev sharutils zlib1g-dev zip
RUN apt-get install -y make
RUN apt-get install -y gcc

RUN mkdir -p /picoShell
WORKDIR /picoShell
COPY PICO_README.md /picoShell

RUN touch .pico && echo "/picoShell" > .pico