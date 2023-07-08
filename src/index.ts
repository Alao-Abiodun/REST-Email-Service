import app from './app';
import dotenv from 'dotenv';
dotenv.config();

( () => {
    console.clear();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})();