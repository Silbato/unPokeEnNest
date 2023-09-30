import axios from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import  {AxiosInstance} from 'axios';
import { Injectable } from '@nestjs/common';

/**Para q lo podamos usar como etiqueta inyectable */
/**Nest trabaja por modulos aca, hay que importarlo en la clase que lo use */
@Injectable()
export class AxiosAdapter implements HttpAdapter{
        /**Si axios cambia, solo cambiamos esta clase */
        /**Cuando creemos otro adaptador fetch http tiene que impoertar tambien HttpAdapter que creamos y tiene el get() */
    private axios:AxiosInstance=axios;

    async get<T>(url: string): Promise<T> {
        try {
            const {data}=await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error("Method not implemented Axios.");
        }
    }

}