# Gilded Rose

This is the [Gilded Rose kata](https://github.com/emilybache/GildedRose-Refactoring-Kata) in [JavaScript with Jest](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/main/js-jest).

## Approach

### Refactoring

I began by splitting the `Item` and `Shop` classes into separate files, then writing unit tests for each class. I also wrote an integration test which runs `updateQuality()` for thirty days (i.e. thirty times), saves the information for each day in a variable, then checks that variable at the end of the thirty days against the "Golden Master" (`expected_output.txt`).

I decided to refactor by splitting the logic for each type of item (aged brie, Sulfuras, backstage pass, and other) into separate methods. Each method is responsible only for knowing how one particular type of item should be modified.

The `updateQuality()` method contains a `switch` statement which checks the name of the item then calls the corresponding private method to modify its `quality` and `sellIn`.

I also refactored common conditionals into descriptively-named private methods like `_isMaxQuality` and `_isPastSellByDate` to make the code more readable and to make the intention of the conditionals clear.

I used ESLint with the Standard JavaScript style guide to automatically lint and format my code.

### Adding conjured items

The prior refactorings made it simple to add the conjured items feature. After updating the feature test and writing a unit test for the `Shop` class, I added an `if` before the switch statement in `updateQuality()` for conjured items. This called the corresponding `_updateConjuredItem()` private method, which is responsible for modifying conjured items.

After this I refactored the common logic for updating item quality into the `_updateItemQuality()` method. This method takes the normal quality change as an argument (e.g. -1 for most items, 1 for aged brie, -2 for conjured items) and updates the item's quality, taking into account `sellIn` and the maximum and minimum quality values. The update methods for each item type now use this abstract method to carry out their quality updates.

At this point I also changed the `switch` statement into an `if`/`else` statement. The conjured item conditional required an if statement to contain the RegExp test, which I couldn't fit cleanly into the `switch`, so I changed the whole thing to `if`/`else` because it looked cleaner and more readable.

### What I would do differently

I would redesign the `Shop.prototype.updateQuality()` method to just call `item.updateQuality()` for each item held in the shop. The items themselves should contain the logic for updating their own `quality` and `sellIn`, through their own `updateQuality()` method.

This could be achieved by putting an `updateQuality()` method in the `Item` class, containing the logic currently in `Shop.prototype._updateItem()`. For the special items like aged brie, there could be a subclass which implements its own specialised version of `updateQuality()`, containing the logic currently in `Shop.prototype._updateAgedBrie()`.

I didn't do it this way because the rules of the kata forbid modifying the `Item` class.

## Getting started

### Prerequisites

* Node.js
* npm

### Installation

```sh
npm install
```

## Usage

```javascript
// In Node.js REPL
const Shop = require('./src/shop')
const Item = require('./src/item')

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6)
]

const gildedRose = new Shop(items)

gildedRose.updateQuality()
// output:
// [
//   Item { name: '+5 Dexterity Vest', sellIn: 9, quality: 19 },
//   Item { name: 'Aged Brie', sellIn: 1, quality: 1 },
//   Item { name: 'Elixir of the Mongoose', sellIn: 4, quality: 6 },
//   Item { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
//   Item { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 14, quality: 21 },
//   Item { name: 'Conjured Mana Cake', sellIn: 2, quality: 5 }
// ]
```

### Running tests

```sh
npm test
```

To generate test coverage report:

```sh
npm run test:coverage
```
