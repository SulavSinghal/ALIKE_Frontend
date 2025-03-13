import { BrowserRouter, Routes, Route} from "react-router"
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {


  return (
    <>
    <Provider store = { appStore }>
     <BrowserRouter basename = "/">
       <Routes>
          <Route path ="/" element={<Body />}>
            <Route path ="/" element={<Feed />} />
            <Route path ="/Login" element={<Login />} />
            <Route path ="/Profile" element={<Profile />} />
            <Route path ="/connections" element={<Connections />} />
            <Route path ="/requests" element={<Requests />} />
          </Route>
     </Routes>
     </BrowserRouter>
     </Provider>
  
    </>
  )
}

export default App
