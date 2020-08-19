***Health Monitoring System - Patient-Doctor Live Chat!***
===================

Hey! I'm Radhakishan Jangid. Check my portfolio from [Here ↩](https://radhakishan.vpran.in/).

**Health Monitoring System** is a simple web project where patients can add their readings and doctors can check patient's readings and can send direct messages to each other through the application. Both patients and doctors need to log in or register before proceeds. Both patient and doctors can live chat with each other.

----------

***Features:-***
----------
**Patient:**
- Login, Register, Forget Password.
- Add, Edit, Delete, List (CRUD) for patient readings.
- Chart view for Readings.
- Profile Edit.
- Doctors Message List.
- Live Chat with doctors.

**Doctor:**

- Login, Register, Forget Password.
- List of patients.
- Live search of patients.
- Chart view details about patients.
- Direct message to patients.
- Live Chat with Patients.


***Languages & tools:-***
-------------
1. React Js,
2. HTML,
3. CSS,
4. JS,
5. VS Code,
6. Sublime,
7. Google Chrome,
8. PHP,
9. MySql,
10. CMD

***Live Demo***
------------
[Click here for live demo ↩](https://healthmonitoring.radhakishan.vpran.in/).

***How to use?***
-------------
- First Install Node Js Version 14.8.0 from [Here ↩](https://nodejs.org/en/).
- Copy the repo into your disk.
```
$ git clone git@github.com:ruanyf/react-demos.git
```
- Then go to your project directory using this command.
```
$ cd project-directory
```
- After navigating to your project directory run this command to download all the node modules.
```
$ npm install
```
- After the installation successful run this command to run the application. This command will start your react app and run it into the browser.
```
$ npm start
```
- Hooray! Then play with the source files under the directories.

> **Note:**

> - After the start of the project, you have to integrate the PHP API for storing the data in the database.
> - For that follow the below step.

#### <i class="icon-file"></i> 📝 Install XAMPP or WAMPP Server
- Download Xampp Server from [Here ↩](https://www.apachefriends.org/download.html).
#### <i class="icon-file"></i> 📝 Create a Folder

- Navigate into your  <i class="icon-folder-open"></i> xampp folder, in the drive where you have install the XAMPP Server. Then go to htdocs folder (If xampp installed) or www folder (If wampp installed).
- Create new folder by clicking on <i class="icon-folder"></i> **New Folder** from the top panel or right-click on mouse and create new folder.
- Name that folder as Health-monitoring-system or anything you want.

#### <i class="icon-folder-open"></i> ✎ Add PHP Script

Now, go to the health-monitoring-api directory in this repo or in the downloaded repo, copy <kbd>Ctrl+c</kbd> or cut <kbd>Ctrl+x</kbd> all the files added in the folder and paste it into your respective folder.

#### <i class="icon-plus"></i> ✎ Create a Database
- Now, open the PHPMyAdmin from your localhost server: localhost/phpmyadmin.
- Create a database and name it as health-monitoring or anything you want.
- There is a SQL file in the API folder health-monitoring.sql, import this file in the created database.

#### <i class="icon-pencil"></i> ✎ Changes in Files
- Now the most important part, to call an API we need to make some changes in API's.
![enter image description here](https://radhakishan.vpran.in/file-list.png)

- Open the health-monitoring-php folder, then open include folder, in this folder we need to make changes in two files only.

![enter image description here](http://radhakishan.vpran.in/two-file.png)

- First, open ```config.php``` file and make the following changes.

![enter image description here](https://radhakishan.vpran.in/config-change.png)
```
if (PROJECTSTATUS == "LIVE") {  // DEFAULT TO LIVE
	DEFINE('BASE_URL', '');
} else if (PROJECTSTATUS == "STAGING") {  // DEFAULT TO STAGING
	DEFINE('BASE_URL', ''); 
} else { // DEFAULT TO DEV
	DEFINE('BASE_URL', 'http://localhost/health-monitoring/'); // change this url to your localhost url.
}
```
- Change "http://localhost/health-monitoring/" to your respective URL.
- Now open database.php file and make the following changes.

![enter image description here](http://radhakishan.vpran.in/database-change.png)
```
$this->connection = new mysqli("localhost", "root", "", "health_monitoring");
```
- In this line:
	- localhost is your hostname,
	- root is your database login access,
	- "" is your database password,
	- health-monitoring" is your database name.
- Change the database name as your respective database name.

#### <i class="icon-refresh"></i> ⌨ Quick Test of API

- Now we are going to check if our API is running or Not.
- For that run Login.php in your browser by typing.
	- http://localhost/health-monitoring-php/Login.php in our browser.
	- After running if you get any error please follow the process from start, if not getting any error then you are good to go ahead.
	
	![enter image description here](http://radhakishan.vpran.in/test.png)

- Hooray... Here we complete our API Integration.
- Now we need to make some changes to React Code too.

#### <i class="icon-pencil"></i> ✎ Change API URL

- Open your react folder code in your code editor. I am using [VS Code](https://code.visualstudio.com/).
- Open ```constants.js``` from ```src``` folder and change the ```BASE_URL``` variable value into your API Url.

![enter image description here](http://radhakishan.vpran.in/api-call-change.png)

- Change this ```BASE_URL``` value into your API URl.
```
export const BASE_URL = "http://localhost/health-monitoring-php";
```
#### <i class="icon-refresh"></i> ✌ Run the Application
- After your npm command ```npm start``` completed you will see a screen like this.
![enter image description here](http://radhakishan.vpran.in/login.png)

- Either you can register or login through the following credentials:
	- Patient Login
		- Email: patient@test.com
		- Pass: 12345
		- Type: Patient
	- Doctor Login
		- Email: doctor@test.com
		- Pass: 12345
		- Type: Doctor


***Important Notes***
-------------
- Contact me through Telegram from [Here](https://telegram.me/radhakishanjangid404) for any query or write mail me on radhakishanjangid404@gmail.com with the subject "Issue in Health-monitoring-system".
- Do suggest any change if you see any problem in code or any better way to do this project.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

***Available Scripts***
-------------
In the project directory, you can run:

### `npm start`

- Runs the app in the development mode.<br />
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload if you make edits.<br />
- You will also see any lint errors in the console.

### `npm test`

- Launches the test runner in the interactive watch mode.<br />
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

- Builds the app for production to the `build` folder.<br />
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.<br />
- Your app is ready to be deployed!
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

- If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
- Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.
- You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

***Resources***
-------------
- ReactJS: Refer to https://reactjs.org/ to understand the concepts of ReactJS.
- React Bootstrap: Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap

***Learn More***
-------------
- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).
