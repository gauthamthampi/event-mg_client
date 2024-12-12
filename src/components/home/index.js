import Navbar from "./nav";
import Banner from "./banner";
import Body from "./body";


function Home() {
    return (
      <div className="App">
        <Navbar />
        <Banner />
        <Body />
      </div>
    );
  }
  
  export default Home;