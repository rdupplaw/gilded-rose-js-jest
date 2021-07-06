const Shop = require('./shop');

describe('Shop', () => {
  describe('.prototype.updateQuality', () => {
    it('decreases item quality by 1', () => {
      const itemDouble = { quality: 10 };
      const shop = new Shop([itemDouble]);
      const items = shop.updateQuality();
      expect(items[0].quality).toBe(9);
    });
  });
});
