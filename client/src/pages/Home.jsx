import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Footer from '@components/Footer'
import LoginButton from '@components/LoginButton';
import AppIcon from '@icons/AppIcon';
import HeartIcon from '@icons/HeartIcon';
import CalendarIcon from '@icons/CalendarIcon';
import HatIcon from '@icons/HatIcon';

const NavBar = () => {

    return (
        <nav className="p-2 to-[#c1dff9] from-[#e8f2fc] bg-linear-to-l flex justify-around items-center relative top-3 [box-shadow:0px_1px_10px_2px_#abc6dd] text-[#1b3a49] text-[18px] text-center">
            <ul className='md:w-100 flex w-50 justify-around'>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 1</li>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 2</li>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 3</li>
            </ul>
            <LoginButton />
        </nav>
    )
}


const Header = ({ }) => {
    return (
        <>
            <header className='header py-10 md:h-[570px] h-[500px]' >
                <NavBar />
                <div className='flex justify-center'>
                    <div className='text-center mt-[120px]'>
                        <h1 className='md:text-7xl sm:text-5xl text-3xl text-[#23282c]'>Lunch Calendar</h1>
                        <p className='text-center mt-2'>Una aplicación web para ayudarte a planear tus comidas</p>
                        <button className='mt-10'><Link to="/dishes" className='p-4 text-white text-[20px] w-[150px] from-[#48945c] to-[#88bf4a] bg-linear-60 rounded-2xl focus:outline-[#46FF17]'>Comenzar</Link></button>
                    </div>
                </div>
            </header >
        </>
    )
}

const ObjectiveItem = ({ Icon, title, description }) => {
    return (
        <li className="flex flex-col items-center text-center gap-3 max-w-[220px] ">
            <div className="md:w-[150px] md:h-[150px] sm:size-[120px] size-[60px] rounded-full bg-white shadow-md flex items-center justify-center shrink-0" >
                <Icon className="md:w-[100px] md:h-[100px] sm:size-[100px] size-10 object-contain" />
            </div>
            <h3 className="font-semibold text-gray-800">
                {title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
                {description}
            </p>
        </li>
    )
}

const Objectives = () => {
    return (
        <ul className="flex justify-between items-start w-[80%] mx-auto gap-8 mb-[100px]">
            <ObjectiveItem Icon={CalendarIcon} title="Plan Your Meals" description="Easily schedule your lunches" />

            <ObjectiveItem Icon={HeartIcon} title="Discover Recipes" description="Explore delicious recipe ideas" />

            <ObjectiveItem Icon={HatIcon} title="Balanced Diet" description="Maintain healthy & varied meals" />
        </ul>
    )
}

const Main = () => {
    return (
        <main className='body py-5' id='main'>
            <Objectives />
        </main >
    )
}

function Home() {
    const { user, isAuthenticated, logout } = useUser()

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className=''>
            <AppIcon className='size-[100px] bg-linear-120 from-[#8cbd56] to-[#b8defc] rounded-full z-10 bottom-0 right-0 m-4 fixed' />
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Home