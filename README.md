## JWT Authentication with nodejs

Practicing register and login with JWT.

### How to run this locally

1. Clone this repository.
2. Run either npm install or yarn install.
3. Open the root folder in a terminal of your choice.
4. Run npm start or yarn start.
5. Go to http://localhost:5000 which will be our frontend containing a simple form.
6. Open MongoDB Compass GUI and connect to the default port.
7. Create a new database called jwtauth.
8. Go to frontend and enter a username and password and hit on submit.
9. Refresh the data in your database and you should see a new user has been created.

### After creating a user, we recieve a JWT Token from the server, which we can store inside of localstorage to make other requests to the server, such as login and change password.

![image](https://user-images.githubusercontent.com/66544316/193428217-b276cb90-89fd-4c47-9f7d-d529d1eebb31.png)  
![image](https://user-images.githubusercontent.com/66544316/193428256-15273f56-4a5e-4b1b-90ca-cd17fdad2bd3.png)
![image](https://user-images.githubusercontent.com/66544316/193428271-47100369-26b2-4df3-b8e6-381d041b86a3.png)

