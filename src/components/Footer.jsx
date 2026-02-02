import { Link } from 'react-router-dom'

const Links = () => {
    return (
        <ul className='w-[screen] flex justify-around'>
            <li className='font-bold text-3xl underline'>
                Lunch Calendar
            </li>
            <li>
                <ul>
                    <li>Quick Links</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                </ul>
            </li>
            <li>
                <ul>
                    <li>Legal</li>
                    <li>asd</li>
                    <li>asd</li>
                    <li>asd</li>
                </ul>
            </li>
        </ul>
    )
}

const SocialLinks = () => {
    return (
        <ul className='flex flex-col gap-4 justify-between px-4 mt-8'>
            <li>
                <ul className='flex gap-5 items-baseline'>
                    <li>
                        <Link to="https://github.com/xTheSebaSx-afk" className='hover:underline text-[#1905b4]' target='_blank'>
                            <img src="/images/illustrations/xthesebasx.png" alt="" className='transition-all duration-300 hover:scale-125 rounded-full size-[45px]' />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://github.com/xTheSebaSx-afk/lunchlendar" target='_blank'>
                            <img src="/icons/github.svg" alt="" className='transition-all duration-300 hover:scale-125 rounded-full size-[45px]' />
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                © {new Date().getFullYear()} Lunch Calendar. All rights reserved.
            </li>
        </ul>
    )
}

function Footer() {
    return (
        <footer className='shadow [box-shadow:0px_1px_10px_2px_#abc6dd] py-10 bg-gray-400/30 mt-20 footer'>
            <Links />
            <SocialLinks />
        </footer>
    )
}

export default Footer