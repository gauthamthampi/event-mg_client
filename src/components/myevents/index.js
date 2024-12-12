import Navbar from "../home/nav"
import MyEventsBanner from "./banner";
import MyEventsBody from "./body";


function MyEvents() {
    return (
      <div className="App">
        <Navbar />
        <MyEventsBanner />
        <MyEventsBody />
      </div>
    );
  }
  
  export default MyEvents;