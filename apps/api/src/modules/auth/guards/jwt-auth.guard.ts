import { AuthGuard } from '@nestjs/passport';
import { AuthGuardTypes } from '../auth.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthGuardTypes.JWT) {}
