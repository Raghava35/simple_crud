import axios from 'axios';


export const getList = () => {
    return axios.get('/api/test',{
        headers: { 'Content-Type': 'application/json'}
    }).then(res=> {
        return res.data
    })
}


export const additem =(name,address) => {
    return axios.post('/api/test',{
        name :name,
        address :address
    },
    {
        headers: { 'Content-Type': 'application/json' }
    }
    ).then((response) =>{
        console.log(response)
    })
}


export const updateitem =(name,address,id) =>{
    return axios.put(`/api/test/${id}`,{
        name :name,
        address :address
    },{
        headers: { 'Content-Type': 'application/json' } 
    }).then((response)=>{
        console.log(response)
    })
}


export const deleteitem = id => {
    axios.delete(`/api/test/${id}`,{
        headers: { 'Content-Type': 'application/json' } 
    }).then((response)=>{
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
}