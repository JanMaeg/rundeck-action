import * as core from '@actions/core'
import checkStatus from './check-status'
import executeJob from './api/execute-job'

async function run(): Promise<void> {
  try {
    const jobId: string = core.getInput('job_id')
    const waitUntilFinished: boolean =
      core.getInput('wait_until_finished') === 'true'

    const response = await executeJob({ jobId })

    if (waitUntilFinished) {
      await checkStatus({
        executionId: response.executionId,
        averageDuration: response.averageDuration
      })
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
