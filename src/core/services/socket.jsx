import socketioClient from 'socket.io-client';

export default (opts) => {
  if (!opts || !opts.url) {
    throw new Error('You must specify option.url to use the socket service.');
  }

  return socketioClient(url, opts);
}
