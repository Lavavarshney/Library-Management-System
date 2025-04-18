const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Issue = require('./models/Issue');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const studentRoutes = require('./routes/studentRoutes');
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

console.log('Socket.IO server initialized');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library_db').then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join', (studentId) => {
    socket.join(studentId);
    console.log(`Client ${socket.id} joined room ${studentId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Check overdue issues
setInterval(async () => {
  try {
    const currentDate = new Date();
    const overdueIssues = await Issue.find({
      due_date: { $lt: currentDate },
      return_date: null,
    }).populate({
      path: 'book_id',
      select: 'title book_id',
    });

    console.log('Checked overdue issues:', overdueIssues.length);
    for (const issue of overdueIssues) {
      if (!issue.book_id) {
        console.warn(`Invalid book_id for issue ${issue.issue_id}`);
        continue;
      }
      const notification = {
        issue_id: issue.issue_id,
        book_title: issue.book_id.title || 'Unknown Book',
        due_date: issue.due_date,
      };
      console.log(`Emitting to ${issue.student_id}:`, notification);
      io.to(issue.student_id).emit('notification', notification);
    }
  } catch (error) {
    console.error('Error checking overdue issues:', error);
  }
}, 60000);

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));