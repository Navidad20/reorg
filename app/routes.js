const teacherRouter = require('./routers/teacherRouter');
// const studentRouter = require();
// const taskRouter = require();

module.exports = (app) => {

  // Routing for API check
  app.get('/', (req, res) => {
    res.json({ message: 'API Initialized!' });
  });

  // Catch all other Api calls
  app.get('/api/*', (req, res) => { res.sendStatus(404); });
};