import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import userService from "../services/userServices"
import { Button, Form, Input, Modal, Table } from 'antd';

const Audience = () => {
	const {id} = useParams();
	const columns =[
		{
			title: 'Full Name',
			dataIndex: 'full_name',
			key: 'full_name',
		},
		{
			title: 'Contact Email',
			dataIndex: 'email_address',
			key: 'email_address',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
	]
	const [listData, setListData] = useState({});
	const [contactData, setContactData] = useState({ list_id:id});
	const [allContacts, setAllContacts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		handleAddNewContact();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

 	async function fetchListData() {
		try {
			if(id === "new") return
			const data = await userService.getListData(id);
			console.log(data);
			setListData(data?.data?.result)
		} catch (error) {
			console.log(error)
		}
	}
 	async function fetchListContacts() {
		try {
			const data = await userService.getListContacts(id);
			console.log('CONTACTS IN THE LIST: ',data);
			setAllContacts(data?.data?.result?.members?.map(item =>({
				full_name:item?.full_name,
				email_address:item?.email_address,
				status:item?.status
			})))
		} catch (error) {
			console.log(error)
		}
	}

	async function handleAddNewContact () {
		try {
			const data = await userService.handleAddContact(contactData);
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdateAudience () {
		try {
			console.log(listData);

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchListData();
		fetchListContacts();
	},[])
	return (
	<div className='min-h-screen'>
		
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
			<div><h3>{listData?.name}</h3></div>
			<div className='flex gap-[10px]'>
				<Link to={"/manage/audience/new"}><button className='common-button common-button-yellow rounded-full'>Create a New Listing</button></Link>
				<button onClick={showModal} className='common-button common-button-yellow rounded-full'>Add Contact</button>
				<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
					style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
					initialValues={{
						list_id:id
					}}
				>
					<Form.Item name='list_id' label="List id">
						<Input onChange={(e) => {setContactData(prev =>({...prev, list_id:e.target.value}))}} value={contactData?.id} />
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
			</div>
		</div>
		<section className='w-full'>
			<Table columns={columns} dataSource={allContacts} />
		</section>
		<section className='w-full'>
		<Form
				onFinish={handleUpdateAudience}
				id='campaign-form'
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
				<Form.Item label="List Title">
					<Input onChange={(e)=>{setListData(prev =>({...prev, name:e.target.value}))}} value={listData?.name} />
				</Form.Item>
				<div className='bold'>Campaign Defaults :</div>
				
				<Form.Item label="From Name">
					<Input onChange={(e)=>{setListData(prev =>({...prev, from_name:e.target.value}))}} value={listData?.campaign_defaults?.from_name} />
				</Form.Item>
				<Form.Item label="From Email">
					<Input onChange={(e)=>{setListData(prev =>({...prev, from_email:e.target.value}))}} value={listData?.campaign_defaults?.from_email} />
				</Form.Item>
				<Form.Item label="Subject Line">
					<Input onChange={(e)=>{setListData(prev =>({...prev, subject:e.target.value}))}} value={listData?.campaign_defaults?.subject} />
				</Form.Item>
				
				<div className='bold'>Contact Information :</div>
				<Form.Item label="Address 1">
					<Input onChange={(e)=>{setListData(prev =>({...prev, address1:e.target.value}))}} value={listData?.contact?.address1} />
				</Form.Item>
				<Form.Item label="Address 2">
					<Input onChange={(e)=>{setListData(prev =>({...prev, address2:e.target.value}))}} value={listData?.contact?.address2} />
				</Form.Item>
				<Form.Item label="City">
					<Input onChange={(e)=>{setListData(prev =>({...prev, city:e.target.value}))}} value={listData?.contact?.city} />
				</Form.Item>
				<Form.Item label="Company">
					<Input onChange={(e)=>{setListData(prev =>({...prev, company:e.target.value}))}} value={listData?.contact?.company} />
				</Form.Item>
				<Form.Item label="Country">
					<Input onChange={(e)=>{setListData(prev =>({...prev, country:e.target.value}))}} value={listData?.contact?.country} />
				</Form.Item>
				<Form.Item label="Phone">
					<Input onChange={(e)=>{setListData(prev =>({...prev, phone:e.target.value}))}} value={listData?.contact?.phone} />
				</Form.Item>
				<Form.Item label="State">
					<Input onChange={(e)=>{setListData(prev =>({...prev, state:e.target.value}))}} value={listData?.contact?.state} />
				</Form.Item>
				<Form.Item label="Zip Code">
					<Input onChange={(e)=>{setListData(prev =>({...prev, zip:e.target.value}))}} value={listData?.contact?.zip} />
				</Form.Item>
		</Form>
		<div className='flex items-center justify-start pl-[200px] rounded-full pb-[25px]'>
			<button onClick={handleUpdateAudience} className='common-button common-button-yellow rounded-full'>Update</button>
		</div>
		</section>
	</div>
  )
}

export default Audience