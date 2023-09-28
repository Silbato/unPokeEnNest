
/*import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Pokemon extends Document{
    @Prop({
        unique:true,
        index:true
    })
    name:string;
    @Prop({
        unique:true,
        index:true
    })
    no:number;


}
export const PokemonSchema=SchemaFactory.createForClass(Pokemon);
*/
/**Supuestamente esta es para que no cause errores en TypeScript al extender de Documents */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";

@Schema()
export class Pokemon {
/**Los campos name y no estan indexados por la propiedad, asi que serian la misma velocidad al buscarlos */
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );