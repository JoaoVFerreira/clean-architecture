import FareCalculatorHandler from "../interfaces/FareCalculatorHandler";
import Segment from "../Segment";

export default class OvernightSundayFareCalculatorHandler implements FareCalculatorHandler {
	private readonly FARE = 5;
	next?: FareCalculatorHandler;

	constructor (next?: FareCalculatorHandler) {
		this.next = next;
	}

	handle(segment: Segment): number {
		if (segment.isOvernight() && segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.handle(segment);
	}

}