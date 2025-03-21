import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if(userData) return;
        try{
            const res = await axios.get(baseUrl + "/profile/view",{
            withCredentials: true,
        });
    dispatch(addUser(res.data));
    }catch(err)
        {
            if(err.status === 401){
            navigate("/Login");
            }
            console.error(err);
        }
    };

    useEffect(() => {
       
            fetchUser();
    }, []);
    return (<div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
    );
};
export default Body;