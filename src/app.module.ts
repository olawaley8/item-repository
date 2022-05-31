import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Item } from './entity/item.entity';


@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mylove123',
    database: 'item-repos',
    autoLoadEntities: true,
    synchronize: true
  
  }), TypeOrmModule.forFeature([Item]) ],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {}
