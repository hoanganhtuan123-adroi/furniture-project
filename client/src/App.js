import { Outlet } from "react-router-dom";
import "./App.css";
import NavigationClient from "./components/Dashboard/Navigation/NavigationClient";
import Footer from "./components/Footer/Footer";
function App() {
    return (
        <div className="App">
            <NavigationClient />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
