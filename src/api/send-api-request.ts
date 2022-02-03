import axios, { AxiosResponse, Method } from 'axios'

interface RundeckAPIRequest {
  urlParameter?: URLSearchParams
  url: string
  method?: Method
}

async function sendAPIRequest({
  urlParameter = new URLSearchParams(),
  url = '',
  method = 'POST'
}: RundeckAPIRequest): Promise<AxiosResponse> {
  urlParameter.append('authtoken', process.env.RUNDECK_AUTH_TOKEN)

  return axios.request({
    url: `${process.env.RUNDECK_URL}/api/18/${url}?${urlParameter.toString()}`,
    method
  })
}

export default sendAPIRequest
