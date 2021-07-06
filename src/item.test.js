const Item = require('./item')

describe('Item', () => {
  let item

  beforeEach(() => {
    item = new Item('bar', 10, 20)
  })

  it('has a name property', () => {
    expect(item.name).toBe('bar')
  })

  it('has a sellIn property', () => {
    expect(item.sellIn).toBe(10)
  })

  it('has a quality property', () => {
    expect(item.quality).toBe(20)
  })
})
