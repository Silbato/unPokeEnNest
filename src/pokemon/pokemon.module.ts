import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  /**Aca Pokemon.name hace referencia a la extension de Document, no al atributo interno del POkemon */
  /**Importamos COnfigModule que usa pokemon.service en su constructor */
  imports:[ConfigModule,MongooseModule.forFeature([{name:Pokemon.name,schema:PokemonSchema}])],
  /**Este lo expportamos asi pq seed.Service usa la entridad pokemon para poder guardar con su entity, se exporta asi ya que tiene los parametros definidos arriba */
  /**En Seed:Module hay que importarlos */
  exports:[MongooseModule]
})
export class PokemonModule {}
