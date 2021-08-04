import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthGuard implements CanActivate {
  protected publicKey: string = fs.readFileSync(
    path.resolve(`${process.cwd()}/oauth.key.pub`),
    'utf8',
  );

  protected isTokenValid = true;

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let authorization: string;

    try {
      const request = context.switchToHttp().getRequest();

      authorization = request.header('authorization');
    } catch (e) {
      const ctx = GqlExecutionContext.create(context);
      authorization = ctx.getContext().req.header('authorization');
    }

    if (!authorization) {
      throw new UnauthorizedException();
    }

    this.verifyToken(AuthGuard.extractTokenFromHeaders(authorization));

    return this.isTokenValid;
  }

  private static extractTokenFromHeaders(authorization: string) {
    if (!authorization.includes('Bearer')) {
      throw new UnauthorizedException('Token is malformed.');
    }

    return authorization.replace('Bearer ', '');
  }

  private verifyToken(token: string): void {
    verify(token, this.publicKey, (err, payload) => {
      if (err) {
        console.log(err);
        this.isTokenValid = false;
        return;
      }

      this.isTokenValid = true;
      console.log(payload);
    });
  }
}
