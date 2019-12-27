const { syncOperation } = require('./primes')

// single thread ~8 seconds
console.log('Single threaded!')

console.time('start')
const primes = syncOperation(0, 1e7)
console.log(primes.length)
console.timeEnd('start')

console.log('Hey, I am also here! doing some I/O')


