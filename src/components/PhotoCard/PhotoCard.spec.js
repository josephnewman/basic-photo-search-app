import { shallowMount } from '@vue/test-utils';
import PhotoCard from './PhotoCard';

describe('PhotoCard.vue', () => {
  let wrapper;
  let image;

  describe('when passed expected image object', () => {
    beforeEach(() => {
      image = {
        url: 'https://foo.com',
        author: 'foo',
        id: 1
      };

      wrapper = shallowMount(PhotoCard, {
        propsData: { image }
      });
    });

    it('should have expected anchor href', () => {
      expect(wrapper.find('.photo-card__anchor').attributes('href')).toBe(
        image.url
      );
    });
  });
});
