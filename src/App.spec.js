import { shallowMount } from '@vue/test-utils';
import App from './App';

describe('App.vue', () => {
  let wrapper;

  describe('when rendered in default state', () => {
    beforeEach(() => {
      wrapper = shallowMount(App);
    });

    it('should render without error', () => {
      expect(wrapper.find('div')).toBeDefined();
    });
  });
});
