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
        try{
            return this.itemsRepository.find();
        }
        catch(err){
            throw err;
        }
    }

    async findOne(id: string): Promise<Item>{
        try{

            const item = await this.itemsRepository.findOne(id)
            if(!item){
                throw new NotFoundException('item not found')
            }
            return item;
        }
        catch(err){
            throw err;
        }
    }

    async createItem(createItemDto: createItemDto): Promise<Item> {
        try{
            const newItem= this.itemsRepository.create(createItemDto);
            return await this.itemsRepository.save(newItem)
        }
        catch(err){
            throw err;
        }
  
    }

    async deleteItem(id: string): Promise<void> {
       try{
        const result= await this.itemsRepository.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`The item with id '${id}' does not exist`)
        }
       } 
       catch (err){
           throw err;
       }
        
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





