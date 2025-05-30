const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const softSkillsRoutes = require('./routes/softskills');



const appointmentRoutes = require('./routes/appointmentRoutes');

const assessmentRoutes = require('./routes/assessment.routes');
const contactRoutes = require('./routes/contactRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
  res.send('API test route works');
});

// Middleware

app.use(cors());
app.use(express.json());
app.use(softSkillsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', appointmentRoutes);
app.use('/api', assessmentRoutes);
app.use('/api', contactRoutes);
app.use('/api', feedbackRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});


console.log('✅ server.js ready to listen');

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


