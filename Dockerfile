FROM node:4
COPY . /root/
RUN cd /root/; npm install
EXPOSE 1337
RUN cd /root/; npm start