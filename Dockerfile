FROM node:4
COPY . /root/
RUN add-apt-repository ppa:dhor/myway
RUN apt-get update && apt-get install -y \
        graphicsmagick
RUN cd /root/; npm install -q
EXPOSE 1337
CMD cd /root/; npm start