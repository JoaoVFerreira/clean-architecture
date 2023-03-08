export function isValidCPF (rawCpf: string): boolean {
	const cleanCpf = rawCpf.replace(/\D/g, ""); 
	if (isInvalidLength(cleanCpf)) return false;
	if (allDigitsTheSame(cleanCpf)) return false;
	const digit1 = calculateDigit(cleanCpf, 10);
	const digit2 = calculateDigit(cleanCpf, 11);
	const actualDigit = extractDigits(cleanCpf);  
	const validatedDigit = `${digit1}${digit2}`;
	return actualDigit === validatedDigit;
}

function calculateDigit (cpf: string, factor: number): number {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const rest = total % 11;
	return (rest < 2) ? 0 : 11 - rest;
}

function isInvalidLength (cpf: string): boolean {
	return cpf.length !== 11;
}

function allDigitsTheSame (cpf: string): boolean {
	const [firstDigit] = cpf;
	return [...cpf].every(digit => digit === firstDigit);
}

function extractDigits (cpf: string): string {
	return cpf.slice(9);
}