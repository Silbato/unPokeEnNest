


/**Aca ponemos los valores que deberian estar si no esta el .env  */

/**ACa, como es el ultimo paso, lo lee a defaultLimit como string, hay q convertirlo a number con el + */
/**llega acá despues del joi, pero lo lee como string  */
export const EnvConfingurationList=()=>({
    environment:process.env.NODE_ENV ||'dev',
    mongodb:process.env.MongoBBDD,
    port:process.env.PORT || 3002,
    defaultLimit:+process.env.DEFAULT_LIMIT || 7
});