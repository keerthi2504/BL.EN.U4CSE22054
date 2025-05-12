const axios = require('axios');

const registrationData = {
    email: "bl.en.u4cse22054@bl.students.amrita.edu",               
    name: "Keerthi Ragav S K",                 
    mobileNo: "9894684919",   
    githubUsername: "BL.EN.U4CSE22054",     
    rollNo: "BL.EN.U4CSE22054",            
    collegeName: "Amrita Vishwa Vidyapeetham",
    accessCode: "SwuuKE"     
};

axios.post('http://20.244.56.144/evaluation-service/register', registrationData)
    .then(response => {
        console.log("Registered Successfully:");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Registration Failed:");
        console.error(error.response?.data || error.message);
    });
