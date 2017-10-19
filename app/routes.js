const userRouter = require('./routers/userRouter');
// const studentRouter = require();
// const taskRouter = require();

module.exports = (app) => {

  // Routing for API check
  app.get('/', (req, res) => {
    res.json({ message: 'API Initialized!' });
  });

  app.get('/test', (req, res) => { res.sendStatus(200); });
  app.use('/api/users', userRouter);

  // Catch all other Api calls
  app.get('/api/*', (req, res) => { res.sendStatus(404); });
};