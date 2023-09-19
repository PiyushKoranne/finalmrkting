import React from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'

const Manager = () => {
	const navigate = useNavigate();
  return (
	<div className=' overflow-hidden manager-parent-container bg-light flex items-center justify-start'>
		<div className='w-[250px] h-[100vh] side-menu-container'>
			<div className=' py-[15px] px-[25px]'><h3 className='py-[10px] text-center border-b-[1px] border-[#bebebe]'>Marketing 101</h3></div>
			<div className='text-center pb-[15px]'>
				<button onClick={()=>{navigate('./campaign/new')}} className="w-[80%] common-subtle-button rounded-full hover:bg-pink transition-all">Add Campaign</button>
			</div>
			<Link to={"./audiences"}><div className='sidemenu-item bg-[url("/src/assets/icons8-audience-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat'>Audiences</div></Link>
			<Link to={"./campaigns"}><div className='sidemenu-item bg-[url("/src/assets/icons8-contact-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat'>Campaigns</div></Link>
			<Link to={"./templates"}><div className='sidemenu-item bg-[url("/src/assets/icons8-edit-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat'>Templates</div></Link>
			{/* <Link to={"./analytics"}><div className='sidemenu-item bg-[url("/src/assets/icons8-tags-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat analytics'>Analytics</div></Link> */}
		</div>
		<div className='overflow-auto w-[calc(100%-250px)] border-[1px] border-[#bebebe] h-[100vh]'>
			<Outlet />
		</div>
	</div>
  )
}

export default Manager