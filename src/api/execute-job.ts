import * as core from '@actions/core'
import { AxiosResponse } from 'axios'

import sendAPIRequest from './send-api-request'

interface ExecuteJobRequest {
  jobId: string
}

interface ExecuteJobResponse {
  jobName: string
  averageDuration: number
  executionId: string
  link: string
}

async function executeJob({
  jobId
}: ExecuteJobRequest): Promise<ExecuteJobResponse> {
  const response: AxiosResponse = await sendAPIRequest({
    url: `job/${jobId}/run`
  })

  if (response.status !== 200) {
    throw new Error(response.data.message)
  }

  const { data } = response

  core.info(JSON.stringify(data))

  core.info(
    `Job "${data.job.name}" has been successfully triggered. ${data.permalink}`
  )

  return {
    jobName: data.job.name,
    averageDuration: parseInt(data.job.averageDuration),
    executionId: data.id,
    link: data.permalink
  }
}

export default executeJob
