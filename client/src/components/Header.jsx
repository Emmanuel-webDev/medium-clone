import { useState } from "react";
import { Link } from 'react-router-dom';

import { TiPen } from "react-icons/ti";
import { TfiUser } from "react-icons/tfi";


const Header = () => {

    const [menu,setMenu]= useState(false);

    return (
        <>
            <header className="h-14 bg-slate-50">
                
                <div className="parent-div p-2 flex justify-between">
                    {/* top left logo */}
                    <div className="top-left-image ml-4">
                        <img className="w-14 h-8" src="/Images/top_logo.png" alt="logo" />
                    </div>

                    {/* Write button for Desktop-view */}
                    <div className="write w-8 sm:hidden md:block md:ml-[50vw] lg:ml-[60vw] ">
                        <div className="flex">
                            <Link to='/write'>
                                <div>
                                    <TiPen size={25} color="black" />
                                </div>
                                <div className="font-semibold">Write</div>
                            </Link>
                            
                        </div>
                        
                    </div>

                    {/* Profile which is on the top right */}
                    <div className="z-10 flex gap-x-5">

                        <button className="bg-green-400 text-white p-2 rounded-lg">
                            <Link to='/signup'>
                                SignUp
                            </Link>
                        </button>

                        <button className="sm:justify-end mr-5 flex" onClick={()=>{ setMenu(!menu) }}>
                            <div className="user-profile">
                                <TfiUser size={25} />
                            </div>
                            <div className="mt-1">
                                <img className="w-5" src="/Images/profile_arrow.jpeg" alt="little-arrow"/>
                            </div>
                        </button>
                    </div>

                        {/* If clicked on profile button, this list of things will pop up */}
                    { menu ? <div className="bg-white w-[60%] shadow-xl absolute top-12 right-4 rounded-md p-5 lg:w-[25%] lg:mt-3">
                        

                        <Link to='/write' className="flex md:hidden">
                            <div className=" pr-2">
                                <TiPen size={25} color="black" />
                            </div>

                            <div>
                                <p>Write</p>    
                            </div>

                        </Link>
                        
                        <Link className="flex mt-2">

                            <div className="user-profile pr-2 ">
                                <TfiUser size={22} />
                            </div>

                            <div>
                                <p>Profile</p>    
                            </div>

                        </Link> 
                    </div> : ""}
                </div>
            </header>
            <hr />
        </>

    )
}

export default Header
