import { registerAs } from '@nestjs/config';
import './env';

// set dummy origin for allow url
const origin = ['http://localhost:3999', 'http://localhost:3000'];

export default registerAs('cors', () => ({
  origin: origin,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Accept-Language',
    'X-Requested-With',
    'Origin',
  ],
  maxAge: 0,
  credentials: true,
}));
