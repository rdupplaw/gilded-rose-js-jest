const Shop = require('./shop');

describe('Shop', () => {
  describe('.prototype.updateQuality', () => {
    it('decreases item quality by 1', () => {
      const itemDouble = { quality: 10 };
      const shop = new Shop([itemDouble]);
      const items = shop.updateQuality();
      expect(items[0].quality).toBe(9);
    });

    it('decreases sell in by 1', () => {
      const itemDouble = { sellIn: 20 };
      const shop = new Shop([itemDouble]);
      const items = shop.updateQuality();
      expect(items[0].sellIn).toBe(19);
    });

    it('quality can\'t be decreased below 0', () => {
      const itemDouble = { quality: 0 };
      const shop = new Shop([itemDouble]);
      const items = shop.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    describe('when passed sell by date', () => {
      it('decreases quality by 2', () => {
        const itemDouble = { quality: 10, sellIn: 0 };
        const shop = new Shop([itemDouble]);
        const items = shop.updateQuality();
        expect(items[0].quality).toBe(8);
      });
    });
  });
});
