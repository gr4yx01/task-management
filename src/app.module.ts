import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { TaskNotificationsModule } from './task_notifications/task_notifications.module';
import { TaskHistoryModule } from './task_history/task_history.module';
import { UserInvitationsModule } from './user_invitations/user_invitations.module';
import { UserWorkspacesModule } from './user_workspaces/user_workspaces.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'database/datasource';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import authConfig from 'config/auth.config';
import { AuthenticationGuard } from './auth/guard/authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WorkspacesModule,
    TasksModule,
    CommentsModule,
    TaskNotificationsModule,
    TaskHistoryModule,
    UserInvitationsModule,
    UserWorkspacesModule,
    RolesModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => {
        if (!dataSource.isInitialized) {
          return dataSource.initialize();
        }

        return dataSource;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authConfig],
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
