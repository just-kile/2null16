FROM node:4
COPY . /root/
RUN apt-get update && apt-get install -y \
        graphicsmagick
RUN cd /root/; npm install -q; npm run build
EXPOSE 1337
CMD cd /root/; npm start