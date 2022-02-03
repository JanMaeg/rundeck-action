declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RUNDECK_AUTH_TOKEN: string
      RUNDECK_URL: string
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      TIMEOUT_BETWEEN_STATUS_CHECK: number
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      MAX_CHECK_AMOUNT: number
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
