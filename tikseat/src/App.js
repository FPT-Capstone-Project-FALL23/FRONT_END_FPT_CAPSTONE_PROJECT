import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './Pages/RoutePage';
import SnowfallComponent from './Pages/Common/SnowfallComponent ';
import TopLeft from "../src/Assets/Images/topleft.png"
import TopRight from "../src/Assets/Images/topright.png"
import BottomRight from "../src/Assets/Images/caythong.png"

function App() {
  return (
    <>
      <BrowserRouter>
        <img src={TopLeft} style={{height:"150px", width:"150px", position:"fixed" ,zIndex:"9999",top:"0",left:"0"}}/>
        <img src={TopRight} style={{height:"150px", width:"150px", position:"fixed" ,zIndex:"9999",top:"0",right:"0"}}/>
        <img src={BottomRight} style={{height:"300px", width:"240px", position:"fixed" ,zIndex:"9999",bottom:"0",right:"0"}}/>
        <RoutePage />
        <SnowfallComponent/>
      </BrowserRouter>
    </>
  );
}

export default App;
