import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import Email from 'src/common/types/email';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: +this.configService.get('SMTP_PORT'),
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendMail(payload: Email) {
    const { to, subject, text, html } = payload;

    try {
      const info = await this.transporter.sendMail({
        from: `"No Reply" <${this.configService.get('EMAIL_FROM') ?? ''}>`,
        to,
        subject,
        text,
        html,
      });

      return { messageId: info.messageId }
    } catch (error) {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
}
