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

    beforeEach(() => {
      result = PhotosApi.getRandomPhotos(1);
    });

    test('should call the mock getRandomPhotos api with the expected url', () => {
      expect(mockApi).toHaveBeenCalledWith(`/v2/list?page=${page}`);
    });

    describe('when the api request is a success', () => {
      beforeEach(() => {
        resolveApi({ data: true });
      });

      test('should return true', () => {
        expect(result).resolves.toBe(true);
      });
    });
  });
});
