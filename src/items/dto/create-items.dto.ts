import { ApiProperty } from "@nestjs/swagger";


export class createItemDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty({required: false})
    readonly description?: string;

    @ApiProperty()
    readonly qty: number;
}