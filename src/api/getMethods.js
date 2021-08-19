import { rejects } from 'assert'
import axios from 'axios'
import { resolve } from 'path'

let base_url = "http://10.9.110.10:8888"
export const  get =(url,params) => {
    return new Promise(
        (resolve,reject) => {
            axios.get(
                base_url+url,{
                    params:params
                },{
                    Headers:{
                        "token":localStorage.getItem("token")
                    }
                }
                
                ).then(res => {
                    resolve(res)
                }).catch(
                    err => {
                        console.log(err.status_code)
                        reject(err)
                    }
                )           
        }
    )

}
export const post =(url,params) => {
    return new Promise( (resolve,reject) => {
        axios.post(
            base_url + url,params,{
                headers:{
                    "token":localStorage.getItem("token")
                }
            }
            
        ).then(resp =>{
            resolve(resp)
        }).catch(
            resp =>{
                reject(resp)
            }
        )

    })
}
export const put =(url,params) => {
    return new Promise((resolve,reject) =>{
        axios.put(params).then(res =>{
            resolve(res)
        },res =>{
            reject(res)
        })
    })
}