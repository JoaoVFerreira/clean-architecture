import FareCalculator from "../interfaces/FareCalculator";
import Segment from "../Segment";

export default class SundayFareCalculator implements FareCalculator {
  private readonly FARE = 2.9
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}