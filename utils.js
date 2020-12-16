export const Logger = {
  warn: (...args) => {
    console.warn("[adapter]", ...args)
  },
  log: (...args) => {
    console.log("[adapter warn]", ...args)
  }
}

export const APP_ID = '7e58b7e0d0654e22a87a8451fe67872d'
