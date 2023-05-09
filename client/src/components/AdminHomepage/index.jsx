import styles from "./styles.module.css";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ButtonGroup from '@mui/material/ButtonGroup';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Main = () => {

	const {userName} = useParams();

	console.log(userName);

	const userType = "Admin";
	const [searchResult, setSearchResult] = useState(null);
	const [countResult, setCountResult] = useState(null);
	const [error, setError] = useState("");
	const username = userName.split("@")[0];
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location= "/";
	};

	const handleManageContents = () => {
		window.location = `/allContents/${userType}/${userName}`;
	};

	const handleChat = () => {
		window.location = `/messenger`;
	};

	const handleApprove = async(event) => {

		try {
			let contentName = event.target.getAttribute('name');
			let contentApproval = "A";
			const url = `http://3.19.53.25:8080/api/searchDisapproved/${contentApproval}/${contentName}`;
			const { data: res } = await axios.put(url);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}			
		window.location.reload();
	};

	const handleDetails = (event) => {
		let nameOfEvent = event.target.getAttribute('name');
		const url = `/content/${nameOfEvent}`;
		console.log(url);
		window.location=url;
	};

	const handleReject = async(event) => {
		let contentName = event.target.getAttribute('name');

		try {
			const url = `http://3.19.53.25:8080/api/deleteContent/${contentName}`;
			await axios.delete(url);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}			
		window.location.reload();
	};

	useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			`http://3.19.53.25:8080/api/searchDisapproved/D`
		  );
		  setSearchResult(searchResponse.data);
		};
		getData();
	  }, []);

useEffect(() => {
		const getCount = async () => {
		  const countResponse = await axios.get(
			`http://3.19.53.25:8080/api/users`
		  );
		  setCountResult(countResponse.data);
		};
		getCount();
	  }, []);

function SearchResult(props) {
		const { data } = props;
		const imagePath = "./"+data.contentImage+".jpeg";
		let cardio = false;
		let strength = false;
		let flexib = false;
		let yoga = false;

		data.map(item => {
			if (item.contentName == "Cardio Training") {cardio = true}
			if (item.contentName == "Strength Training") {strength = true}
			if (item.contentName == "Flexibility Training") {flexib = true}
			if (item.contentName == "Yoga Training") {yoga = true}
		});

			return (
				<div>
					{cardio && 
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
					<Stack direction="row" spacing={2}>
					<Item>
						<Tooltip title = "Cardio">
							<PedalBikeIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Tooltip>
					</Item>
					<ButtonGroup variant="text">
						<Button name="Cardio Training" onClick={handleDetails}>Details</Button>
						<Button name="Cardio Training" onClick={handleApprove}>Approve</Button>
						<Button name="Cardio Training" onClick={handleReject}>Reject</Button>
					</ButtonGroup>
					</Stack>
					</Box>
					}
					{strength && 
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
					<Stack direction="row" spacing={2}>
					<Item>
						<Tooltip title = "Strength">
							<FitnessCenterIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Tooltip>
					</Item>
					<ButtonGroup  variant="text">
						<Button name="Strength Training" onClick={handleDetails}>Details</Button>
						<Button name="Strength Training" onClick={handleApprove}>Approve</Button>
						<Button name="Strength Training" onClick={handleReject}>Reject</Button>
					</ButtonGroup>
					</Stack>
					</Box>
					}
					{flexib && 
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
					<Stack direction="row" spacing={2}>
					<Item>
						<Tooltip title = "Flexibility">
							<SportsMartialArtsIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Tooltip>
					</Item>
					<ButtonGroup  variant="text">
						<Button name="Flexibility Training" onClick={handleDetails}>Details</Button>
						<Button name="Flexibility Training" onClick={handleApprove}>Approve</Button>
						<Button name="Flexibility Training" onClick={handleReject}>Reject</Button>
					</ButtonGroup>
					</Stack>
					</Box>
					}
					{yoga && 
					<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
					<Stack direction="row" spacing={2}>
					<Item>
						<Tooltip title = "Yoga">
							<PedalBikeIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Tooltip>
					</Item>
					<ButtonGroup  variant="text">
						<Button name="Yoga Training" onClick={handleDetails}>Details</Button>
						<Button name="Yoga Training" onClick={handleApprove}>Approve</Button>
						<Button name="Yoga Training" onClick={handleReject}>Reject</Button>
					</ButtonGroup>
					</Stack>
					</Box>
					}
				</div>
			);
		}

function CountResult(props) {
			const { data } = props;
			let cust = 0;
			let admin = 0;
			let staff = 0;
			data.map(item => {
				if (item._id == "Customer") {cust = item.count}
				if (item._id == "Admin") {admin = item.count}
				if (item._id == "Staff") {staff = item.count}
			})
				return (
					<div>
						<br></br>
						<Tooltip sx={{mr: 2}} title="Customer"><Badge badgeContent={cust} color="primary" >
						<AccountCircleIcon color="action" sx={{height: 50, minWidth: 50 }}/>
						</Badge></Tooltip>
						<Tooltip sx={{mr: 2}} title="Staff"><Badge badgeContent={staff} color="primary">
						<BadgeIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Badge></Tooltip>
						<Tooltip sx={{mr: 2}} title="Admin"><Badge badgeContent={admin} color="primary">
						<AddModeratorIcon color="action" sx={{ height: 50, minWidth: 50 }}/>
						</Badge></Tooltip>
					</div>
				);
			}



	return (
		<div align="center">
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
				<Toolbar>
				<HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}></HomeIcon>
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href={`/adminhomepage/${userName}`}
                      sx={{
						mr: 5,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'futura',
                        fontWeight: 500,
                        fontSize: 12,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      Healthy Hoosiers
                    </Typography>
					<Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, mr: 5 }}>
					Admin Home Page
					</Typography>
					<Typography variant="p" sx={{ flexGrow: 1 }}>
						Welcome, {username}!
						</Typography>
					<Button color="inherit" onClick={handleManageContents}>Manage Content</Button>
					<Button color="inherit" onClick={handleChat}>Chat</Button>
					<Button color="inherit" onClick={handleLogout}>Logout</Button>
				</Toolbar>
				</AppBar>
			</Box>
			<br></br>

			<Stack spacing={2}>
				<Item>
					<div>
						<h3> Pending Reviews </h3>
						{searchResult && <SearchResult data={searchResult} />}
					</div>
				</Item>
				<Item>
					<div>
						<h3> Active Users </h3>
						{countResult  && <CountResult data={countResult} />}
					</div>
				</Item>
			</Stack>	
		</div>
	);
};

export default Main;