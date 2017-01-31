// @flow
import winston from 'winston';

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'application-log.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'errors.log',
      level: 'error'
    })
  ]
});

export default logger;
