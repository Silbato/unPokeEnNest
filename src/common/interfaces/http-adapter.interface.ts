export interface HttpAdapter{
    /**Recibo un generico y devuelvo una promesa generica */
    get<T>(url:string):Promise<T>;
}