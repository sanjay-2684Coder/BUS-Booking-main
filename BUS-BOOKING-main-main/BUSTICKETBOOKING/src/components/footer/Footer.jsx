import React from "react";
import RootLayout from "../../layout/RootLayout";
import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaXTwitter, FaYoutube} from "react-icons/fa6"

import MasterCardImg from "../../assets/mastercard.png"
import PaypalImg from "../../assets/paypal.png"
import CreditCardImg from "../../assets/creditcard.png"


const Footer =()=>{
    return(
        <div className="w-full h-auto bg-neutral-950 py-12">

              <RootLayout className="space-y-10">
            
                <div className="w-full grid grid-cols-5 gap-8"> 
                    <div className="col-span-2 space-y-8 md:pr-10 pr-0">
                        <div className="space-y-3">
                        <Link to="/" className="text-6xl text-primary font-bold" >
                       Bus
                    </Link>
                    <p className="text-sm text-neutral-500 font-normal">
                        Bus is all about booking ticket through online platform to make comfortable to the passenger Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptatem accusantium, minima esse iusto ut, pariatur iure sed saepe, totam quibusdam labore illum exercitationem. Tenetur sint eos doloremque magni dolores.
                    </p>
                        </div>
                   
                       <div className="w-full flex items-center gap-x-5">
                        <div className="w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary flex items-center justify-center cursor-pointer ease-in-out duration-500 ">
                          <FaInstagram className="w-5 h-5 text-neutral-50 bg-red-600"/>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary flex items-center justify-center cursor-pointer ease-in-out duration-500 ">
                          <FaFacebook className="w-5 h-5 text-neutral-50 bg-blue-600"/>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary flex items-center justify-center cursor-pointer ease-in-out duration-500 ">
                          <FaYoutube className="w-5 h-5 text-neutral-50 bg-red-600"/>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary flex items-center justify-center cursor-pointer ease-in-out duration-500 ">
                          <FaXTwitter className="w-5 h-5 text-neutral-50 bg-blue-300"/>
                        </div>
                       </div>
                    </div>
                    <div className="col-span-1 space-y-5">
                         <h1 className="text-lg text-neutral-100 font-semibold ">
                            Quick Links
                            <div className="space-y-2"> 
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  About Us
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  My Account
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  Reserve your ticket
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  Create your account
                                </Link>
                            </div>
                         </h1>
                    </div>
                    <div className="col-span-1 space-y-5"></div>
                    <h1 className="text-lg text-neutral-100 font-semibold ">
                            Quick Links
                            <div className="space-y-2"> 
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  Privacy Policy
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  Terms & Condition
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  Help & Support Center
                                </Link>
                                <Link to="/" className="block text-base text-neutral-500 hover:text-neutral-300 font-normal ease-in-out duration-300">
                                  FaQs
                                </Link>
                            </div>
                         </h1>
            
                </div>
                  {/*separater */}
                    <div className="w-full h-px bg-neutral-800/50"></div>
                  {/*cpoyright */}
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm text-neutral-600 font-normal">
                               Copyright &copy;2025. All rights reserved.
                        </p>
                        <div className="flex items-center gap-x-2">
                           <div className="">
                              <img src={MasterCardImg} alt="" className="w-fit h-9 object-contain object-center"/>
                           </div>
                           <div className="">
                              <img src={PaypalImg} alt="" className="w-fit h-9 object-contain object-center"/>
                           </div>
                           <div className="">
                              <img src={CreditCardImg} alt="" className="w-fit h-9 object-contain object-center"/>
                           </div>
                        </div>
                    </div>
              </RootLayout>
        </div>
    )
}
export default Footer;