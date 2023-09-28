import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  /**Creamos la injeccion para que cree en la BBDD, lo obtiene del pokemon entity que es el modelo a BBDD */
  constructor(
    /**Aca el name es de la extrucutura Pokemon no de su atributo */
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>){

  }

  async create(createPokemonDto: CreatePokemonDto) {
    /**Le cambiamos a minusc el nombre */
    createPokemonDto.name=createPokemonDto.name.toLowerCase();

    try {
      const pokemonNuevo=await this.pokemonModel.create(createPokemonDto);
      return pokemonNuevo;
    } catch (error) {
      /**Ejemplo, error de duplicado el nombre */
      /**Al probar sabemos q el 11000 es error de nombre duplicado pq salió en la consola */

      if(error.code===11000){
        console.log(error);
        throw new BadRequestException("Al paecer nombre duplicado, cambielo."+`Pokemon o Numero: ${createPokemonDto.name} - ${createPokemonDto.no}.  Error: ${JSON.stringify(error.keyValue)}`)

      }
      /**Seria otro numero de error.Mostrar en consola */
      console.log(error);
      throw new InternalServerErrorException(`Error al crear pokemon. Revisar error en logs.` + error);

    }


  }

  async findAll() {
    const pokemonNuevo=await this.pokemonModel.find();
    return pokemonNuevo;
  }

  async findOne(idRecibido: string){
    let pokemon:Pokemon;
    /**Buscamos por atribuuto no: */
    if(!isNaN(+idRecibido)){
      pokemon=await this.pokemonModel.findOne({no:idRecibido});
    }
    /**MongoId */
    /**Como es el id podemos buscarlo por findById */
    /**pokemon por si recibió un pokemon del async */
    if(!pokemon && isValidObjectId(idRecibido)){
      pokemon=await this.pokemonModel.findById(idRecibido)
    }
    /**Name de pokemon */
    if(!pokemon){
      pokemon=await this.pokemonModel.findOne({name:idRecibido.toLowerCase().trim()});

    }
    if(!pokemon){
      throw new NotFoundException(`No encontrado.Id :${idRecibido}.`);
    }
    return pokemon;
  }

  async update(idRecibido: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon:Pokemon;
    updatePokemonDto.name=updatePokemonDto.name.toLowerCase();
          try {
                  /**Buscamos por atribuuto no: */
                if(!isNaN(+idRecibido)){
                  pokemon=await this.pokemonModel.findOneAndUpdate({no:idRecibido},updatePokemonDto,{newValue:true});
                }
                    /**MongoId */
                /**Como es el id podemos buscarlo por findById */
                /**pokemon por si recibió un pokemon del async */
                if(!pokemon && isValidObjectId(idRecibido)){
                  pokemon=await this.pokemonModel.findByIdAndUpdate(idRecibido,updatePokemonDto,{newValue:true});
                }
          /*Esto seria si pudiera buscar por nombre, pero no deberia ser pq le pas cualuier nombre valido y lo cambiaria
                if(!pokemon){
                  pokemon=await this.pokemonModel.findOne({name:idRecibido.toLowerCase().trim()});

                }
          */
                if(!pokemon){
                  throw new NotFoundException(`No encontrado.Id :${idRecibido}.`);
                }
                return `This action updates a #${pokemon} pokemon`;
          } catch (error) {
              this.handlerExceptions(error);
          }





  }

  async remove(id: string) {
    let pokemon:Pokemon;
    //const pokemon=await this.findOne(id);

    //
    /**Ahora no va a pasar un numero de id o un nombre ya que hay un pipe que valida que sea un mongoIdValido */

      if(!isNaN(+id)){
        pokemon=await this.pokemonModel.findOneAndDelete({no:id},{newValue:true});
        return `This action removes a #${pokemon} pokemon`;
      }
      if(!pokemon && isValidObjectId(id)){
        const result=await this.pokemonModel.deleteOne({_id:id});
        const {deletedCount}=result;
        if(deletedCount===0){
          throw new BadRequestException(`Pokemon with id:${id} no existe`);

        }
        /**Si llega aca es pq borro bien y devuelve status 200 */
        return ;
      }



  }

  private handlerExceptions(error:any){
    if(error.code===11000){
      throw new BadRequestException(`Pokemon exists in bd with code ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Error al modificar datos. Puede ser que el id este mal o sea repetido.`)

  }
}
