import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode(HttpStatus.OK)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':idRecibido')
  findOne(@Param('idRecibido') idRecibido: string) {
    return this.pokemonService.findOne(idRecibido);
  }

  @Patch(':idRecibido')
  update(@Param('idRecibido') idRecibido: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(idRecibido, updatePokemonDto);
  }

  /*Este usa un pipe personalizado */
  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
