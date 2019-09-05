const { healthCheck } = require('./controllers/healthCheck');
const albumController = require('./controllers/albums');
const userController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albumController.getAlbums);
  app.get('/albums/:id/photos', albumController.getPhotos);
  app.post('/users', userController.signUp);
};
