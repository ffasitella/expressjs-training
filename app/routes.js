const { healthCheck } = require('./controllers/healthCheck');
const albumController = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albumController.getAlbums);
  app.get('/albums/:id/photos', albumController.getPhotos);
};
