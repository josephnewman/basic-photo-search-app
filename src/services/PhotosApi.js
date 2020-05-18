import Api from './Api';

export default {
  getRandomPhotos: page => {
    return Api.get(`/api/&q=florist&per_page=30&page=${page}`).then(
      res => res.data.hits
    );
  }
};
