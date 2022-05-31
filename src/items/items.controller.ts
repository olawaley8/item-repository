import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Item } from 'src/entity/item.entity';
import { createItemDto } from './dto/create-items.dto';
import { ItemsService } from './items.service';

@ApiTags()
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Item> {
       return this.itemsService.findOne(id);

    }  
    
    @Post()
    createItem(@Body() createItemDto: createItemDto): Promise<Item> {
        return this.itemsService.createItem(createItemDto)
    }

    @Delete(':id')
    deleteItem(@Param('id') id: string): Promise<void> {
        return this.itemsService.deleteItem(id)
    }

    @Patch(':id')
    updateItem( @Param('id') id: string, @Body() createItemDto: createItemDto ): Promise<Item> {
        return this.itemsService.updateItem( id, createItemDto)
    }
    

   
}
