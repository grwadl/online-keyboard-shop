import {
  Configuration,
  EmailMessageData,
  EmailsApi
} from '@elasticemail/elasticemail-client-ts-axios'
import { Injectable } from '@nestjs/common'

type SendEmailProps = {
  html: string
  recipients: EmailMessageData['Recipients']
  subject: string
}

@Injectable()
export class EmailService {
  private readonly emailApi: EmailsApi
  constructor() {
    const config = new Configuration({
      apiKey: process.env.MAIL_TOKEN
    })
    this.emailApi = new EmailsApi(config)
  }

  async sendEmail({
    html,
    recipients,
    subject
  }: SendEmailProps): Promise<unknown> {
    const sendMessageOptions: EmailMessageData = {
      Recipients: recipients,
      Content: {
        Body: [
          {
            ContentType: 'HTML',
            Content: html,
            Charset: 'utf8'
          }
        ],
        From: process.env.FROM_EMAIL,
        Subject: subject
      }
    }

    return this.emailApi.emailsPost(sendMessageOptions)
  }
}
