import Api from './Api';

export default {
  getRandomPhotos: (query, page) => {
    return Api.get(`/api/&q=${query}&per_page=30&page=${page}`).then(res => res.data.hits);
  }
};
