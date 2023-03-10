import { Item } from '../src/Item'

describe('Item', () => {
  it('Should exist', () => {
    expect(Item).toBeDefined();
  })

  it('Should instatiate a Item class', () => {
    const item = new Item(20, 5, 12);
    expect(item).toBeDefined()
  })

  it('Should throw an erro when trying to instatiate a Item with negative values', () => {
    expect(() => new Item(20, -5, 12)).toThrow(
      new Error(
        'It is not possible to build a class with negative values for one of them: distance, volume or density'
      )
    )
  })
})