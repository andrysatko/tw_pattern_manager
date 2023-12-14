import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MailingService {
    private transporter: nodemailer.Transporter;
    private confirmationTemplate: handlebars.TemplateDelegate;
    private passwordResetTemplate: handlebars.TemplateDelegate;
    private groupInviteTemplate: handlebars.TemplateDelegate;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport(
            {
                host:'smtp.gmail.email',
                secure: false,
                service:'gmail',
                auth: {
                    user: configService.get<string>("MAIL_USER"),
                    pass: configService.get<string>("MAIL_PASSWORD"),
                },
            },
            {
                from: {
                    name: 'No-reply',
                    address: configService.get<string>("MAIL_FROM"),
                },
            },
        );

        // Load Handlebars templates
        this.confirmationTemplate = this.loadTemplate('../../templates/confirmation.hbs');
    }

    private loadTemplate(templateName: string): handlebars.TemplateDelegate {
        const templatesFolderPath = path.join(__dirname, '..', '..','./templates');
        const templatePath = path.join(templatesFolderPath, templateName);

        const templateSource = fs.readFileSync(templatePath, 'utf8');
        return handlebars.compile(templateSource);
    }

    async sendUserConfirmation(user: {firstName : string , lastName :string,email:string}, token: string) {
        const url = `${this.configService.get<string>("CLIENT_URL")}?token=${token}`;
        const html = this.confirmationTemplate({ name: user.firstName, surName: user.lastName, url });

        await this.transporter.sendMail({
            to: user.email,
            subject: `Welcome user! Confirm your Email`,
            html: html,
        });
    }

    // Other email sending methods...
}