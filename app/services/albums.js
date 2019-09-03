const rp = require('request-promise');
const { api_url } = require('../../config').common.api_albums;
const { defaultError } = require('../errors');

const getAlbums = () =>
  rp({ uri: `${api_url}/albums`, json: true })
    .then(res => res)
    .catch(err => Promise.reject(defaultError(err.message)));

const getPhotos = id =>
  rp({ uri: `${api_url}/albums/${id}/photos`, json: true })
    .then(res => res)
    .catch(err => Promise.reject(defaultError(err.message)));

module.exports = { getAlbums, getPhotos };
