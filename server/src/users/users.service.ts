import { CreateUserDto } from "./../dto/create-user.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Users } from "./users.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async createUser(userDto: CreateUserDto) {
    const newUser = await this.getUserByName(userDto.login);
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    if (newUser)
      throw new BadRequestException("Пользователь с таким логином уже есть");

    const createdUser = this.userRepository.create({
      ...userDto,
      password: hashPassword,
    });
    await this.userRepository.save(createdUser);
    return await this.generateToken(createdUser);
  }

  private async generateToken(user: Users) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserByName(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
