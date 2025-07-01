import Navbar from "@/components/Navbar";
import HomePage from "./HomePage/page";
import Footer from "@/components/Footer";


export default function Home() {
  return (
   <>
   <div className=" ">
     <Navbar/>
     <HomePage/>
     <Footer/>
   </div>
   </>
  );
}
