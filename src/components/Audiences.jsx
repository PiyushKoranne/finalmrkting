import { Form, Input, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from "../services/userServices";
import {parseISO, format} from "date-fns"
import { enqueueSnackbar } from 'notistack';


const Audiences = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [contactData, setContactData] = useState({});

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		handleAddNewContact();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	async function handleAddNewContact () {
		try {
			const data = await userService.handleAddContact(contactData);
			console.log(data)
			if(data?.status === 200){
				setIsModalOpen(false);
				enqueueSnackbar('Contact Added Successfully', {variant:'success'});
			}
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Oops! Could not add contact', {variant:'error'})

		}
	}

	const columns =[
		{
			title: 'Created',
			dataIndex: 'date_created',
			key: 'date_created',
		},
		{
			title: 'Listing Name',
			dataIndex: 'name',
			key: 'name',
			render: (text,record) => <Link to={`../audience/${record?.id}`} className='text-[#525FE1] font-bold capitalize'>{text}</Link>,
		},
		{
			title: 'Listing Rating',
			dataIndex: 'list_rating',
			key: 'list_rating',
		},
		{
			title: 'Total Recepients',
			dataIndex: 'member_count',
			key: 'member_count',
		},
		{
			title: 'Campaign Count',
			dataIndex: 'campaign_count',
			key: 'campaign_count',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actioons',
			render: (text, record) => (
				<div className='flex gap-[10px]'>
					<button onClick={()=>{ setContactData(prev =>({...prev, list_id:record?.id})); showModal();}}  className='border-none rounded-[5px] text-white bg-green-500 p-[4px_12px]'>Add Contact</button>
					<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
						<Form
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 14 }}
							layout="horizontal"
							style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
							initialValues={{
								list_id:record.id
							}}
						>
							<Form.Item name='list_id' label="List id">
								<Input onChange={(e) => {setContactData(prev =>({...prev, list_id:e.target.value}))}} value={record?.id} />
							</Form.Item>
							
							<Form.Item name='subscriber_first_name' label="First Name">
								<Input onChange={(e) => {setContactData(prev =>({...prev, subscriber_first_name:e.target.value}))}}  />
							</Form.Item>
							<Form.Item name='subscriber_last_name' label="Last Name">
								<Input  onChange={(e) => {setContactData(prev =>({...prev, subscriber_last_name:e.target.value}))}} />
							</Form.Item>
							<Form.Item name='subscriber_email' label="Email">
								<Input onChange={(e) => {setContactData(prev =>({...prev, subscriber_email:e.target.value}))}} />
							</Form.Item>
						</Form>
					</Modal>
					<button onClick={()=>{handleDeleteCampaign(record.campaign_id)}} className='border-none rounded-[5px] bg-rose-600 text-white p-[4px_12px]'>Delete</button>
				</div>
			)
		},
	]
	const [allListings, setAllListings] = useState([])

	async function fetchListings() {
		try {
			const data = await userService.getAllListings();
			const arr = data?.data?.result?.map(item => ({
				id:item?.id,
				date_created:format(parseISO(item?.date_created), "dd-MM-yyyy hh:mm aa"),
				name:item?.name,
				list_rating:item?.list_rating,
				member_count:item?.stats?.member_count,
				campaign_count:item?.stats?.campaign_count
			}))
			setAllListings(arr)
			console.log(arr)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		fetchListings()
	},[])
  return (
	<div className='min-h-screen'>
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
			<div><h3>Audiences</h3></div>
			<Link to={"../audience/new"}><button className='common-button common-button-yellow rounded-full'>Create a New Listing</button></Link>
		</div>
		<section className='w-full'>
			<Table columns={columns} dataSource={allListings} />
		</section>
	</div>
  )
}

export default Audiences