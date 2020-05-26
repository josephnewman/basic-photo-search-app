import { mount } from '@vue/test-utils';
import Photos from './Photos';
import PHOTOS_MOCK from '../../../mocks/photosMock';
import PhotosApi from '../../services/PhotosApi';
import config from '../../constants/config';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

jest.useFakeTimers();

describe('Photos.vue', () => {
  let wrapper;
  let mockRandomPhotosResponse;
  let resolvePromise;
  let resolvedValue;
  let rejectPromise;
  let spy;

  describe('when photos loads in default state', () => {
    beforeEach(() => {
      wrapper = mount(Photos);

      mockRandomPhotosResponse = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      });

      spy = jest.spyOn(PhotosApi, 'getRandomPhotos').mockReturnValue(mockRandomPhotosResponse);
    });

    it('should render without issue', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should show loading spinner', () => {
      expect(wrapper.find('.photos__loading').exists()).toBe(true);
    });

    it('should call getRandomPhotos to get photos', () => {
      expect(spy).toHaveBeenCalledWith(config.DEFAULT_SEARCH_TERM, 1);
    });

    describe('when the api resolves with photos', () => {
      beforeEach(async () => {
        resolvedValue = PHOTOS_MOCK;
        resolvePromise(resolvedValue);
        wrapper = mount(Photos);
      });

      it('should NOT show loading spinner', () => {
        expect(wrapper.find('.photos__loading').exists()).toBe(false);
      });

      it('should have 2 photos', () => {
        expect(wrapper.findAll('.photos__card').length).toBe(2);
      });

      describe('when the user inputs a new value in the search field', () => {
        beforeEach(() => {
          wrapper.find('.photos__input').vm.$emit('text-input', 'foo');
        });

        it('should call getRandomPhotos to get photos with new value', () => {
          expect(spy).toHaveBeenCalledWith('foo', 1);
        });
      });

      describe('when the user scrolls but not to the bottom of the page', () => {
        beforeEach(() => {
          spy.mockClear();
          global.pageYOffset = 0;
          global.innerHeight = -200;
          global.body = { scrollTop: 0 };
          global.documentElement = { offsetHeight: 0, scrollTop: 0 };
          window.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }));
          jest.runAllTimers();
        });

        it('should call getRandomPhotos to get photos with incremented page number of 2', () => {
          expect(spy).toHaveBeenCalledTimes(0);
        });
      });

      describe('when the user scrolls to the bottom of the page', () => {
        beforeEach(() => {
          global.pageYOffset = 0;
          global.innerHeight = 0;
          global.body = { scrollTop: 0 };
          global.documentElement = { offsetHeight: 0, scrollTop: 0 };
          window.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }));
          jest.runAllTimers();
        });

        it('should call getRandomPhotos to get photos with incremented page number of 2', () => {
          expect(spy).toHaveBeenCalledWith(config.DEFAULT_SEARCH_TERM, 2);
        });

        describe('when the user scrolls to the bottom of the page during loading of another scroll', () => {
          beforeEach(() => {
            window.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }));
          });

          it('should NOT make anymore calls to getRandomPhotos', () => {
            expect(spy).toHaveBeenCalledWith(config.DEFAULT_SEARCH_TERM, 2);
          });
        });
      });
    });

    describe('when the api resolves with NO photos', () => {
      beforeEach(async () => {
        resolvePromise(null);
        wrapper = mount(Photos);
      });

      it('should NOT show loading spinner', () => {
        expect(wrapper.find('.photos__loading').exists()).toBe(false);
      });

      it('should have 2 photos', () => {
        expect(wrapper.findAll('.photos__card').length).toBe(0);
      });
    });

    describe('when the api resolves with NO photos', () => {
      beforeEach(async () => {
        rejectPromise(null);
        wrapper = mount(Photos);
      });

      it('should NOT show loading spinner', () => {
        expect(wrapper.find('.photos__loading').exists()).toBe(false);
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
