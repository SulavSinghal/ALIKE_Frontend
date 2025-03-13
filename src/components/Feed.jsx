import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";

const Feed = () =>{
    const feed = useSelector(store => store.feed);
    console.log(feed);
    const dispatch = useDispatch();

    const getFeed = async () =>{
        if(feed) return;
        try {
            const res = await axios.get(baseUrl+"/feed",{withCredentials: true,});
            console.log(res);
            dispatch(addFeed(res?.data?.data));
        }catch(err){
            console.error(err);
        }
    };
    useEffect(()=>{
        getFeed();
    },[]);
    return (<div>
        <p>Feed</p>
    </div>)
};
export default Feed; 