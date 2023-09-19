import { Button, Dropdown, Space, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import userService from "../services/userServices"
import {format, parseISO} from "date-fns" 
import { enqueueSnackbar } from 'notistack'


const Campaigns = () => {
	const [refreshTrigger, setRefreshTrigger] = useState(false);

	const more_items = [
		{
			key: '1',
			label: (
			  <div>
				Send Test Email
			  </div>
			),
		},
		{
			key: '2',
			label: (
				<div>
				Schedule Launch
				</div>
			),
		},
	]
	const columns =[
		{
			title: 'Created',
			dataIndex: 'campaign_created_time',
			key: 'campaign_created_time',
		},
		{
			title: 'Campaign Name',
			dataIndex: 'campaign_name',
			key: 'campaign_name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Campaign Status',
			dataIndex: 'campaign_status',
			key: 'campaign_status',
		},
		{
			title: 'Total Recepients',
			dataIndex: 'total_recepients',
			key: 'total_recepients',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render:(text, record) => (
				<div className='flex gap-[10px]'>
					{(record.campaign_status === "save" || record.campaign_status === "paused") && (<button onClick={()=>{handleSendCampaign(record.campaign_id)}} className='border-none rounded-[5px] bg-green-500 p-[4px_12px]'>Send</button>)}
					<button onClick={()=>{handleDeleteCampaign(record.campaign_id)}} className='border-none rounded-[5px] bg-rose-600 text-white p-[4px_12px]'>Delete</button>
					<button onClick={() =>{handleSendTestMail(record.campaign_id)}} className='border-none rounded-[5px] bg-yellow-main p-[4px_12px]'>Send Test Email</button>
				</div>
			)
		},
	]
	const [allCampaigns, setAllCampaigns] = useState([])

	async function handleSendCampaign(campaign_id){
		try {
			const data = await userService.sendCampaign(campaign_id);
			console.log(data)
			setRefreshTrigger(prev =>!prev)
		} catch (error) {
			console.log(error)
		}
	}
	async function handleSendTestMail(campaign_id) {
		try {
			console.log('Sendign Test Email', campaign_id);
			const data = await userService.sendTestMail(campaign_id);
			console.log(data)
			if(data?.status === 200){
				enqueueSnackbar("Test Email Sent", {variant:'success'})
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function handleDeleteCampaign(campaign_id){
		try {
			const data = await userService.deleteCampaign(campaign_id);
			console.log(data);
			setRefreshTrigger(prev =>!prev);
		} catch (error) {
			console.log(error)
		}
	}

	const fetchAllCampaigns = async () => {
		try {
			const data = await userService.getAllCampaigns();
			console.log('CAMPAIGNS GETTING RESULT', data)
			setAllCampaigns(data?.data?.result?.campaigns?.map(item =>({
				campaign_id:item?.id,
				campaign_created_time:format(parseISO(item?.create_time), "dd-MM-yyyy hh:mm aa"),
				campaign_name:item?.settings?.title,
				campaign_status:item?.status,
				total_recepients:item?.recipients?.recipient_count,
			})));
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		fetchAllCampaigns();
	},[refreshTrigger])

  return (
	<div className='min-h-screen'>
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
			<div><h3>Campaigns</h3></div>
			<Link to={"../campaign/new"}><button className='common-button common-button-yellow rounded-full'>Start a New Campaign</button></Link>
		</div>
		<section className='w-full'>
			<Table columns={columns} dataSource={allCampaigns} />
		</section>
	</div>
  )
}

export default Campaigns