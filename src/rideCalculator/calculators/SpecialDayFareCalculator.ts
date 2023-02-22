import FareCalculator from "../interfaces/FareCalculator";
import Segment from "../Segment";

export default class SpecialDayFareCalculator implements FareCalculator {
  private readonly FARE = 1
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}