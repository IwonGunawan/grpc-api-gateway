import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name : AUTH_SERVICE_NAME, 
        transport : Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME, 
          protoPath: 'node_modules/grpc-proto/proto/auth.proto'
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports: [AuthService]
})
export class AuthModule {}
