const albumService = require('../services/albums');

exports.getAlbums = (req, res, next) =>
  albumService
    .getAlbums(req)
    .then(albums => res.send(albums))
    .catch(next);

exports.getPhotos = (req, res, next) => {
  const albumId = req.params.id;
  albumService
    .getPhotos(albumId)
    .then(photos => res.send(photos))
    .catch(next);
};
