import { Volume } from './Volume';

class Density {
  constructor(private readonly weight: number, private readonly volume: Volume) {
    this.validateConstructor();
  }

  public getDensity(): number {
    return this.weight / this.volume.getVolume();
  }

  private validateConstructor() {
    if (this.weight || this.volume.getVolume() < 0) {
      throw new Error(
        'It is not possible to build a class with negative values for one of them: weight or volume'
      );
    }
  }
}

export { Density };