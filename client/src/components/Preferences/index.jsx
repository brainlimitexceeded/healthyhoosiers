import styles from "./styles.module.css";
import React, { useState, useEffect , Component} from 'react';
import { Link, useNavigate , useParams} from "react-router-dom";
import axios from "axios";

//for new front end changes
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


const settings = ["logout"];

const Main = () => {


	const [anchorElUser, setAnchorElUser] = useState(null);

  
	const {userName} = useParams();
	const username = userName.split("@")[0];
	const [data, setData] = useState({

		email: userName,
		type: "plans",
		workoutGoal: "Cardio",
		workoutIntensity: "high",

	});


	const [error, setError] = useState(""); 

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

	  const handleChange = (event) => {
		//console.log(input.name);
		setData({ ...data, [event.target.name]: event.target.value });
		console.log(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://3.19.53.25:8080/api/preferences/${userName}`;
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
		console.log(data);
	};

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

                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
					<Typography variant="p" sx={{ flexGrow: 1 }}>
						Welcome, {username}!
					</Typography>
                </Toolbar>
              </Container>
            </AppBar>

            <div className={styles.create_container}>

		<form>
			
			<Typography variant="h6">Preferences :	</Typography>
			
			<Grid>
			<FormControl>
			<FormLabel>Content Type	:		
			<Select name="type" value={data.type} onChange={handleChange}>
						<MenuItem key= "plans" value="plans">Plan</MenuItem>
						<MenuItem key= "videos"value="videos">Videos</MenuItem>		
			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>
			
			<Grid>
			<FormControl>
			<FormLabel>Work Out Goal	:		
			<Select value={data.workoutGoal} onChange={handleChange} name="workoutGoal">
				<MenuItem value="Cardio">Weight Loss</MenuItem>
				<MenuItem value="Yoga">Meditation</MenuItem>
				<MenuItem value="Flexibility">Flexibility</MenuItem>	
				<MenuItem value="Strength">Strenght</MenuItem>
			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>

			<Grid>
		    <FormControl>
			<FormLabel>Workout Intensity	:		
			<Select value={data.workoutIntensity} onChange={handleChange} name="workoutIntensity">

						<MenuItem value="high">High Intensity Workout</MenuItem>
						<MenuItem value="medium">Medium Intensity Workout</MenuItem>
						<MenuItem value="low">Low Intensity Workout</MenuItem>				

			</Select> 
			</FormLabel>
			</FormControl>
			</Grid>
	

			<Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
				Submit Preferences
			</Button>

			</form>	
                
			</div>
		</div>
	);
};

export default Main;