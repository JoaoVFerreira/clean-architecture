import FareCalculatorHandler from "../interfaces/FareCalculatorHandler";
import Segment from "../Segment";

export default class SundayFareCalculatorHandler implements FareCalculatorHandler {
	private readonly FARE = 2.9;
	next?: FareCalculatorHandler;

	constructor (next?: FareCalculatorHandler) {
		this.next = next;
	}

	handle(segment: Segment): number {
		if (!segment.isOvernight() && segment.isSunday()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.handle(segment);
	}

}