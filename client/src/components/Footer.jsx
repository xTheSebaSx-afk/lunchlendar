import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='shadow [box-shadow:0px_1px_10px_2px_#abc6dd] py-10 bg-gray-400/30 mt-20'>
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
            <ul className='flex mx-auto gap-4 justify-around mt-4'>
                <li>
                    © {new Date().getFullYear()} Lunch Calendar. All rights reserved.
                </li>
                <li>
                    Developed by <Link to="https://github.com/xTheSebaSx-afk" className='hover:underline text-[#1905b4]' target='_blank'>xBast1q</Link>.
                </li>
                <li>
                    Github Repo: <Link to="https://github.com/xTheSebaSx-afk/lunchlendar" className='hover:underline text-[#1905b4]' target='_blank'>Lunch Calendar</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer