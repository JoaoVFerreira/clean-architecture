import FareCalculatorHandler from '@src/rideCalculator/interfaces/FareCalculatorHandler';
import Segment from './Segment';

export default class Ride {
  private readonly MIN_FARE = 10;
  segments: Segment[];

  constructor(readonly fareCalculatorHandler: FareCalculatorHandler) {
    this.segments = [];
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare(): number {
    let fare = 0;
    this.segments.forEach(segment => (fare += this.fareCalculatorHandler.handle(segment)));
    return fare < this.MIN_FARE ? this.MIN_FARE : fare;
  }
}
