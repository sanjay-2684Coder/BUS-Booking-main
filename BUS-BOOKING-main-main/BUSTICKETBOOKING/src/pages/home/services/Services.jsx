import React from "react";
import RootLayout from "../../../layout/RootLayout";
import ServiceCard from "../../../components/service/ServiceCard";
import {RiSecurePaymentLine} from "react-icons/ri"
import { RiRefundLine} from "react-icons/ri";
 import {PiHeadsetFill} from "react-icons/pi";
const Services = () => {
    return (
        <RootLayout className="space-y-12">
           {/* tag */}
           <div className="w-full flex items-center justify-center text-center"> 
             <h1 className="text-3xl text-neutral-800 font-bold">
                Our <span className="text-primary">Services</span>

             </h1>
           </div>
          {/* services card */}
          <div className="w-full grid grid-cols-3 gap-10">
             <ServiceCard icon={RiSecurePaymentLine} title={"Secure Payment"} desc={"Integrate secure payment gateways for users to pay users to pay for their tickets"} /> 
             <ServiceCard icon={RiRefundLine} title={"Refund Policy"} desc={"Offer option for the users to purchase refundable tickets with our clear terms"} />
             <ServiceCard icon={PiHeadsetFill} title={"24/7 Support"} desc={"Get assistence anytime through chat,email or phone"} />
          </div>

        </RootLayout>
        
    )
}
export default Services;