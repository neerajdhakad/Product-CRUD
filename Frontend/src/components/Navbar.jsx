 import { Link } from "react-router-dom";

function Navbar() {
  return ( 
    <> 
	<nav
		className="fixed inset-x-0 top-0 z-10 w-full px-5 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out"
	>
		<div className="flex justify-between px-5 py-1">
			<Link to={'/'}>
			<div className="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
				E-commerce
			</div>
			</Link>
		
		</div>
	</nav>
 
    </>
  )
}

export default Navbar