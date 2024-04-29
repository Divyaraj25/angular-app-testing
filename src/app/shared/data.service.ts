export class DataService{
    getDetails(){
        const returnPromise = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('some data')
            },2000)
        })
        return returnPromise
    }
}