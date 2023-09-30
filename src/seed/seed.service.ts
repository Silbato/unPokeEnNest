import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/poke-response-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  private readonly axios:AxiosInstance=axios;

  /**Esta el el contructor que copia parte del otro, para poder insertar por lote los pokemons q traigamos */
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly httpAdapterAxios:AxiosAdapter
  ){}

  async executeSeed(){
    const data= await this.httpAdapterAxios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    /**Borramos los datos de la collection Pokemons pq el id daria error */
    await this.pokemonModel.deleteMany({});

    /*
    const pokemonsToInsert:{name:string,no:number}[]=[];
    data.results.forEach(async ({name,url})=>{
      const segments=url.split('/');
      const no:number=+segments[segments.length-2];
      //Carga un arreglo con {name, no} de pokemons
      pokemonsToInsert.push({name,no});

    });
    //Inserta el array completo
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return `Seed Executed!`;
    */
       /**INSERCION POR LOTES */

    /**Creamos un arreglo de promesas */
    const insertPromisesArray=[];
    data.results.forEach(({name,url})=>{
      const segments=url.split('/');
      const no:number=+segments[segments.length-2];
      /**Agregarmos todos los items que tardan al arreglo de Promesas */
      insertPromisesArray.push(this.pokemonModel.create({name,no}));
    });
    /**Aca ponemos await para, si queremos ver el resultado, que dice que pormesas se finalizaron bien*/
    const nerArray=await Promise.all(insertPromisesArray);
    /**Se espera a q finalicen */
    return `Seed ejecutada mediante insercion por lotes.`


  }
}
