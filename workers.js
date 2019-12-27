const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const { syncOperation } = require('./primes')
const THREAD_COUNT = 2
const max = 1e7

if (isMainThread) {
	// fork threads here
	const threads = new Set()
	let primes = []

	console.time('start')
	console.log(`Running with ${THREAD_COUNT} threads..`)


	// create 2 threads, 1 to calculate primes from 0 to x/2, other from x/2 to x
	// should have used a loop here to scale

	threads.add(new Worker(__filename, { workerData: { start: 0, end: max / 2 } }))
	threads.add(new Worker(__filename, { workerData: { start: max / 2, end: max } }))


	for (const worker of threads) {
		worker.on('error', (err) => { throw err })

		worker.on('exit', () => {
			threads.delete(worker)

			console.log(`Thread exiting, ${threads.size} running...`)
			if (threads.size === 0) {
				console.log(primes.length)
				console.timeEnd('start')
			}
		})

		// return value will be the array we return from each thread
		worker.on('message', (msg) => {
			primes = primes.concat(msg)
		})
	}

	console.log('Hey, I am also here! doing some I/O')
	// continue doing I/O here as main thread is free!!

} else {
	// every time the thread is called, with the given values return primes
	const { threadId } = require('worker_threads')
	console.log(`~!Thread ${threadId}`)
	const primes = syncOperation(workerData.start, workerData.end)
	parentPort.postMessage(primes)
}