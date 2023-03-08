import {
  NormalFareCalculatorHandler, 
  OverNightFareCalculatorHandler,
  OvernightSundayFareCalculatorHandler, 
  SpecialDayFareCalculatorHandler,
  SundayFareCalculatorHandler
} from '../../src/rideCalculator/handlers'
import Ride from "../../src/rideCalculator/Ride";

let ride: Ride;

describe('RideCalculator', () => {
  beforeEach(() => {
    const normalFareCalculator = new NormalFareCalculatorHandler();
    const overnightFareCalculator = new OverNightFareCalculatorHandler(normalFareCalculator);
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler(overnightFareCalculator);
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator);
    const specialDayCalculator = new SpecialDayFareCalculatorHandler(sundayFareCalculator);
    ride = new Ride(specialDayCalculator);
  });

  it("Should calculate a ride at the first day of the month", () => {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    expect(ride.calculateFare()).toBe(15);
  });
  
  it("Should calculate a regular ride", () => {
    ride.addSegment(10, new Date("2021-03-02T10:00:00"));
    expect(ride.calculateFare()).toBe(21);
  });
  
  it("Should calculate a night ride", () => {
    ride.addSegment(10, new Date("2021-03-02T23:00:00"));
    expect(ride.calculateFare()).toBe(39);
  });
})



