import React from "react";
import { FaWifi } from "react-icons/fa";
import { GiWaterBottle } from "react-icons/gi";
import { IoTv } from "react-icons/io5";
import { GiCharging } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


const TopSearchCard = ({routeFrom , routeTo,timeDuration,price}) => {
    return (
        <div className="w-full rounded-xl p-5 border-2 border-neutral-300 space-y-10">
           <div className="space-y-3.5 w-full">
            {/* Route */}
            <div className="space-y-0">
                <div className="w-full flex items-center justify-between">
                  <p className="text-xs text-neutral-400 font-normal">Form</p>
                  <p className="text-xs text-neutral-400 font-normal">To</p>
                </div>
                <div className="w-full flex items-center justify-between gap-x-3">
                    <h1 className="text-xl text.neutral-600 font-semibold">
                        {routeFrom}
                        </h1>
                        <div className="flex-1 border-dashed border border-neutral-400 relative">
                          <p className="absolute w-fit px-3 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 rounded-full flex items-center justify-center text-sm text-neutral-500 font-normal border-dashed border border-neutral-400">
                            {timeDuration}
                          </p>
                        </div>
                        <h1 className="text-xl text-neutral-600 font-semibold">
                        {routeTo}
                        </h1>
                </div>
            </div>

            {/* Facilities */}
            <div className="w-full flex items-center gap-3 flex-wrap">
                {/*first one */}
                <div className="flex items-center gap-x-1">
                    <FaWifi className="w-3 h-3 text-neutral-500" />
                    <p className="text-xs text-neutral-600 font-normal">
                        internet
                    </p>
                </div>
                {/*second one */}
                <div className="flex items-center gap-x-1">
                    <GiWaterBottle className="w-3 h-3 text-neutral-500" />
                    <p className="text-xs text-neutral-600 font-normal">
                        Snaks
                    </p>
                </div>
                 {/*third one */}
                <div className="flex items-center gap-x-1">
                    <IoTv className="w-3 h-3 text-neutral-500" />
                    <p className="text-xs text-neutral-600 font-normal">
                        TV
                    </p>
                </div>
                {/*fourth one */}
                <div className="flex items-center gap-x-1">
                    <GiCharging className="w-3 h-3 text-neutral-500" />
                    <p className="text-xs text-neutral-600 font-normal">
                        Mobile Charging
                    </p>
                </div>

                </div> 

            </div> 

            <div className="w-full flex items-center justify-between">
                {/*prices */}
                <h1 className="text-xl text-neutral-700 font-semibold">
                   Rs. {price}
                </h1>
                <button className="w-fit px-5 py-1.5 h-full bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-sm font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300">
                  <FaSearch />
                    Reserve Seat
                </button>
            </div>
        </div>
    )
}
export default TopSearchCard;