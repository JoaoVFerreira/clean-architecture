import { 
  NormalFareCalculator,
  SpecialDayFareCalculator,
  OverNightFareCalculator,
  OverNightSundayFareCalculator,
  SundayFareCalculator
} from "./calculators";
import Segment from "./Segment";


export default class FareCalculatorFactory {
	static create (segment: Segment) {
		if (segment.isSpecialDay()) {
			return new SpecialDayFareCalculator();
		}
		if (segment.isOvernight() && !segment.isSunday()) {
			return new OverNightFareCalculator();
		}
		if (segment.isOvernight() && segment.isSunday()) {
			return new OverNightSundayFareCalculator();
		}
		if (!segment.isOvernight() && segment.isSunday()) {
			return new SundayFareCalculator();
		}
		if (!segment.isOvernight() && !segment.isSunday()) {
			return new NormalFareCalculator();
		}
		throw new Error();
	}
}