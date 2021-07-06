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
    item.sellIn -= 1;
    if (!this._isMaxQuality(item)) {
      item.quality += 1;
      if (this._isPastSellByDate(item) && !this._isMaxQuality(item)) {
        item.quality += 1;
      }
    }
  }

  _updateBackstagePass(item) {
    this._updateItem(item);
  }

  _updateItem(item) {
    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (!this._isMinQuality(item)) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality -= 1;
        }
      }
    } else if (!this._isMaxQuality(item)) {
      item.quality += 1;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          if (!this._isMaxQuality(item)) {
            item.quality += 1;
          }
        }
        if (item.sellIn < 6) {
          if (!this._isMaxQuality(item)) {
            item.quality += 1;
          }
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1;
    }
    if (this._isPastSellByDate(item)) {
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (!this._isMinQuality(item)) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality -= 1;
          }
        }
      } else {
        item.quality -= item.quality;
      }
    }
  }

  _isMaxQuality(item) {
    return item.quality >= 50;
  }

  _isMinQuality(item) {
    return item.quality <= 0;
  }

  _isPastSellByDate(item) {
    return item.sellIn < 0;
  }
};
