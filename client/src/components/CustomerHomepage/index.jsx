import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import * as React from 'react';

//for frontend changes
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

	// for front end  start
	// for front end end

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
	// const {userName} = useParams();
	const username = userName.split("@")[0];
	const [data, setData] = useState({
		professionals: "all",
		moi: "all",
		speciality: "all",
		gender: "all",
		age_of_content: "0",
		search :"all",
	});


	const handleEnroll = async (e) => {
		e.preventDefault();
		let nameOfEvent = e.target.getAttribute('name');
		try {
			const url = `http://3.19.53.25:8080/api/userEnrollment/${userName}/${nameOfEvent}`;
			const { data: res } = await axios.post(url, data);
			const newUrl = `/customerhomepage/${userName}`;
			window.location = newUrl;
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const handleDetails = (event) => {
		let nameOfEvent = event.target.getAttribute('name');
		const url = history.push(`/content/${nameOfEvent}`);
		console.log(url);
		window.location=url;
	};

	const [searchResult, setSearchResult] = useState(null);
	const [searchPreferences, setSearchPreferences] = useState(null);

	const [error, setError] = useState("");
	const navigate = useNavigate();


	const handleChange = (event) => {
		//console.log(input.name);
		setData({ ...data, [event.target.name]: event.target.value });
		console.log(data);
	};
	// const [isLoading, setIsLoading] = useState(false);
	// const [isLoadingVideoList, setIsLoadingVideoList] = useState(false);
	// const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
	// const [videoList, setVideoList] = useState([]);
	
	const handleReset = () => {
		window.location.reload();
	};
	
	const [showVideoResult, setShowVideoResult] = useState(false);
	const [videoList, setVideoList] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	
	const handleSearch = async (e) => {
		e.preventDefault();

		if(data.search ==""){
			data.search = "all";
		}
		else if(data.moi=="videos"){
			
			// setIsLoadingSearchResult(false);
			try{
			// setIsLoadingVideoList(true);
			const videoUrl = `http://3.19.53.25:8080/api/videostream/videos`;
      		const videoResponse = await axios.get(videoUrl);
			setVideoList(videoResponse.data);
			// setIsLoadingVideoList(false);
			setShowVideoResult(true);
        	setSearchResult(null);
			setSubmitted(true);
			
			
			console.log(videoResponse.data);
			}
			catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
		else{
			
			//setIsLoadingVideoList(false);
			try {
				
				// setIsLoadingSearchResult(true);
				let url = `http://3.19.53.25:8080/api/search/${data.search}/${data.professionals}/${data.moi}/${data.speciality}/${data.gender}/${data.age_of_content}`;
				const searchResponse = await axios.get(url);
				setSearchResult(searchResponse.data);
				setSubmitted(true);
				// setIsLoadingSearchResult(false);
				// setShowVideoResult(true);
        		// setSearchResult(null);
				setShowVideoResult(false);
        		setVideoList(null);
				console.log(searchResponse.data);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
		// console.log(data);
		
	};

	useEffect(() => {
		async function fetchPreferences() {
		  const response = await axios.get(`http://3.19.53.25:8080/api/recommendations/${userName}`);
		  setSearchPreferences(response.data);
		}
		fetchPreferences();
		console.log(searchPreferences);
	  }, []); 	

	
	
	function VideoResult(props) {
		const { data } = props;
	  
		// if (!Array.isArray(data)) {
		//   return null;
		// }
		console.log("In video");
		return (
			<div style={{ display: 'flex', flexDirection: 'row' }}>
			{data.videos.map((item) => (
			  <div key={item.videoUrl} style={{ width: '320px' }}>
				{/* <h3>{item.filename}</h3> */}
				<video controls style={{ width: '70%',height:"50%" }}>
				  <source src={item.videoUrl} type="video/mp4" />
				</video>
			  </div>
			))}
		  </div>
		);
	  }

	function SearchResult(props) {
		const { data } = props;

			return (
					<div>
						<Typography                      
						variant="h6"
						noWrap
						component="a"
						sx={{
							mr: 19,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'futura',
							fontWeight: 500,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
				  }}>
						Search Content :
					</Typography>						
					{error && <div className={styles.error_msg}>{error}</div>}
					<TableContainer component={Paper} sx={{padding: 5, MarginOutlined:"black"}}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>S:No: </TableCell>
							<TableCell align="left">Content Name</TableCell>
							<TableCell align="left">No. of Calories</TableCell>
							<TableCell align="left">Approval Status</TableCell>
							<TableCell align="left">Actions</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{data.map((data,index) => (
							<TableRow
							key={data.index}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
							<TableCell component="th" scope="row">
								{index + 1}
							</TableCell>
							<TableCell align="left">{data.contentName}</TableCell>
							<TableCell align="left">{data.contentCalories}</TableCell>
							<TableCell align="left">{data.contentApproval}</TableCell>
							<TableCell align="left"><Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="button" value ="View"   onClick={handleDetails} name = {data.contentName}><AiFillEye /></Button>
											<Button className={styles.btn_main} sx={{m: 2}}  variant="contained" color="primary" type="button" value= "Enroll" onClick={handleEnroll}  name = {data.contentName} ><AiFillPlusSquare /></Button></TableCell>
							</TableRow>
						))}
						</TableBody>
					</Table>
					</TableContainer>	
					</div>
			);
		}	

		function PreferenceSearch(props) {
			const { data } = props;
	
				return (
						<div>	
						<Typography                      
						variant="h6"
						noWrap
						component="a"
						sx={{
							mr: 19,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'futura',
							fontWeight: 500,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
				  }}>
						Recommended Content :
					</Typography>
						<TableContainer component={Paper} sx={{padding: 5 , MarginOutlined:"black"}}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
							<TableRow>
								<TableCell>S:No: </TableCell>
								<TableCell align="left">Content Name</TableCell>
								<TableCell align="left">No. of Calories</TableCell>
								<TableCell align="left">Approval Status</TableCell>
								<TableCell align="left">Actions</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{data.map((data,index) => (
								<TableRow
								key={data.index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell align="left">{data.contentName}</TableCell>
								<TableCell align="left">{data.contentCalories}</TableCell>
								<TableCell align="left">{data.contentApproval}</TableCell>
								<TableCell align="left"><Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="button" value ="View"   onClick={handleDetails} name = {data.contentName}><AiFillEye /></Button>
												<Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="button" value= "Enroll" onClick={handleEnroll}  name = {data.contentName} ><AiFillPlusSquare /></Button></TableCell>
								</TableRow>
							))}
							</TableBody>
						</Table>
						</TableContainer>	
						</div>
				);
			}			
	

	return (
		<div>
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

					<lable>Search :
						<input
							type="text"
							placeholder="Search"
							name="search"
							onChange={handleChange}
							value={data.search}
							required
						/>
					</lable>					

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

		<form>
			<Typography variant="h6">Filter :	</Typography>
			
			<Grid>
			<FormControl>
			<FormLabel>Professionals	:		
			<Select name="professionals" value={data.professionals}  onChange={handleChange}>
						<MenuItem key= "all" value="all">All</MenuItem>
						<MenuItem key= "dinesh"value="dinesh">Dinesh</MenuItem>
						<MenuItem key= "shankar" value="shankar">Shankar</MenuItem>
						<MenuItem key= "anirudh" value="anirudh">Anirudh</MenuItem>
						<MenuItem key= "mana" value="mana">Mana</MenuItem>			
			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>
			
			<Grid>
			<FormControl>
			<FormLabel>Mode of Instruction	:		
			<Select value={data.moi} onChange={handleChange} name="moi">
						<MenuItem value="all">All</MenuItem>
						<MenuItem value="videos">Videos</MenuItem>
						<MenuItem value="plans">Plans</MenuItem>		
			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>

			<Grid>
		    <FormControl>
			<FormLabel>Speciality	:		
			<Select value={data.speciality} onChange={handleChange} name="speciality">
						<MenuItem value="all">All</MenuItem>
						<MenuItem value="yoga">Yoga</MenuItem>
						<MenuItem value="zumba">Zumba</MenuItem>
						<MenuItem value="strength">Strength</MenuItem>
						<MenuItem value="cardio">Cardio</MenuItem>	
			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>
		
			
			<Grid>
			<FormControl>
			<FormLabel>Gender	:		
			<Select  value={data.gender} onChange={handleChange} name="gender">
						<MenuItem value="all">All</MenuItem>
						<MenuItem value="male">Male</MenuItem>
						<MenuItem value="female">Female</MenuItem>
			</Select> 
			</FormLabel>	
			</FormControl>
			</Grid>

			<Grid>
			<FormControl>
			<FormLabel>Age of Content:
				<TextField
						type="text"
						value={data.age_of_content}
						placeholder="Age of Conetent"
						name="age_of_content"
						//className={styles.input}
						onChange={handleChange}>
				</TextField>
			</FormLabel>
			</FormControl>
			</Grid>

			<Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="submit" onClick={handleSearch}>
							Search
			</Button>

			<Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="button" onClick={handleReset}>
							Reset
			</Button>	

			{showVideoResult && <VideoResult data={videoList} />}
      		{!showVideoResult && searchResult && <SearchResult data={searchResult} />}
			  {searchPreferences && <PreferenceSearch data={searchPreferences} />}
			
		</form>	
		</div>	
	);
};

export default Main;

