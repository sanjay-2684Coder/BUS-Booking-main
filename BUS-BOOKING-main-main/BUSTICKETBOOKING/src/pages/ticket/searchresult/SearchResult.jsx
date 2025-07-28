import React from "react";
import TicketCard from "../../../components/ticket/UserTickets";
import { FaBus } from "react-icons/fa6";
import {GrRefresh} from "react-icons/gr"
import { AiOutlineReload } from "react-icons/ai"; 

const SearchResult=()=>{
    return(
        <div className="w-full col-span-3 space-y-10 pt-11">
    
         <div className="space-y-6">
            <TicketCard icon={FaBus} busName={"Sworgadwari Deluxe"} routeFrom={"Mumbai"} routeTo={"Pune"} arrivalTime={"06 :15 PM"} departureTime={"08:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Lumbini Deluxe"} routeFrom={"Mumbai"} routeTo={"thane"} arrivalTime={"07 :15 PM"} departureTime={"09:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Mustang Deluxe"} routeFrom={"Bhopal"} routeTo={"Goa"} arrivalTime={"06 :00 PM"} departureTime={"05:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Nepalgunj Deluxe"} routeFrom={"Srinagar"} routeTo={"Gujrat"} arrivalTime={"09 :15 PM"} departureTime={"04:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Sworgadwari Deluxe"} routeFrom={"Mumbai"} routeTo={"Gandhi Nagar"} arrivalTime={"06 :15 PM"} departureTime={"10:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={" Lumbini Deluxe"} routeFrom={"Raipur"} routeTo={"Chandigarh"} arrivalTime={"06 :15 PM"} departureTime={"07:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Mustang Deluxe"} routeFrom={"Indore"} routeTo={"Bhopal"} arrivalTime={"06 :15 PM"} departureTime={"08:45 AM"} price={"1500"} availableSeats={"5"} />
            <TicketCard icon={FaBus} busName={"Nepalgunj Deluxe"} routeFrom={"Mumbai"} routeTo={"Pune"} arrivalTime={"06 :15 PM"} departureTime={"10:45 AM"} price={"1500"} availableSeats={"5"} />

         </div>
         <div className="w-full flex items-center justify-center">
         <button 
                     
                    className="w-fit px-8 py-3 h-full bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-base font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300"
                    
                >
                    <GrRefresh/>
                    Load More
                </button>
         </div>
       </div>
    );
}
export default SearchResult;