function syncOperation(start, end) {
	// calculate prime numbers between start and end
	const min = 2
	let isPrime = true;
	const primes = []
	for (let i = start; i < end; i++) {
		for (let j = min; j < Math.sqrt(end); j++) {
			if (i !== j && i % j === 0) {
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			primes.push(i);
		}
		isPrime = true;
	}
	return primes
}

module.exports = { syncOperation }