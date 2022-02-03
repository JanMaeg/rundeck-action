import * as core from '@actions/core'
import { AxiosResponse } from 'axios'
import sendAPIRequest from './send-api-request'

interface ExecutionStatusRequest {
  executionId: string
}

interface ExecutionStatusResponse {
  status: string
}

async function getExecutionStatus({
  executionId
}: ExecutionStatusRequest): Promise<ExecutionStatusResponse> {
  const response: AxiosResponse = await sendAPIRequest({
    url: `execution/${executionId}`,
    method: 'GET'
  })

  if (response.status !== 200) {
    throw new Error(response.data.message)
  }

  const { data } = response

  core.info(JSON.stringify(data))

  return {
    status: data.status
  }
}

export default getExecutionStatus
