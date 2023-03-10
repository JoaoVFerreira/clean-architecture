import { Density } from "./density";
import { Volume } from "./volume";

const ONE_THOUSAND_KM = 1000

class Freight {
  constructor(
    private readonly distance: number = ONE_THOUSAND_KM,
    private readonly volume: Volume,
    private readonly density: Density
  ) {}

  public calculateFreight(): number {
    return this.distance * this.volume.getVolume() * this.density.getDensity()
  }
}

export { Freight };