import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomerDashboard.css';
import { Link, useNavigate , useParams} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

/* changes for front end*/
//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const pages = ['Plan Enrollment', 'Your Preferences', 'Uneroll Plan','Chat'];
const settings = ["logout"];

function CustomerDashboard() {

  const [anchorElUser, setAnchorElUser] = useState(null);

	const {userName} = useParams();
  const [subContents, setSubContents] = useState([]);
  const [contentName, setContentName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");

  // localStorage.setItem('completedDates', '[]');
  // setCompletedDates([]);

  const [completedDates, setCompletedDates] = useState(
    JSON.parse(localStorage.getItem('completedDates') || '[]')
  );
  
  const [endDate, setEndDate] = useState(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
  const [dailyGoal, setDailyGoal] = useState(2000);


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
  const username = userName.split("@")[0];
  const handleMenu = (event) =>
  {
    console.log(event.target.getAttribute('name'));
    if (event.currentTarget.name === "Plan Enrollment"){
      const url = `/customerhomepage/${userName}`;
      console.log(url);
      window.location=url;
    }else if(event.currentTarget.name === "Your Preferences"){
      const url = `/preferences/${userName}`;
      console.log(url);
      window.location=url;     
    }else if(event.currentTarget.name === "Uneroll Plan"){
      axios.delete(`http://3.19.53.25:8080/api/searchEnrollment/${userName}`);
      window.location.reload();
    }
    else if(event.currentTarget.name === "Chat"){
      const url = `/messenger/`;
      console.log(url);
      window.location=url;     
    }

  }; 

	const handleDetails = (event) => {
		let nameOfEvent = event.target.getAttribute('name');
		const url = `/content/${nameOfEvent}`;
		console.log(url);
		window.location=url;
	};

  useEffect(() => {
    async function fetchSubContents() {
      const response = await axios.get(`http://3.19.53.25:8080/api/getContentDetail/${userName}`);
      setSubContents(response.data);
    }
    fetchSubContents();
  }, []);

  useEffect(() => {
    async function fetchContents() {
      const response = await axios.get(`http://3.19.53.25:8080/api/searchEnrollment/${userName}`);
      setContentName(response.data[0].contentName);
    }
    fetchContents();
    console.log(contentName);
  }, []); 


  const tileContent = ({ date, view }) => {
    //Only display subContents for the current week
    const d = new Date();
    var weekDay = d.getDay(),
    diff = d.getDate() - weekDay + (weekDay == 0 ? -6:1);  
    const startWeek = new Date(d.setDate(diff))

    var oneDay = startWeek.getTime() - (24 * 60 * 60 * 1000);
    startWeek.setTime(oneDay);


    if (date < startWeek|| date > endDate) {
      return <div />;
    }

    // Filter subContents based on selected day of the week
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const filteredSubContents = subContents.filter(subContent => subContent.day === day);
    if (filteredSubContents.length === 0) {
      return <div />;
    }

    const completedSubContents = completedDates.filter(
      item => new Date(item.date).toLocaleDateString() === date.toLocaleDateString()
    );
    
    return (
      <div>
        {filteredSubContents.map(subContent => {
          const isCompleted = completedSubContents.some(item => item.subContentId === subContent._id);
          console.log(subContent);
          return (
            <div key={subContent._id}>
          <h3>{subContent.subContentName}</h3>
          <p>{subContent.subContentCalories}</p>
          <Button className="calendar_btn" onClick={handleDetails} name={subContent.subContentName}>Excercises</Button>
          {isCompleted ? (
            <label>Completed</label>
          ) : (
            <>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  let newCompletedDates;
                  if (isChecked) {
                    newCompletedDates = [
                      ...completedDates,
                      { date: date.toLocaleDateString(), subContentId: subContent._id },
                    ];
                  } else {
                    newCompletedDates = completedDates.filter(
                      (item) =>
                        item.date !== date.toLocaleDateString() || item.subContentId !== subContent._id
                    );
                  }
                  localStorage.setItem("completedDates", JSON.stringify(newCompletedDates));
                  setCompletedDates(newCompletedDates);
                }}
              />
              {/* <label>Completed</label> */}
            </>
            )}
        </div>
          );
        })}
      </div>
    );
  };

  const onChange = (date) => {
    setSelectedDate(date);
    setEndDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
  };

  return (
    <div className='dashboard-container'>
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages.map((page) => (
                        <Button
                          key={page}
                          onClick={handleMenu}
                          name={page}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {page}
                        </Button>
                      ))}
                    </Box>

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

      
      <Typography   sx={{
                        mr: 2,
                        fontFamily: 'Arial',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        padding: "10px",
                      }}>

        <p>Enrolled for Plan:{contentName}</p>
        <p>Daily calorie goal: {dailyGoal}</p>
        <p>Calories burned this week: {getCaloriesBurnedThisWeek(subContents, completedDates)}</p>
        <p>Number of sub-contents completed this week: {getSubContentsCompletedThisWeek(subContents, completedDates)}</p>
      </Typography>
      {error && <div className={styles.error_msg}>{error}</div>}
      <div className='calendar'>
        <Calendar value={selectedDate} onChange={onChange} tileContent={tileContent} />
      </div>
    </div>

  );
}

// function getCaloriesBurnedThis
function getCaloriesBurnedThisWeek(subContents, completedDates) {
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const filteredSubContents = subContents.filter(subContent =>
    completedDates.some(item => item.subContentId === subContent._id && new Date(item.date) >= lastWeek)
  );
  const caloriesBurned = filteredSubContents.reduce(
    (total, subContent) => total + subContent.subContentCalories,
    0
  );
  return caloriesBurned;
}

function getSubContentsCompletedThisWeek(subContents, completedDates) {
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const filteredSubContents = subContents.filter(subContent =>
    completedDates.some(item => item.subContentId === subContent._id && new Date(item.date) >= lastWeek)
  );
  const numCompleted = filteredSubContents.length;
  return numCompleted;
}

export default CustomerDashboard;