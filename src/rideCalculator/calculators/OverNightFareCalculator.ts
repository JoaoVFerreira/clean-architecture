import FareCalculator from "../interfaces/FareCalculator";
import Segment from "../Segment";

export default class OverNightFareCalculator implements FareCalculator {
  private readonly FARE = 3.9
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}