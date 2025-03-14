import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { baseUrl } from "../utils/constants";

const Login = () => {
  
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLogInForm,setIsLoginForm] = useState(true);
  const [error,setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    try{
      const res = await axios.post(
      baseUrl+"/login", 
      {
      emailId,
      password,
    },
  { withCredentials: true }
);
dispatch(addUser(res.data));
return navigate("/");
  }catch(err)
  {
    setError(err?.response?.data || "Something went wrong!");
    console.error(err);
  }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(baseUrl+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }catch(err)
    {
      setError(err?.response?.data || "Something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center my-6">
  <div className="card card-bordered bg-base-300 w-full max-w-md shadow-lg">
    <div className="card-body">
      <div className="flex justify-center">
      <h2 className="card-title text-center text-2xl font-semibold mb-2">{isLogInForm?"Login":"Sign Up"}</h2>
      </div>
{!isLogInForm && <><label className="form-control w-full my-1">
      <div className="label">
        <span className="label-text">First Name</span>
      </div>
      <input
        type="text"
        value={firstName}
        className="input input-bordered w-full my-1"
        onChange={(e) => setFirstName(e.target.value)}
      />
    </label>

    <label className="form-control w-full my-1">
      <div className="label">
        <span className="label-text">Last Name</span>
      </div>
      <input
        type="text"
        value={lastName}
        className="input input-bordered w-full my-1"
        onChange={(e) => setLastName(e.target.value)}
      />
    </label></>}

      <label className="form-control w-full my-1">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="mail@site.com"
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input input-bordered w-full my-1"
        />
      </label>

      <label className="form-control w-full my-1">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          value={password}
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full my-1"
        />
      </label>

      <p className="text-red-500 text-sm mt-2">{error}</p>

      <div className="card-actions justify-center mt-2">
        <button
          className="btn btn-primary w-full max-w-xs"
          onClick={isLogInForm? handleLogin: handleSignUp}
        >
          {isLogInForm?"Login":"Sign Up"}
        </button>
      </div>
      <p className="m-auto cursor-pointer text-center py-2" onClick={()=>setIsLoginForm(value => !value)}>{isLogInForm?"New User? Sign Up here": "Existing User? Login here"}</p>
    </div>
  </div>
</div>

  );
};
export default Login;
