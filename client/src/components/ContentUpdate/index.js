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

	let {userType, userName, contentName} = useParams();
    let name = "";
	const settings = ["logout"];

    const [data, setData] = useState({
		type: "",
		contentName: "",
		contentCalories: 0,
		speciality: [],
		gender: [],
		eligible_age: 0,
        professional: "",
	});   
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

    if (userName=="dinesh@gmail.com"){
        name = "dinesh";
    }else if(userName == "gowri@gmail.com"){
        name = "shankar";
    }

	const [searchResult, setSearchResult] = useState(null);

	useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			 `http://3.19.53.25:8080/api/search/${contentName}/all/all/all/all/0`
		  );
		  setSearchResult(searchResponse.data);
		};
		getData();
	  }, []);

	  console.log(searchResult);
	  
	if(searchResult != null && data.type == ""){
		let newType = searchResult[0].contentTags[1];
		let newContentName = searchResult[0].contentName;
		let newContentCalories = searchResult[0].contentCalories;
		let newContentEligibleAge = searchResult[0].contentAge;
		console.log(searchResult);
		setData(data.type = newType, data.contentName = newContentName, data.contentCalories = newContentCalories, data.eligible_age = newContentEligibleAge, data.professional = name);
		console.log(data);
	  } 

	const Checkbox = (event) => {

    const [isChecked, setIsChecked] = useState(false);

    if (event.name === "speciality") {
      const checkHandler = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
          console.log(event.value);
		if (!data.speciality.includes(event.value)) {
            data.speciality.push(event.value);
          }
        } else {
          if (data.speciality.includes(event.value)) {
            data.speciality.splice(data.speciality.indexOf(event.value), 1);
          }
        }
        console.log(data.speciality);
      };

      return (
        <div>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={checkHandler}
          />
          <label htmlFor="checkbox">{event.value}</label>
        </div>
      );
    } else {
      const checkHandler = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
          console.log(event.value);
          if (!data.gender.includes(event.value)) {
            data.gender.push(event.value);
          }
        } else {
          if (data.gender.includes(event.value)) {
            data.gender.splice(data.gender.indexOf(event.value), 1);
          }
        }
        console.log(data.gender);
      };

      return (
        <div>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={checkHandler}
          />
          <label htmlFor="checkbox">{event.value}</label>
        </div>
      );
    }
  };

	const [error, setError] = useState("");
	const navigate = useNavigate();    

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location= "/";
	};

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data);
    };

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const url = `http://3.19.53.25:8080/api/updateContent/${name}/${contentName}`;
			const { data: res } = await axios.put(url, data);
			let newUrl = "";
			if(userType === "Staff"){
			 newUrl = `http://13.59.74.47/staffhomepage/${userName}`;
			}else if(userType === "Admin"){
				 newUrl = `/adminhomepage/${userName}`;
			}
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

					<form className={styles.form_container} onSubmit = {handleUpdate}>
						
						<h1>Update Content</h1>
						<h3>Created By Staff: {name.toUpperCase()}</h3>
					    
						<div>
						<lable>
                            Content Type	: 
						<select onChange={handleChange}
									value={data.type}
									placeholder="Content Type"
									name="type"
									className={styles.select_dropdown}>
								<option value="plans">Plan</option>
								<option value="videos">Video</option>
						</select>
						</lable>
                        </div>
                        
						<div>
                        <lable>
                        Content Name	: 
						<input
							type="text"
							placeholder="Content Name"
							name="contentName"
							onChange={handleChange}
							value={data.contentName}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>
                        
						<div>
                        <lable>
                        Content Calories	: 
						<input
							type="number"
							placeholder="Content Calories"
							name="contentCalories"
							onChange={handleChange}
							value={data.contentCalories}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>

						<div>
							<lable> Speciality	:     

							<Checkbox name="speciality" value="Yoga">Yoga</Checkbox>
							<Checkbox name="speciality" value="Cardio">Cardio</Checkbox>
							<Checkbox name="speciality" value="Strength">Strength</Checkbox>
							<Checkbox name="speciality" value='Aerobics'>Aerobics</Checkbox>
							</lable>
						</div>		

						<div>
							<lable> Gender	:    
								
							<Checkbox name="gender" value="Male">Male</Checkbox>
							<Checkbox name="gender" value="Female">Female</Checkbox>
							</lable>
						</div>					
			

                        <div>
                        <lable>
                            Eligible Age	: 
                        <input
							type="eligible_age"
							placeholder="Eligible Age"
							name="eligible_age"
							onChange={handleChange}
							value={data.eligible_age}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>

						{error && <div className={styles.error_msg}>{error}</div>}
                        
						<div>
						<button type="submit" className={styles.black_btn_main} onClick = {handleUpdate}>
							Update
						</button>
                        </div>
						
					</form>            
                </div>
		</div>
	);
};

export default Main;