const express = require('express');
const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const storeUserInfo = [];

app.get('/', (req, res) => {
    res.render('register', { error: null });
});

app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.render('register', { error: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
        return res.render('register', { error: 'Password and Confirm Password do not match.' });
    }

    // Store user data (you can do database operations here)
    storeUserInfo.push({ username, email, password });

    res.redirect('/login'); // Redirect to the login page after registration
});

app.get('/login', (req, res) => {
    res.render('login', { error: null, newUsername: req.query.newUsername || '' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = storeUserInfo.find((user) => user.username === username && user.password === password);

    if (!user) {
      
        return res.render('login', { error: 'Invalid username or password.', newUsername: undefined });
    }

    // Check if the request contains newUsername (for example, after an update)
    let newUsername = '';
    if (req.query.newUsername) {
        newUsername = req.query.newUsername;
    }
     console.log('newUsername', newUsername);
     console.log('username', username);
    res.render('login-success', { username, newUsername });
});


app.get('/update-info', (req, res) => {
    res.render('update-info', { error: null });
});

app.post('/update-info', (req, res) => {
    const { currentUsername, newUsername, newEmail } = req.body;
    const userToUpdate = storeUserInfo.find((user) => user.username === currentUsername);

    if (!currentUsername || !newUsername || !newEmail) {
        return res.render('update-info', { error: 'Current username, new username, and new email are required.' });
    }

    if (!userToUpdate) {
        return res.render('update-info', { error: 'User not found.' });
    }

    // Check if the new username is the same as the old one
    if (userToUpdate.username === newUsername) {
        return res.render('update-info', { error: 'New username must be different from the old one.' });
    }

    // Check if the new email is the same as the old one
    if (userToUpdate.email === newEmail) {
        return res.render('update-info', { error: 'New email must be different from the old one.' });
    }

    // Check if the new email is already used by another user
    if (storeUserInfo.some((user) => user !== userToUpdate && user.email === newEmail)) {
        return res.render('update-info', { error: 'Email already in use.' });
    }

    // Update the user's information
    userToUpdate.username = newUsername;
    userToUpdate.email = newEmail;

    res.redirect('/update-password?currentUsername=' + encodeURIComponent(newUsername));

});
app.get('/update-success', (req, res) => {
    res.render('update-success', { message: 'You have successfully updated your username and email.' });
});



app.get('/update-password', (req, res) => {
    const { currentUsername, newUsername } = req.query;
    console.log('Current Username:', currentUsername); // Add this line for debugging
    res.render('update-password', { currentUsername, newUsername, error: null });
});

app.post('/update-password', (req, res) => {
    const { currentUsername, newUsername, newPassword, confirmNewPassword } = req.body;

    // Find the user by the current username
    const user = storeUserInfo.find((user) => user.username === currentUsername);

    // Check if the current username exists
    if (!user) {
        return res.render('update-password', { error: 'Invalid current username.', currentUsername, newUsername });
    }

    if (newPassword !== confirmNewPassword) {
        return res.render('update-password', { error: 'New Password and Confirm New Password do not match.', currentUsername, newUsername });
    }

    // Update the user's information (in this case, we are just displaying a success message)
    res.render('login-success', { message: 'Password updated successfully!', username: currentUsername, newUsername });
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
