import { BrowserRouter, Routes, Route} from "react-router"
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
function App() {


  return (
    <>
     <BrowserRouter basename = "/">
       <Routes>
          <Route path ="/" element={<Body />}>
            <Route path ="/Login" element={<Login />} />
            <Route path ="/Profile" element={<Profile />} />
          </Route>
     </Routes>
     </BrowserRouter>

  
    </>
  )
}

export default App
