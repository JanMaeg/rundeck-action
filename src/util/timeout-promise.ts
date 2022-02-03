/**
 * Just a wrapper for the setTimeout function to be usable with promises.
 *
 * @param method
 * @param time
 */
async function timeoutPromise(method: Function, time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(async () => {
      await method()
      resolve()
    }, time)
  })
}

export default timeoutPromise
