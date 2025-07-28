import React from "react";
import WarningAlert from "../../../components/alertmessage/WarningAlert";
import { Link } from "react-router-dom";
import TopLayout from "../../../layout/topPage/TopLayout";
import RootLayout from "../../../layout/RootLayout";
import BusSeat from "./seat/busseat/BusSeat";

const Details=()=>{

const message=(
    <>
   One individuals can only book 10 seats. If you want to book more than 10 seats,
   Please <Link to={"/support-team"} className="text-yellow-600 font-medium">Contact our support team.</Link>
   </>
);
   


    return(
        <div className="w-full space-y-12 pb-16">
        <TopLayout
            bgImg="https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"
            title="Bus Details"
        />

        <RootLayout className={"space-y-12 w-full pb-16"}>
         <div className="w-full space-y-8">
            {/*warning message */}
            <WarningAlert message={message}/>
            {/*seat Layout */}
            <BusSeat/>
         </div>

          {/*bus details */}
          <div className="w-full flex items-center justify-center flex-col gap-8 text-center"></div>
        </RootLayout>
        </div>
    )
}
export default Details;