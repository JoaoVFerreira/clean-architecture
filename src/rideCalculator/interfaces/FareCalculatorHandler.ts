import Segment from "../Segment";

export default interface FareCalculatorHandler {
  next?: FareCalculatorHandler;
  handle(segment: Segment): number
}