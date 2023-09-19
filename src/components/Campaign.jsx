import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Form, Select, Steps, Tag, Switch, Upload, } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import {useEffect, useState} from 'react';
import userService from "../services/userServices";
import { enqueueSnackbar } from 'notistack'
import { Editor } from '@monaco-editor/react';

const Campaign = () => {
	const [campaignData, setCampaignData] = useState({});
	const [allListings, setAllListings] = useState([]);
	const [allTemplates, setAllTemplates] = useState([]);
	
	async function fetchAllListings() {
		try {
			const data = await userService.getAllListings();
			setAllListings(data?.data?.result)
		} catch (error) {
			console.log(error)
		}
	}

	async function handleAddCampaign() {
		try {
			const data = await userService.addNewCampaign(campaignData);
			console.log('CAMPAIGN ADDING RESULT : ', data);
			if(data?.status === 200) {
				enqueueSnackbar("Campaign Added Successfully.", {variant:'success'})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleBeforeUpload = (file) => {
		// You can perform checks on the file here (e.g., file type, size)
		// If the checks pass, return true to allow the upload; otherwise, return false.
		// For example, to only allow .jpg and .png files:
		const allowedFileTypes = ['image/jpeg', 'image/png'];
		if (allowedFileTypes.includes(file.type)) {
		  return true;
		} else {
		  message.error('Invalid file type. Please upload a .jpg or .png file.');
		  return false;
		}
	};
	
	const handleUpload = (info) => {
		if (info.file.status === 'done') {
		  // The file has been successfully uploaded
		  setCampaignData(prev => ({...prev, social_image:info.file.originFileObj}));
		}
	};

	async function fetchAllTemplates() {
		const data = await userService.getAllTemplates();
		console.log(data);
		setAllTemplates(data?.data?.result?.templates)
	}

	useEffect(() =>{
		fetchAllListings()
		fetchAllTemplates()
	},[])
	console.log(campaignData)
	const steps = [
		{
			title: 'Add Details',
			content: 
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
			<Form.Item  label="Campaign Title">
				<Input value={campaignData?.title} onChange={(e)=>{setCampaignData(prev =>({...prev, title:e.target?.value}))}} />
			</Form.Item>
			<Form.Item label="Campaign Type">
				<Select defaultValue={"regular"} onSelect={(e)=>{setCampaignData(prev =>({...prev, type:e}))}}>
					<Select.Option value="regular">Regular</Select.Option>
					<Select.Option value="variate">Variate</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item label="Subject Line">
				<Input value={campaignData?.subject_line} onChange={(e)=>{setCampaignData(prev =>({...prev, subject_line:e.target?.value}))}} />
			</Form.Item>
			<Form.Item  label="Preview Text">
				<Input value={campaignData?.preview_text}  onChange={(e)=>{setCampaignData(prev =>({...prev, preview_text:e.target?.value}))}} />
			</Form.Item>
			<Form.Item  label="Sender's Name">
				<Input value={campaignData?.from_name} onChange={(e)=>{setCampaignData(prev =>({...prev, from_name:e.target?.value}))}} />
			</Form.Item>
			<Form.Item label="Reply To Email">
				<Input value={campaignData?.reply_to} onChange={(e)=>{setCampaignData(prev =>({...prev, reply_to:e.target?.value}))}} />
			</Form.Item>
			<Form.Item label="Choose Email Template">
				<Select onSelect={(e)=>{setCampaignData(prev =>({...prev, template_id:e}))}} >
					{
						allTemplates?.map(item => (
							<Select.Option value={item?.id}>{item?.name}</Select.Option>
						))
					}
				</Select>
			</Form.Item>
			<Form.Item  label="Custom Email Template">
				<Editor 
					height='300px'
					language="html"
					theme="light"
					value={campaignData?.custom_email_template}
					defaultValue='<!-- Write your HTML code here -->'
					className='p-[10px]'
				/>
        	</Form.Item>
		</Form>,
		},
		{
			title: 'Choose Recepients',
			content: 
			<div>
			<Form

				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
				<Form.Item name={"list_id"} label="Recepients">
					<Select value={campaignData?.list_id} onChange={(e)=>{setCampaignData(prev =>({...prev, list_id:e}))}} >
						{
							allListings?.map(item => (
								<Select.Option value={item?.id}>{item?.id}</Select.Option>
							))
						}
					</Select>
				</Form.Item>
			</Form>
			<div style={{ fontWeight: 'bolder' }}> Search Recepients </div>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
				<Form.Item label="Recepients">
					<Input.Search
						placeholder="input search text"
						onSearch={() =>{}}
						style={{
							width: 945,
						}}
					/>
				</Form.Item>
			</Form>
			<div style={{ fontWeight: 'bolder' }}> Add Recipients by Tag:</div>

			<div>
				<span style={{ fontWeight: 'bolder' }} className='inline-block popularTags'>Popular Tags:</span>
				<span className='inline-block'>
					<Tag color="#625bf8">Tag1</Tag>
					<Tag color="#625bf8">Tag1</Tag>
					<Tag color="#625bf8">Tag1</Tag>
				</span>
			</div>
			<div style={{ fontWeight: 'bolder' }}> Search Tags </div>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
				<Form.Item label="Tag Name">
					<Input.Search
						placeholder="input search text"
						onSearch={() =>{}}
						style={{
							width: 945,
						}}
					/>
				</Form.Item>
			</Form>
			</div>
			,
		},
		{
			title: 'Social and Tracking',
			content: 
			<div>
				<div>Social Card</div>
				<div><p>The preview for the campaign, rendered by social networks like Facebook and Twitter.</p></div>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
					style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
				>
					<Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={()=>{}}>
						<Upload beforeUpload={handleBeforeUpload} onChange={handleUpload}>
							<div>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
							</div>
						</Upload>
					</Form.Item>
					<Form.Item label="Title" name={"social_card_title"}>
						<Input value={campaignData?.social_card_title} onChange={(e)=>{ setCampaignData(prev => ({...prev, social_card_title:e.target.value})) }} />
					</Form.Item>
					<Form.Item label="Description" name={"social_card_description"} >
						<Input value={campaignData?.social_card_description} onChange={(e)=>{ setCampaignData(prev => ({...prev, social_card_description:e.target.value})) }} />
					</Form.Item>
				</Form>
				<div style={{ fontWeight: 'bolder' }}>Tracking Options:</div>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
					style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
				>
					<Form.Item label="Html Clicks" valuePropName="checked">
          				<Switch />
        			</Form.Item>
					<Form.Item label="Text Clicks" valuePropName="checked">
          				<Switch />
        			</Form.Item>
					<Form.Item label="Google Analytics Slug">
						<Input />
					</Form.Item>
				</Form>
			</div>
			,
		},
	];
	const [current, setCurrent] = useState(0);
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));
	return (
		<div className='min-h-screen'>
			<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
				<div><h3>Create a New Campaign</h3></div>
			</div>
			<div className='p-[20px]'>
				<Steps current={current} items={items} />
				<div className='mt-[25px]'>{steps[current].content}</div>
				<div
					className='mt-[25px] flex gap-[15px]'
				>
					{current < steps.length - 1 && (
						<button className='common-button bg-yellow-main common-button-yellow rounded-full' onClick={() => next()}>
							Next
						</button>
					)}
					{current === steps.length - 1 && (
						<button className='common-button common-button-green rounded-full bg-dark-green text-yellow-main' onClick={handleAddCampaign}>
							Done
						</button>
					)}
					{current > 0 && (
						<button
							className='common-button rounded-full'
							onClick={() => prev()}
						>
							Previous
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Campaign