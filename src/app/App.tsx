import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import '../assets/css/App.css'
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import CreatePost from "../pages/CreatePost/CreatePost";

function App() {


    return (
        <div className="App">
            <Router>
                <Layout>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/create'} element={<CreatePost/>}/>
                    </Routes>
                </Layout>
            </Router>

        </div>
    )
}

export default App
