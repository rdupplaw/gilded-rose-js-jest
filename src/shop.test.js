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

    describe('when past sell by date', () => {
      it('decreases quality by 2', () => {
        const itemDouble = { quality: 10, sellIn: 0 };
        const shop = new Shop([itemDouble]);
        const items = shop.updateQuality();
        expect(items[0].quality).toBe(8);
      });
    });

    describe('when item is "Aged Brie"', () => {
      it('increases quality by 1', () => {
        const itemDouble = { name: 'Aged Brie', quality: 5 };
        const shop = new Shop([itemDouble]);
        const items = shop.updateQuality();
        expect(items[0].quality).toBe(6);
      });

      it('quality can\'t exceed 50', () => {
        const itemDouble = { name: 'Aged Brie', quality: 50 };
        const shop = new Shop([itemDouble]);
        const items = shop.updateQuality();
        expect(items[0].quality).toBe(50);
      });
    });
  });
});
