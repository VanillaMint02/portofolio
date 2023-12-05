import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthGuardTypes } from '../auth.config';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthGuardTypes.Local) {}
