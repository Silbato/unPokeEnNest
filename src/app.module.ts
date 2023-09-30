import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from "@nestjs/config";
import { EnvConfingurationList } from "./config/env.config";
import { JoiValidationSchema } from "./config/joi.validation";

/**El ConfigMOdule configura los .env y el appConfig que creamos por si no carga el .env,
 *  asi que es mejor colocarlo primero  y entre []*/
@Module({
    imports:[
        /**Aca el load: y validationSchema(hace que esten configuradas y den error si no) serian como lo mismo, pero pueden trabajar juntos */

        /*Primero agarra del .env, despues del joi y ultimo del validationschema*/
        ConfigModule.forRoot({load:[EnvConfingurationList],validationSchema:JoiValidationSchema}),
        MongooseModule.forRoot(process.env.MongoBBDD,{dbName:'Pokemonsdb'}) ,
         ServeStaticModule.forRoot({rootPath:join(__dirname,'..','public')}),
         PokemonModule, CommonModule, SeedModule],
    controllers:[],
    exports:[]
})
export class AppModule{
    /**ACa colocamos  */
    constructor(){

    }



}