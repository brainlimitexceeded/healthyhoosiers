import styles from "./styles.module.css";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AiFillPlusSquare} from "react-icons/ai";
import {AiFillEye} from "react-icons/ai";
import { spacing } from '@mui/system';

const settings = ["logout"];

const Main = () => {

	const {userType, contentName} = useParams();
	const [searchResult, setSearchResult] = useState(null);
	const [countResult, setCountResult] = useState(-1);
	const [videoResult, setVideoResult] = useState(null);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/";
	};

	//Start changes
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	  };
	
	  const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	  }; 
	
	  const handleSettings = (event) =>
	  {
		console.log(event.currentTarget.name);
			localStorage.removeItem("token");
			window.location= "/";
	  };

	const {userName} = useParams();

	const [data, setData] = useState({
		professionals: "all",
		moi: "all",
		speciality: "all",
		gender: "all",
		age_of_content: "0",
		search :"all",
	});
	//End changes

	// const [showVideoResult, setShowVideoResult] = useState(false);
	// const [videoList, setVideoList] = useState(null);
	useEffect(() => {
		const getVideo = async () => {
		// const subContentResponse = await axios.get(
		// 	`http://ec2-18-218-81-23.us-east-2.compute.amazonaws.com:8080/api/subcontent/${contentName}`
		// 	);
		  const subContentName = "dancing";
		  const videoResponse = await axios.get(
			`http://3.19.53.25:8080/api/videostream/videos/${subContentName}`
		  );
		  setVideoResult(videoResponse.data);
		  console.log(videoResponse)
		};
		getVideo();
	  }, []);
	useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			`http://3.19.53.25:8080/api/subcontent/${contentName}`
		  );
		  setSearchResult(searchResponse.data);
		};
		getData();
	  }, []);

	  useEffect(() => {
		const getCount = async () => {
		  const countResponse = await axios.get(
			`http://3.19.53.25:8080/api/enrollmentCount/${contentName}`
		  );
		  setCountResult(countResponse.data);
		  console.log(countResponse.data);
		};
		getCount();
	  }, []);	  
	  function VideoResult(props) {
		const { videoResult } = props;
	  
		if (!videoResult) {
		  return <p>Loading video...</p>;
		}
	  
		return (
		  <div className={styles.video_container}>
			{videoResult.videos.map((item) => (
			  <div key={item.fileUrl} style={{ width: '320px' }} className={styles.videodiv}>
				{/* <h3>{item.filename}</h3> */}
				<video controls style={{ width: '70%',height:"50%" }}>
				  <source src={item.fileUrl} type="video/mp4" />
				</video>
			  </div>
			))}
			
		  </div>
		);
	  }
	  
	  
	  
	  function SearchResult(props) {
		const { data } = props;
		console.log(countResult);
		
			return (
				<div>
					<div>
						{data.map(item => (
							<div key={item.id}>
								<h3> Theme: {item.subContentName}</h3>
								<p> Calories to burn: {item.subContentCalories}</p>
								<p> Excercises to do: {item.subContentExercises}</p>
								<p> Day: {item.day}</p>
								<VideoResult
									videoResult={videoResult}
									subContentName={item.subContentName}
									/>
							</div>
						))}
					</div>
					<div>
						{userType === "Staff" ? <h4>Number of Customers Enrolled: {countResult}</h4>:<p></p>}
					</div>
				</div>
			);
		}


	return (
		<div className={styles.main_container}>
			<AppBar position="static">
              <Container maxWidth='xxl'>
                <Toolbar disableGutters>
                  <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></HomeIcon>
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href={`/customerDashboard/${userName}`}
                      sx={{
                        mr: 19,
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

                    <Box sx={{ flexGrow: 0 }} justifyContent="flex-end">
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
                          <Avatar />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem key={setting} onClick={handleSettings} name={setting}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                </Toolbar>
              </Container>
            </AppBar>
			<div className={styles.search_container}>
				<div className={styles.result_container}>
				<div className={styles.result_margin}>
				{searchResult && <SearchResult data={searchResult} />}
				{videoResult && <VideoResult videoResult={videoResult} />}	
				</div>
				</div>
			</div>
		</div>
	);
};

export default Main;