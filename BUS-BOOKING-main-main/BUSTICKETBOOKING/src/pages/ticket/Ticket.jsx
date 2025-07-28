import React from "react";
import TopLayout from "../../layout/topPage/TopLayout";
import RootLayout from '../../layout/RootLayout'
import { motion } from "framer-motion";
import Search from "../home/hero/search/Search";
import Filter from "./filter/Filter";
import SearchResult from "./searchresult/SearchResult";
const Ticket = () => {
    return (
        <div className="w-full space-y-12 pb-16">
            <TopLayout
                bgImg="https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"
                title="Reserve Your Ticket"
            />

            <RootLayout className={"space-y-12 relative"}>
              {/*search section */}
             <div className="space-y-5 w-full bg-neutral-50 flex py-4 items-center
                         justify-center flex-col sticky top-0 z-30">
            
             <motion.h1
                    initial={{ opacity: 0, y: -800 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -800 }}
                    transition={{ duration: 1.35, ease: "easeOut" }}
                    className="text-3xl text-neutral-700 font-semibold "
                >
                    want to change the route?
                </motion.h1>
                <Search/>
                </div>
              {/*searched Bus section */}

              <div className="w-full h-auto grid grid-cols-4 gap-16 relative">
                {/* filter section */}
                <div className="col-span-1">
                    <Filter className="space-y-4 sticky top-52 z-20" 
                    />

                </div>
                 {/* search Tickets */}
                 <SearchResult/>
              </div>
            </RootLayout>
        </div>
    );
};

export default Ticket;
