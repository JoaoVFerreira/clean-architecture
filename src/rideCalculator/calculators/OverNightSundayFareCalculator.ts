import FareCalculator from "../interfaces/FareCalculator";
import Segment from "../Segment";

export default class OverNightSundayFareCalculator implements FareCalculator {
  private readonly FARE = 5
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}