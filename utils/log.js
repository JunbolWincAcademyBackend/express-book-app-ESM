import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(), //all log messages will be output as JSON
  defaultMeta: { service: 'bookstore-api' },
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
