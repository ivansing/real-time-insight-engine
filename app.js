import 'dotenv-flow/config';
import Server from './server/index.js';

const server = new Server();
server.start();
