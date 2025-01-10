import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { Repository } from 'typeorm';
import { GenerateTokenDTO } from './token.dto';
import TokenEntity from './token.entity';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { NotFoundException } from 'src/error/not-found-error';
import { UserEntity } from 'src/user/user.entity';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from 'src/error/unauthorized-error';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private readonly TokenService: TokenService,
  ) {}
  async generateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
    refreshExpirationDate: Date;
  }> {
    const refreshExpirationDays = this.configService.get(
      'JWT_REFRESH_EXPIRATION_DAYS',
    );
    const refreshExpirationDate = addDays(new Date(), refreshExpirationDays);

    const accessExpirationDays = this.configService.get(
      'JWT_ACCESS_EXPIRATION_MINUTES',
    );
    const accessExpirationDate = addDays(new Date(), accessExpirationDays);
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: accessExpirationDays + 'd',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpirationDays + 'd',
      },
    );

    await this.storeToken({
      userId,
      accessToken,
      refreshToken,
      accessExpirationDate,
      refreshExpirationDate,
    });

    return {
      accessToken,
      refreshToken,
      refreshExpirationDate,
    };
  }
  async storeToken(data: GenerateTokenDTO): Promise<TokenEntity> {
    const checkToken = await this.tokenRepository.findOne({
      where: {
        user: {
          id: data.userId,
        },
      },
    });
    const getUser = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });

    if (checkToken) {
      checkToken.refreshToken = data.refreshToken;
      checkToken.refreshExpirationDate = data.refreshExpirationDate;
      checkToken.accessToken = data.accessToken;
      checkToken.accessExpirationDate = data.accessExpirationDate;
      checkToken.user = getUser;
      getUser.token = checkToken;
      await this.userRepository.save(getUser);
      return this.tokenRepository.save(checkToken);
    } else {
      const saveToken = await this.tokenRepository.save({
        ...data,
        user: getUser,
      });
      getUser.token = saveToken;
      await this.userRepository.save(getUser);
      return saveToken;
    }
  }

  async getTokenByAccessToken(token: string): Promise<TokenEntity> {
    return await this.tokenRepository.findOne({
      where: { accessToken: token },
    });
  }

  async deleteTokensByUserId(userId: string): Promise<SuccessMessageReturn> {
    const tokenToDelete = await this.tokenRepository.findBy({
      user: {
        id: userId,
      },
    });
    if (tokenToDelete) {
      this.tokenRepository.remove(tokenToDelete);
    }
    return {
      message: 'Tokens deleted successfully',
    };
  }

  async getTokensByUserId(userId: string): Promise<TokenEntity[]> {
    return await this.tokenRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async validateJwt(
    req: Request,
    res: Response,
  ): Promise<{
    sub: string;
    iat: number;
    exp: number;
  }> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Authorization Header');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedJwt = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      })) as {
        sub: string;
        iat: number;
        exp: number;
      };
      const checkToken = await this.getTokenByAccessToken(token);

      if (!checkToken) {
        throw new UnauthorizedException('Invalid Token');
      }
      return decodedJwt;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
