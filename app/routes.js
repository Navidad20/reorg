const userRouter = require('./routers/userRouter');
const courseRouter = require('./routers/courseRouter');
const taskRouter = require('./routers/taskRouter');
const authRouter = require('./routers/authRouter');

module.exports = (app, passport) => {

  // Routing for API check
  app.get('/', (req, res) => {
    res.json({ message: 'API Initialized!' });
  });

  app.use('/', authRouter(passport));
  app.use('/api/users', userRouter);
  app.use('/api/courses', courseRouter);
  app.use('/api/tasks', taskRouter);

  // Catch all other Api calls
  app.get('/api/*', (req, res) => { res.sendStatus(404); });
};