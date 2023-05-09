import styles from "./styles.module.css";
import React, { useState, useEffect , Component} from 'react';
import { Link, useNavigate , useParams} from "react-router-dom";
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
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';





const Main = () => {
	const settings = ["logout"];


	const {userName} = useParams();
	const [contents, setContent]= useState(null);
	// const{subContentName} = useParams();
	
	let proffessional = "";

	if(userName == "gowri@gmail.com"){
		proffessional = "shankar"
	}

	const [data, setData] = useState({
		contentName: "Every Day Cardio",
		subContentName: "",
		day: "Monday",
		subContentExercises: "",
		subContentCalories: 0,
		subContentImage: "",
	});

	const [error, setError] = useState("");
  
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location= "/";
	};
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

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data);
    };

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const url = `http://3.19.53.25:8080/api/subcontent`;
			const { data: res } = await axios.post(url, data);
			const newUrl = `/staffhomepage/${userName}`;
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
	const handleFileInputChange = (event) => {
		setFileInput(event.target.files[0]);
	};
	const [fileInput, setFileInput] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleUploadVideo = async (event) => {
		event.preventDefault();
		setIsLoading(true);
	  
		const formdata = new FormData();
		formdata.append("file", fileInput);
		formdata.append("subContentName", data.subContentName);
		console.log(fileInput);
		data.contentImage= fileInput.name;
		// data.subContentName= subContentName;
		console.log(data.contentImage);
		try {
		  const response = await axios.post(`http://3.19.53.25:8080/api/UploadToBucket/upload/${data.subContentName}`, formdata, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		  });
		  console.log(response.data);
		  setIsLoading(false);
		} catch (error) {
			setError(error.data);
			// setUploadStatus('Could not Upload file!');
		  console.error(error);
		}
	  };

	useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			 `http://3.19.53.25:8080/api/search/${proffessional}`
		  );
		  setContent(searchResponse.data);
		  console.log(contents);
		};
		getData();
	  }, []);

	  function ConentDropdown(props) {
		const { data } = props;
			return (
				<div>
					<lable> Content Name	:
					<select value={data.contentName} onChange={handleChange} name="contentName" required className={styles.select_dropdown} placeholder="contentName">
					{data.map(opt => (<option>{opt.contentName}</option>))}
					</select>
					</lable>
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
                      href={`/staffhomepage/${userName}`}
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
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, float: 'right' }}>
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
            <div className={styles.create_container}>
					<form className={styles.form_container} onSubmit = {handleCreate}>
						<h1>Create Subcontent</h1>

						{contents && <ConentDropdown data={contents} />}

						<div>
                        <lable>
                        Subcontent Name		: 
						<input
							type="text"
							placeholder="Subcontent Name"
							name="subContentName"
							onChange={handleChange}
							value={data.subContentName}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>	

						<div>
						<lable>
                            Workout Day		: 
						<select onChange={handleChange}
									value={data.day}
									placeholder="day"
									name="day"
									className={styles.select_dropdown}>
								<option value="Monday">Monday</option>
								<option value="Tuesday">Tuesday</option>
								<option value="Wednesday">Wednesday</option>
								<option value="Thursday">Thursday</option>
								<option value="Friday">Friday</option>
								<option value="Saturday">Saturday</option>
								<option value="Sunday">Sunday</option>
						</select>
						</lable>
                        </div>			

						<div>
                        <lable>
                        Subcontent Excercises		: 
						<input
							type="text"
							placeholder="Subcontent Excercises"
							name="subContentExercises"
							onChange={handleChange}
							value={data.subContentExercises}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>															
                        
						<div>
                        <lable>
                        Subcontent Calories		: 
						<input
							type="number"
							placeholder="Subcontent Calories"
							name="subContentCalories"
							onChange={handleChange}
							value={data.subContentCalories}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
                        <div>				
							<input type="file" onChange={handleFileInputChange} />
							<button className={styles.black_btn_main} onClick={handleUploadVideo}>Upload</button>
						</div>
						<div>
						<button type="submit" className={styles.black_btn_main} onClick = {handleCreate}>
							Create
						</button>
                        </div>
						
					</form>            
                </div>
		</div>
	);
};

export default Main;