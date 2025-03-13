import { useState } from "react";
import  UserCard  from "./UserCard";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import  axios  from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
   
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhoto] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
     //clear errors
    setError("");
    try{
        const res = await axios.patch(baseUrl+"/profile/edit",{firstName, lastName, photoUrl, age, gender, about},{withCredentials:true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        
    }catch(err){
        setError(err.response.data);
    }
  };

  return (
    <>
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name:</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name:</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Age:</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Gender:</span>
  </div>
  <select
    className="select select-bordered w-full max-w-xs my-2"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Others</option>
  </select>
</label>

            <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">About:</span>
  </div>
  <textarea
    className="textarea h-24 input-bordered w-full max-w-xs my-2"
    placeholder="Bio"
    value={about}
    onChange={(e) => setAbout(e.target.value)}
  ></textarea>
</label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Photo URL:</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={saveProfile}>Update Profile</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <UserCard user = {{firstName, lastName, photoUrl, age, gender, about}} />
    </div>
    
    {showToast && (<div className="toast toast-top toast-center">
    <div className="alert alert-success">
      <span>Profile Updated successfully.</span>
    </div>
  </div>)}
  </>
  );
};
export default EditProfile;
