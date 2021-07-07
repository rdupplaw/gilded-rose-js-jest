module.exports = class Shop {
  constructor (items = []) {
    this.items = items
    this._maxQuality = 50
    this._minQuality = 0
  }

  updateQuality () {
    this.items.forEach((item) => {
      if (this._isConjured(item)) {
        this._updateConjuredItem(item)
      } else if (item.name === 'Aged Brie') {
        this._updateAgedBrie(item)
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this._updateBackstagePass(item)
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        // do nothing
      } else {
        this._updateItem(item)
      }
    })
    return this.items
  }

  _updateItemSellIn (item) {
    item.sellIn -= 1
  }

  _updateItemQuality (item, qualityChange) {
    if (this._isPastSellByDate(item)) qualityChange *= 2
    if (item.quality + qualityChange > this._maxQuality) {
      item.quality = this._maxQuality
    } else if (item.quality + qualityChange < this._minQuality) {
      item.quality = this._minQuality
    } else {
      item.quality += qualityChange
    }
  }

  _updateItem (item, qualityChange = -1) {
    this._updateItemSellIn(item)
    this._updateItemQuality(item, qualityChange)
  }

  _updateConjuredItem (item) {
    this._updateItem(item, -2)
  }

  _updateAgedBrie (item) {
    this._updateItem(item, 1)
  }

  _updateBackstagePass (item) {
    this._updateItemSellIn(item)
    if (this._isPastSellByDate(item)) {
      item.quality = 0
    } else if (item.sellIn < 5) {
      this._updateItemQuality(item, 3)
    } else if (item.sellIn < 10) {
      this._updateItemQuality(item, 2)
    } else {
      this._updateItemQuality(item, 1)
    }
  }

  _isPastSellByDate (item) {
    return item.sellIn < 0
  }

  _isConjured (item) {
    return /^Conjured.+/.test(item.name)
  }
}
