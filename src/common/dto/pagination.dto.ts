import { IsOptional, IsPositive, Min, IsNumber } from 'class-validator';

export class PaginationDto{
    /**Este DTO lo usamos para hacer conusltas en el findAll que se usa en @Query y guarda los params */
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(0)
limit?:number;
    @IsPositive()
    @IsOptional()
    @IsNumber()
offset?:number;
}