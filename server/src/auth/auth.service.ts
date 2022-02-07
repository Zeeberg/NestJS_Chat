import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Users } from "../users/users.entity";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  private async generateToken(user: Users) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByName(userDto.login);

    if (!user)
      throw new BadRequestException("Пользователя с таким логином нет");

    const confirm = await bcrypt.compare(userDto.password, user.password);

    if (user && confirm) {
      return user;
    }

    throw new UnauthorizedException({
      message: "Некорректный Логин или Пароль",
    });
  }
}
