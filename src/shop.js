module.exports = class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case 'Aged Brie':
          this._updateAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this._updateBackstagePass(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        default:
          this._updateItem(item);
          break;
      }
    });
    return this.items;
  }

  _updateAgedBrie(item) {
    this._updateItem(item);
  }

  _updateBackstagePass(item) {
    this._updateItem(item);
  }

  _updateItem(item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality -= 1;
        }
      }
    } else if (item.quality < 50) {
      item.quality += 1;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1;
    }
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality -= 1;
            }
          }
        } else {
          item.quality -= item.quality;
        }
      } else if (item.quality < 50) {
        item.quality += 1;
      }
    }
  }
};
