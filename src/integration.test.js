const fs = require('fs')

const Shop = require('./shop')
const Item = require('./item')

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Sulfuras, Hand of Ragnaros', -1, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
  new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
  new Item('Conjured Mana Cake', 3, 6)
]

const days = 30
const gildedRose = new Shop(items)

describe('Integration test', () => {
  it('Correctly calculates quality and sellIn over 30 days', () => {
    const expectedOutput = fs.readFileSync(`${__dirname}/expected_output.txt`).toString('utf-8')
    let actualOutput = ''

    for (let day = 0; day <= days; day += 1) {
      actualOutput += `-------- day ${day} --------`
      actualOutput += '\n'
      actualOutput += 'name, sellIn, quality'
      actualOutput += '\n'
      items.forEach((item) => {
        actualOutput += `${item.name}, ${item.sellIn}, ${item.quality}\n`
      })
      actualOutput += '\n'
      gildedRose.updateQuality()
    }

    expect(actualOutput).toBe(expectedOutput)
  })
})
