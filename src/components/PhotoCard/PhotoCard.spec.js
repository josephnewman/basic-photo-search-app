import { shallowMount } from '@vue/test-utils';
import PhotoCard from './PhotoCard';

describe('PhotoCard.vue', () => {
  let wrapper;
  let image;

  describe('when passed expected image object', () => {
    beforeEach(() => {
      image = {
        webformatURL: 'https://foo.com',
        user: 'foo',
        id: 1
      };

      wrapper = shallowMount(PhotoCard, {
        propsData: { image }
      });
    });

    it('should have expected anchor href', () => {
      expect(wrapper.find('.photo-card__anchor').attributes('href')).toBe(
        image.pageURL
      );
    });

    it('should have expected image src', () => {
      expect(wrapper.find('.photo-card__img').attributes('src')).toBe(
        image.webformatURL
      );
    });

    it('should have expected image alt', () => {
      expect(wrapper.find('.photo-card__img').attributes('alt')).toBe(
        image.user
      );
    });

    it('should have expected author text', () => {
      expect(wrapper.find('.photo-card__author').text()).toBe(image.user);
    });
  });
});
