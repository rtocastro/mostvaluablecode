const loginbutton = document.querySelector('#loginbutton');
const signupbutton = document.querySelector('#signupbutton');


// Sign-in functionality
const checkLoginUser = async (event) => {
    event.preventDefault();
    const signinemail = document.querySelector('#emailsignin').value.trim();
    const signinpass = document.querySelector('#passsignin').value.trim();

    if (signinemail && signinpass) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ signinemail, signinpass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to log in.');
        }
    }
};

// Sign-up functionality
const registerSignUpUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signupemail').value.trim();
    const password = document.querySelector('#signuppass').value.trim();
    const confpassword = document.querySelector('#signuppassconf').value.trim();

    if (username && comparePassword(password, confpassword)) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to log in.');
        }
    }
};

// Function to compare password
function comparePassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    } else {
        alert('Entered Password and Confirm Password does not match!');
        return false;
    }
}



if (loginbutton) {
    loginbutton.addEventListener('click', checkLoginUser);
}

if (signupbutton) {
    signupbutton.addEventListener('click', registerSignUpUser);
}