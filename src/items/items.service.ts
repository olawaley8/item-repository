import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entity/item.entity';
import { createItemDto } from './dto/create-items.dto';
import {Repository} from 'typeorm'

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item) 
        private itemsRepository: Repository<Item>
    ){}

    findAll(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    async findOne(id: string): Promise<Item>{
        return await this.itemsRepository.findOne(id)
    }

    async createItem(createItemDto: createItemDto): Promise<Item> {
        const newItem= this.itemsRepository.create(createItemDto);

        return await this.itemsRepository.save(newItem)
  
    }

    async deleteItem(id: string): Promise<void> {
        await this.itemsRepository.delete(id)
        
    }



    async updateItem (id: string, attrs: Partial<Item>) {
        const item= await this.findOne(id)

        if(!item){
            throw new NotFoundException('item not found')
        }
        Object.assign(item, attrs)
        return this.itemsRepository.save(item)

    }
}





