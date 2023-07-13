import mailSenderWorker from './mail.kafka';

console.log('starting mail sender worker...')
mailSenderWorker.start();