import app from './src/app';
import { connectDB } from './src/config/database';
import { createServer } from 'http';
import { initializeSocket } from './src/utils/socket';

const PORT = process.env.PORT || 3000;

const httpServere = createServer(app);

initializeSocket(httpServere);

connectDB().then(() => {
  httpServere.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
