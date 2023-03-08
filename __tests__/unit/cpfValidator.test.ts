import { isValidCPF } from "../../src/cpf/cpfValidator";

const validCpfs = [
	"987.654.321-00",
	"714.602.380-01",
	"313.030.210-72",
	"144.796.170-60"
];
const invalidCpfs = [
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33",
	"444.444.444-44",
	"555.555.555-55",
	"666.666.666-66",
	"777.777.777-77",
	"888.888.888-88",
	"999.999.999-99",
	"987.654.321-01",
	"714.602.380-10",
	"313.030.210-70",
	"144.796.170-10"
];

describe('cpfValidator', () => {
	it.each(validCpfs)("Should test a valid cpf: %s", function (cpf: string) {
		const isValid = isValidCPF(cpf);
		expect(isValid).toBeTruthy();
	});
	it.each(invalidCpfs)("Should test an invalid cpf: %s", function (cpf: string) {
		const isValid = isValidCPF(cpf);
		expect(isValid).toBeFalsy();
	});
	it("Should validate a CPF with wrong size", function () {
		const isValid = isValidCPF("123");
		expect(isValid).toBeFalsy();
	});
})

