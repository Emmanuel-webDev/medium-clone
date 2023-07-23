import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { TiPen } from "react-icons/ti";
import { TfiUser } from "react-icons/tfi";
import { TbLogout } from "react-icons/tb";


import { logout, reset } from "../features/Authentication/userSlice";

const Header = () => {

    const [menu, setMenu] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    const { user } = useSelector((store) => store.userAuth)

    return (
        <>
            <header className="h-14 bg-slate-50">

                <div className="parent-div p-2 flex justify-between">
                    {/* top left logo */}
                    <div className="top-left-image ml-4 flex">
                        <div> <img className="w-14 h-8" src="/Images/top_logo.png" alt="logo" /> </div>
                    </div>

                    {/* Write button for Desktop-view */}

                    {user ? <div className="write w-8 sm:hidden md:block  md:ml-[50vw] lg:ml-[60vw] ">
                        <div className="flex">
                            <Link to='/newstory'>
                                <div className="flex">
                                    <TiPen size={25} color="black" />
                                    <span className="font-semibold">Write</span>
                                </div>
                            </Link>

                        </div>

                    </div> : ""}

                    {/* Profile which is on the top right */}
                    <div className="z-10 flex gap-x-3">
                        {user ? (<button className="flex lg:mr-8" onClick={onLogout}>
                            <TbLogout size={25} /> logout
                        </button>
                        ) : (<>
                            <Link to='/login' className=" md:block mt-1 font-semibold">
                                login
                            </Link>

                            <button className="bg-black text-white px-3 py-1 mr-3 rounded-full font-sans lg:mr-8">
                                <Link to='/signup'>
                                    Get Started
                                </Link>
                            </button>

                        </>)}


                        {user ? <button className="sm:justify-end mr-5 flex" onClick={() => { setMenu(!menu) }}>
                            <div className="user-profile">
                                <TfiUser size={25} />
                            </div>
                            <div className="mt-1">
                                <img className="w-5" src="/Images/profile_arrow.jpeg" alt="little-arrow" />
                            </div>
                        </button> : ""}
                    </div>

                    {/* If clicked on profile button, this list of things will pop up (mobile-view) */}
                    {menu && user ? <div className="bg-white w-[40%] shadow-xl absolute top-12 right-4 rounded-md p-5 lg:w-[25%] lg:mt-3">


                        <Link to='/newstory' className="flex md:hidden">
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
