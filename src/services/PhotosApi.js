import Api from './Api';

export default {
  getRandomPhotos: page => {
    return Api.get(`/v2/list?page=${page}`).then(res => res.data);
  }
};
