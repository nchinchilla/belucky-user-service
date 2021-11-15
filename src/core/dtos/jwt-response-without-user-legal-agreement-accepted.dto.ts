import { JwtResponseDto } from './jwt-response.dto';
import { Equals } from 'class-validator';

export class JwtWithoutLegalAgreementAcceptedResponseDto extends JwtResponseDto {
  @Equals(false)
  legalAgreementAccepted: boolean;
}
