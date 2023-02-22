import FareCalculator from "../interfaces/FareCalculator";
import Segment from "../Segment";

export default class NormalFareCalculator implements FareCalculator {
  private readonly FARE = 2.1
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}