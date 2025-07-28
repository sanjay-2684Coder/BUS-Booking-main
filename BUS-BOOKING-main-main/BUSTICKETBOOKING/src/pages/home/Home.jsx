import React from "react";
import Hero from "./hero/Hero";
import Services from "./services/Services";
import TopSearch from "./topsearch/TopSearch";
const Home = () => {
    return (
        <div className='space-y-16 w-full min-h-screen pb-16'>
           {/*Hero */}
        <Hero />

        {/*services */}
        <Services />

         {/*Top Search */}
         <TopSearch />

        {/* You can add you services */}
      </div>
      
    )
}
export default Home