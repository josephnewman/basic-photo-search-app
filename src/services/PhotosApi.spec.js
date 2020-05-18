import PhotosApi from './PhotosApi';
import Api from './Api';

describe('PhotosApi', () => {
  let mockApi;
  let resolveApi;
  beforeEach(() => {
    mockApi = jest.spyOn(Api, 'get').mockReturnValue(
      new Promise(resolvePromise => {
        resolveApi = resolvePromise;
      })
    );
  });

  describe('when getRandomPhotos is called', () => {
    let result;
    let page = '1';
    let query = 'florist';

    beforeEach(() => {
      result = PhotosApi.getRandomPhotos(query, 1);
    });

    test('should call the mock getRandomPhotos api with the expected url', () => {
      expect(mockApi).toHaveBeenCalledWith(
        `/api/&q=${query}&per_page=30&page=${page}`
      );
    });

    describe('when the api request is a success', () => {
      beforeEach(() => {
        resolveApi({ data: { hits: true } });
      });

      test('should return true', () => {
        expect(result).resolves.toBe(true);
      });
    });
  });
});
