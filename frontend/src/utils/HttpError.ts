interface HttpErrorOptions extends ErrorOptions {
  statusCode: number
  url: string
}

export class HttpError extends Error {
  message: string
  dateTime: Date
  statusCode: number
  url: string

  constructor(message: string, options: HttpErrorOptions) {
    const { statusCode, url, ...defaultOptions } = options
    super(message, defaultOptions)
    this.message = message
    this.dateTime = new Date()
    this.statusCode = statusCode
    this.url = url
  }
}
