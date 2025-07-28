import React from "react";
import RootLayout from "../../../layout/RootLayout";
import TopSearchCard from "../../../components/topsearch/TopSeachCard";

const TopSearch = () => {
    return (
        <RootLayout className="space-y-12">
             {/* tag */}
           <div className="w-full flex items-center justify-center text-center"> 
             <h1 className="text-3xl text-neutral-800 font-bold">
                Top Search<span className="text-primary">Routes</span>
             </h1>
           </div>
           {/* top Search tickets routes card */}
           <div className="w-full grid grid-cols-3 gap-5">

            <TopSearchCard routeFrom={"Indore"} routeTo={"Mumbai"} timeDuration={"8 Hrs"} price={"1800"} />
            <TopSearchCard routeFrom={"Indore"} routeTo={"pune"} timeDuration={"7.5 Hrs"} price={"1500"} />
            <TopSearchCard routeFrom={"Indore"} routeTo={"Bhopal"} timeDuration={"2 Hrs"} price={"800"} />
            <TopSearchCard routeFrom={"Indore"} routeTo={"Srinagar"} timeDuration={"15 Hrs"} price={"3000"} />
           </div>
        </RootLayout>
    )
}
export default TopSearch;