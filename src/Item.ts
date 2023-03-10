import { Volume } from "./volume";

class Item {
  constructor(private distance: number, private volume: Volume, private density: number) {
    this.validateConstructor()
  }

  calculateFreight(): number {
    const densityValue = (this.density / 100);
    return this.distance * this.volume.getVolume() * densityValue
  }

  validateConstructor() {
    if (this.distance || this.volume || this.density < 0) {
      throw new Error(
        'It is not possible to build a class with negative values for one of them: distance, volume or density'
      );
    }
  }
}

export { Item };