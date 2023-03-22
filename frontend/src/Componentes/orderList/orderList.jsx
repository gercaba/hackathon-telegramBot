import React from "react";
import { useEffect, useState } from "react";
import styles from "./orderList.module.css"

const updateOrder = async (orderId,body) =>{
 
    let useUrl = `http://localhost:3001/order/${orderId}`;
    let ops = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        }
    }
    if(body){
      ops.body = JSON.stringify(body)
    }
  try{
    const response = await fetch(useUrl,ops);
    console.log("response", response)
    let json = await response.json()
      if (response.ok){
        return json
      } else {

        return {
              error:true, 
              message: json.message,
              status: response.status
            }}
    }
    //TODO:ver qué error devolvemos en backend para esto
  catch(res){console.log(res);
    throw new Error(res.message)}
}




const OrderList = () => {
   
    const [list, setList]=useState([]);
    const [refresh, setRefresh]=useState(true);


    useEffect (()=> {
        
        fetch("http://localhost:3001/order")
            .then((response)=>{
                return response.json();
            })
            .then((res)=>{
                console.log("RESPONSE",res);
                setList(res);
            })
            console.log('Acabado el fetch');
    },[refresh])

    const handleChange =async (e) =>{

        const orderId = e.target.value;
        console.log("orderID", orderId)
        const body={
            completed: true
        }
       
      await updateOrder(orderId,body)
    
      setRefresh(!refresh)
    
    }


return(
  
    <div className={styles.container}>   
        <table className="table w-full">
            <tr>
                <th>Usuario</th>
                <th>Menú</th>
                <th>Completado</th>
            </tr>  

            {list && list.map((e)=>( 

            <tr className="active">
                <th>{e.chatUser.name}</th>
                <th>{e.menu.name}</th>
                 <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text"></span> 
                        <input type="checkbox" value={e._id} checked={e.completed} className="checkbox checkbox-primary" disabled={e.completed} onChange={(checkboxEvent)=>{handleChange(checkboxEvent)}}/>
                    </label>
                </div>
            </tr> 
            ))}
            
        </table>
    </div>

)}

export {OrderList}
