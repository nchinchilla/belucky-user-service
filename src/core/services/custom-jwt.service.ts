import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BadTokenException } from '../exceptions/bad-token.exception';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { JwtWithoutLegalAgreementAcceptedResponseDto } from '../dtos/jwt-response-without-user-legal-agreement-accepted.dto';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(infoToSign: { userId; username }) {
    return this.jwtService.sign(infoToSign);
  }

  getUserFromJwtInRequest(request): JwtResponseDto {
    const jwt = this.getJwtFromRequest(request);
    const userInJwt: JwtResponseDto = this.jwtService.verify(jwt);

    return userInJwt;
  }

  getUserFromJwtWithoudLegalAgreementAcceptedInRequest(
    request,
  ): JwtResponseDto {
    const jwt = this.getJwtFromRequest(request);
    const userInJwt: JwtResponseDto = this.jwtService.verify(jwt);
    this.checkIfDecodedJwtHasRequiredData(
      userInJwt,
      JwtWithoutLegalAgreementAcceptedResponseDto,
    );
    return userInJwt;
  }

  getJwtFromRequest(request): string {
    const authHeader =
      request?.headers?.authorization ||
      request?.headers?.Authorization ||
      request?.body?.authorization;
    if (authHeader == null) {
      throw new UnauthorizedException();
    }
    const jwt = authHeader.replace('Bearer ', '');

    if (jwt == null) {
      throw new UnauthorizedException();
    }
    return jwt;
  }

  checkIfDecodedJwtHasRequiredData(
    decodedToken: JwtResponseDto,
    JwtClassToValidate,
  ): boolean {
    const jwtToken = plainToClass(JwtClassToValidate, decodedToken);
    const jwtErrors = validateSync(jwtToken);
    if (jwtErrors.length > 0) {
      throw new BadTokenException();
    }
    return true;
  }

  getJwt(userId: number, username: string): string {
    const signedJwt = this.sign({ userId, username });

    return signedJwt;
  }
}
