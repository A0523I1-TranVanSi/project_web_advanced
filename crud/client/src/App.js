import  {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Home from "./page/Home.js";
import AddEdit from "./page/AddEdit.js";
import View from "./page/View.js";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center"/>
          <Routes>
            <Route exact path="/" Component={Home}/>
            <Route path="/addContact" Component={AddEdit}/>
            <Route path="/update/:id" Component={AddEdit}/>
            <Route path="/view/:id" Component={View}/>
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
