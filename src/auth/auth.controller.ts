import {Controller, Get, Query , Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Response} from "express";
import {ConfigService} from "@nestjs/config";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService :ConfigService) {}

    @Get('confirmation')
    async mailConfirmation(@Query() params:any , @Res() response: Response){
        await this.authService.confirmUser(params.token);
        response.redirect(this.configService.get<string>('FRONTEND_URL'));
    }
}
