FROM node:4
COPY . /root/
RUN cd /root/; npm install --production
EXPOSE 1337
CMD ["npm", "start"]