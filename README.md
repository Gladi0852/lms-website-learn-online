After downloading--

1.Set Up the Backend

cd ./online-learning-backend
npm install

Configure Environment Variables
Create a .env file in the backend directory.
Add the following variables (example):

PORT=8080
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
//this EMAIL_USER and EMAIL_PASS is for nodemailer, use the email id and it's app password

npm start



2. Set Up the Frontend

cd ./online-learning-website
npm install


npm run dev
Enjoy
