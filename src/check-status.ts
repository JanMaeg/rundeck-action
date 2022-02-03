import * as core from '@actions/core'
import getExecutionStatus from './api/get-execution-status'
import timeoutPromise from './util/timeout-promise'

interface CheckStatus {
  executionId: string
  averageDuration?: number
}

/**
 * Sends API-Requests to Rundeck to check for the status of the job execution.
 * In the first round wait the average execution time after that query the status every 5000ms.
 * Doing this until the API answers with the status unequal to running or the maximum number
 * of checks has been reached.
 *
 * @param executionId
 * @param averageDuration
 */
async function checkStatus({
  executionId,
  averageDuration = 5000
}: CheckStatus): Promise<void> {
  const MAX_CHECK_COUNT = process.env.MAX_CHECK_AMOUNT ?? 10
  let checkCount = 0
  let status = 'running'
  let timeoutDuration = averageDuration

  core.info(
    `Checking status after average execution time of ${averageDuration}ms.`
  )

  while (status === 'running' && checkCount < MAX_CHECK_COUNT) {
    checkCount++

    core.info(
      `Waiting ${timeoutDuration}ms before checking again for execution status.`
    )

    await timeoutPromise(async () => {
      core.info('Checking execution status of job.')

      const response = await getExecutionStatus({ executionId })

      status = response.status

      core.info(`Execution status is ${status}`)
    }, timeoutDuration)

    if (checkCount === 1) {
      timeoutDuration = process.env.TIMEOUT_BETWEEN_STATUS_CHECK ?? 1000
    }
  }

  // Check if the Rundeck job itself failed
  if (status !== 'succeeded') {
    core.setFailed(`Job failed with status ${status}.`)
    return
  }

  core.info('Job execution successfully finished.')
}

export default checkStatus
