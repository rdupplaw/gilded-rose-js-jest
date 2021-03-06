const Shop = require('./shop')

describe('Shop', () => {
  it('items is empty by default', () => {
    const shop = new Shop()
    expect(shop.items).toBeInstanceOf(Array)
    expect(shop.items).toHaveLength(0)
  })

  describe('.prototype.updateQuality', () => {
    let itemDouble
    let shop
    let items

    beforeEach(() => {
      itemDouble = { quality: 10, sellIn: 20 }
      shop = new Shop([itemDouble])
      items = shop.updateQuality()
    })

    it('decreases item quality by 1', () => {
      expect(items[0].quality).toBe(9)
    })

    it('decreases sell in by 1', () => {
      expect(items[0].sellIn).toBe(19)
    })

    it('quality can\'t be decreased below 0', () => {
      for (let i = 0; i < 10; i += 1) {
        shop.updateQuality()
      }
      items = shop.updateQuality()
      expect(items[0].quality).toBe(0)
    })

    describe('when past sell by date', () => {
      it('decreases quality by 2', () => {
        itemDouble = { quality: 10, sellIn: 0 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
        expect(items[0].quality).toBe(8)
      })
    })

    describe('when item is "Aged Brie"', () => {
      it('increases quality by 1', () => {
        itemDouble = { name: 'Aged Brie', quality: 5 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
        expect(items[0].quality).toBe(6)
      })

      it('quality can\'t exceed 50', () => {
        itemDouble = { name: 'Aged Brie', quality: 50 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
        expect(items[0].quality).toBe(50)
      })

      describe('when past sell by date', () => {
        it('increases quality by 2', () => {
          itemDouble = { name: 'Aged Brie', sellIn: 0, quality: 30 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(32)
        })

        it('quality can\'t exceed 50', () => {
          itemDouble = { name: 'Aged Brie', sellIn: 0, quality: 49 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(50)
        })
      })
    })

    describe('when item is "Sulfuras, Hand of Ragnaros"', () => {
      beforeEach(() => {
        itemDouble = { name: 'Sulfuras, Hand of Ragnaros', sellIn: 20, quality: 80 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
      })

      it('does not change quality', () => {
        expect(items[0].quality).toBe(80)
      })

      it('does not change sell in', () => {
        expect(items[0].sellIn).toBe(20)
      })
    })

    describe('when item is "Backstage passes to a TAFKAL80ETC concert"', () => {
      describe('when more than 10 days before sell by date', () => {
        it('increases quality by 1', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 11, quality: 12 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(13)
        })

        it('quality can\'t exceed 50', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 11, quality: 50 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(50)
        })
      })

      describe('when when more than 5 but less than 10 days before sell by date', () => {
        it('increases quality by 2', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 10, quality: 23 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(25)
        })

        it('quality can\'t exceed 50', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 10, quality: 49 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(50)
        })
      })

      describe('when more than 0 but less than 5 days before sell by date', () => {
        it('increases quality by 3', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 5, quality: 6 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(9)
        })

        it('quality can\'t exceed 50', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 10, quality: 48 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(50)
        })
      })

      describe('when after sell by date', () => {
        it('decreases quality to 0', () => {
          itemDouble = { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 0, quality: 35 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(0)
        })
      })
    })

    describe('when item is conjured', () => {
      it('decreases quality by 2', () => {
        itemDouble = { name: 'Conjured Elixir of the Mongoose', quality: 15, sellIn: 10 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
        expect(items[0].quality).toBe(13)
      })

      it('quality can\'t go below 0', () => {
        itemDouble = { name: 'Conjured Elixir of the Mongoose', quality: 1, sellIn: 10 }
        shop = new Shop([itemDouble])
        items = shop.updateQuality()
        expect(items[0].quality).toBe(0)
      })

      describe('when past sell by date', () => {
        it('decreases quality by 4', () => {
          itemDouble = { name: 'Conjured Elixir of the Mongoose', quality: 15, sellIn: 0 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(11)
        })

        it('quality can\'t go below 0', () => {
          itemDouble = { name: 'Conjured Elixir of the Mongoose', quality: 3, sellIn: 0 }
          shop = new Shop([itemDouble])
          items = shop.updateQuality()
          expect(items[0].quality).toBe(0)
        })
      })
    })
  })
})
