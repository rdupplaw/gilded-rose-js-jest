module.exports = class Shop {
  constructor (items = []) {
    this.items = items
    this._maxQuality = 50
    this._minQuality = 0
  }

  updateQuality () {
    this.items.forEach((item) => {
      if (/^Conjured.+/.test(item.name)) {
        this._updateConjuredItem(item)
      } else {
        switch (item.name) {
          case 'Aged Brie':
            this._updateAgedBrie(item)
            break
          case 'Backstage passes to a TAFKAL80ETC concert':
            this._updateBackstagePass(item)
            break
          case 'Sulfuras, Hand of Ragnaros':
            break
          default:
            this._updateItem(item)
            break
        }
      }
    })
    return this.items
  }

  _updateItem (item) {
    item.sellIn -= 1
    if (!this._isMinQuality(item)) {
      item.quality -= 1
    }
    if (this._isPastSellByDate(item) && !this._isMinQuality(item)) {
      item.quality -= 1
    }
  }

  _updateConjuredItem (item) {
    item.sellIn -= 1
    if (!this._isMinQuality(item)) {
      item.quality -= 1
    }
    if (!this._isMinQuality(item)) {
      item.quality -= 1
    }
    if (this._isPastSellByDate(item) && !this._isMinQuality(item)) {
      item.quality -= 1
    }
    if (this._isPastSellByDate(item) && !this._isMinQuality(item)) {
      item.quality -= 1
    }
  }

  _updateAgedBrie (item) {
    item.sellIn -= 1
    if (!this._isMaxQuality(item)) {
      item.quality += 1
    }
    if (this._isPastSellByDate(item) && !this._isMaxQuality(item)) {
      item.quality += 1
    }
  }

  _updateBackstagePass (item) {
    if (!this._isMaxQuality(item)) {
      item.quality += 1
    }
    if (item.sellIn < 11 && !this._isMaxQuality(item)) {
      item.quality += 1
    }
    if (item.sellIn < 6 && !this._isMaxQuality(item)) {
      item.quality += 1
    }
    item.sellIn -= 1
    if (this._isPastSellByDate(item)) {
      item.quality = 0
    }
  }

  _isMaxQuality (item) {
    return item.quality >= this._maxQuality
  }

  _isMinQuality (item) {
    return item.quality <= this._minQuality
  }

  _isPastSellByDate (item) {
    return item.sellIn < 0
  }
}
