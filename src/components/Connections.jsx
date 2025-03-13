import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";

const Connections = () =>{
    

    const fetchConnections = async () =>{
        try{
            const res = await axios.get(baseUrl+"/user/connections",
            {withCredentials:true,});





        }
        catch(err){

        }
    };
    useEffect(()=>{
        fetchConnections();
    }, []);
    return (
        <div className="flex justify-center my-10">
            <h1 className="text-bold text-2xl">Connections</h1>
        </div>
    );
};
export default Connections;