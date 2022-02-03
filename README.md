# Rundeck Github Action

This Action allows you to trigger rundeck jobs and wait until they are finished

## Inputs

## `job_id`

**Required** The id of the job to execute.

## `wait_until_finished`

**Optional** "true" or "false". Whether the action should wait for the job to finish or not. Default `"true"`.

## Env-Variables

## `RUNDECK_AUTH_TOKEN`

Token to authenticate with rundeck.

## `RUNDECK_URL`

URL to the rundeck api. Without `/api/` and trailing slash. E.g. `https://rundeck.domain.de`

## `TIMEOUT_BETWEEN_STATUS_CHECK`

Timeout between status checks after the average runtime has been waited.

Requires: `number in ms` \
Default: `1000`ms

## `MAX_CHECK_AMOUNT`

Max times the status will be checked. If after MAX_CHECK_COUNT checks the status is still not finished the job will
simply succeed.

Requires: `number` \
Default: `10`

## Example usage
```
uses: JanMaeg/rundeck-action@v1.0
with:
    job_id: 'a7fcd4fa-7717-11ec-90d6-0242ac120003'
    wait_until_finished: "true"
env:
  RUNDECK_AUTH_TOKEN: ${{ secrets.RUNDECK_API_TOKEN }}
  RUNDECK_URL: "https://rundeck.domain.de"
  TIMEOUT_BETWEEN_STATUS_CHECK: 500
```