import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.service.findAll();
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.service.findById(id);
    }
    @Get(':username')
    findByUsername(@Param('username') username: string): Promise<User> {
        return this.service.findByUsername(username);
    }
    @Post()
    create(@Body() user: User): Promise<User> {
        return this.service.create(user);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.remove(id);
    }
}