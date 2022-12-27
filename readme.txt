
Goldsmiths University of London
Author....: Carlos Manuel de Oliveira Alves
Student...: cdeol003
Created...: 23/12/2022

-------------------------------------------------------------------------------------------------------------

Name of the Project: Recipe Buddy Dynamic Web Application

With this project was possible to implement the CRUD. I managed to do almost all go beyond
and the only thing that was not done was the calculation (R9C).

-------------------------------------------------------------------------------------------------------------

The database used was MySQL and called myRecipesBuddy

Two tables were created for this project:

	users

        user_id INT NOT NULL AUTO_INCREMENT UNIQUE,
        username VARCHAR(50) NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR (255) NOT NULL,
        hashedPassword CHAR(255),
        PRIMARY KEY(user_id)

	ingredients

        id INT AUTO_INCREMENT NOT NULL UNIQUE,
        username VARCHAR(15) NOT NULL,
        ingred_name VARCHAR(30) NOT NULL,
        value_per SMALLINT NOT NULL,
        unit VARCHAR(4) NOT NULL,
        carbs SMALLINT NOT NULL,
        fats SMALLINT NOT NULL,
        protein SMALLINT NOT NULL,
        salt SMALLINT NOT NULL,
        sugar SMALLINT NOT NULL,
        PRIMARY KEY(id)
    
Note: This database did not use foreign keys, only primary keys.

-------------------------------------------------------------------------------------------------------------

Requirements list:

Home >> R1: Home page - routes/main.js line No.32-36 - views/index.ejs

        R1A: Display the name of the web application - views/about.ejs

	R1B: Display links to other pages or a navigation bar that contains links to other pages: *.ejs
	
About >> R2: About page - routes/main.js line No.38-41 - views/about.ejs

         R2A: Display information about the web application including your name as the developer.  
	      Display a link to the home page or a navigation bar that contains links to other pages.

Register >> R3: Register page - routes/main.js line No.43-228 - views/register.ejs

		R3B:  Collect form data to be passed to the back-end (database) and store user data in the database.
		      Each user data consists of the following fields: first name, last name, email address, username 
		      and password. To provide security of data in storage, a hashed password should only be saved in 
		      the database, not a plain password - routes/main.js line No.77-228

		R3C: Display a message indicating that add operation has been done - views/newUser.ejs

Login >> R4: Login page - routes/main.js line No.230-322

	   R4A: Display a form to users to log in to the dynamic web application.
	        The form should consist of the following items: username and password.  
                Display a link to the home page or a navigation bar that contains links to other pages.
		routes/main.js line No.232-236 - views/login.ejs

	   R4B: Collect form data to be checked against data stored for each registered user in the database. 
              Users are logged in if and only if both username and password are correct. 
              routes/main.js line No.238-322 - views/loggedin.ejs
	
	   R4C: Display a message indicating whether login is successful or not and why not successful.
		routes/main.js line No.282-306 - views/loggedin.ejs (successful) 
	        views/wrongKey.ejs (invalid password)
                views/loggedout.ejs (invalid username)

Logout >> R5: Logout page - routes/main.js line No.324-334

Add Food >> R6: Add Food page (only available to logged-in users) - routes/main.js line No.363-515

		R6A: Display a form to users to add a new food item to the database. 
		     routes/main.js line No.365-369 - views/addFood.ejs

		R6B: Collect form data to be passed to the back-end (database) and store food items in the database. 
		     routes/main.js line No.370-509 - views/foodadded.ejs

		R6C: Display a message indicating that add operation has been done.
		     Going beyond by saving the username of the user who has added this food item to the database.
		     routes/main.js line No.505-506 - views/addFood-Result.ejs

Search Food >> R7: Search food page - routes/main.js line No.517-661

		   R7A: Display a form to users to search for a food item in the database. 
        	   The form should contain just one field - to input the name of the food item. 
        	   Display a link to the home page or a navigation bar that contains links to other pages.
		   routes/main.js line No.519-523 - views/searchFood.ejs

		   R7B: Collect form data to be passed to the back-end (database) and search the database based on the food name collected from the form. 
                   If food found, display a template file (ejs, pug, etc) including data related to the food found in the database to users. 
                   Display a message to the user, if not found.
		   routes/main.js line No.525-661
		   views/searchFood-Result.ejs (db query successfully)
		   views/searchFood-Null.ejs (db query not successful)

		   R7C: Going beyond, search food items containing part of the food name as well as the whole food name. 
        	   As an example, when searching for ‘bread’ display data related to ‘pitta bread’, ‘white bread’, 
		   ‘wholemeal bread’, and so on - routes/main.js line No.557-657
		   
Update Food >> R8: Update food page (only available to logged-in users) - routes/main.js line No.663-868

		   R8A: Display search food form. Display a link to the home page or a navigation bar that 
		   contains links to other pages - routes/main.js line No.665-669 - views/updateFood-Search.ejs

		   R8B: If food found, display all data related to the food found in the database to users in forms 
		   so users can update each field. Display a message to the user if not found. 
		   routes/main.js line No.671-868
	           views/updateFood.ejs (db query successfully)
                   views/searchFood-Null.ejs (db query not successful)
		   
		   Collect form data to be passed to the back-end (database) and store updated food items in 
		   the database - routes/main.js line No.812-868 - views/updateFood-Result.ejs (db query successfully)
                   views/updateFood-Null.ejs (db query not successful)

Delete Food >> R8C: Delete food page - routes/main.js line No.870-998

		   Implement a delete button to delete the whole record, when the delete button is pressed, it is 
	           good practice to ask 'Are you sure?' and then delete the food item from the database,
		   and display a message indicating the delete has been done. 

		   Step 1 - search food to delete - routes/main.js line No.872-877 - views/deleteFood.ejs

		   Step 2 - return search results - routes/main.js line No.879-961 - views/deleteFood-Result.ejs

		   Step 3 - confirm delete food - routes/main.js line No.963-998 - views/deleteFood-Confirm.ejs

Food List >> R9: List food page (available to all users) - routes/main.js line No.336-361 - views/foodList.ejs
 
		 R9A: Display all fields for all foods stored in the database. Display a link to the home page or 
                 a navigation bar that contains links to other pages. 

		 R9C: going beyond by letting users select some food items (e.g. by displaying a checkbox next to 
                 each food item and letting the user input the amount of each food item in the recipe e.g. 2x100 g 
                 flour). Then collect the name of all selected foods and calculate the sum of the nutritional 
                 information related to all selected food items for a recipe or a meal and display them as 
                 ‘nutritional information of a recipe or a meal’. Please note, it is not necessary to store recipes 
                 or meals in the database
             
                 Note: Requirement not done due to time constraint.

API >>  R10: API There is a basic API displayed on '/api' route listing all foods stored in the database in 
        JSON format. i.e. food content can also be accessed as JSON via HTTP method, It should be clear 
        how to access the API - http://doc.gold.ac.uk/usr/184/api
	routes/main.js line No.1000-1014

	Additional credit will be given for an API that implements get, post, put and delete.
	routes/main.js line No.1016-1077

Form validation >> R11: All form data should have validations, examples include checking password length, 
			 email validation, integer data is integer and etc.

			 Applied on main.js for all routes that requires user input used:

			 . check is a valid email
			 . check if the password is not empty
			 . check if the username is not empty and at least 5 characters
			 . use sanitize to trim the username, ingredient name
			 . use sanitize to escape the username, ingredient name
  			 . check the password must be 8+ chars long and contain a number
			 . use sanitize to trim the password
			 . use sanitize to escape the password, username, ingredient name
		         . use sanitize to remove any special characters
		    	 . check we have an invalid password length
			 . check username is different from password
			 . hash the password

			 Execute sql queries with throw errors handling
			 
R12: Dynamic web application implemented in Node.js, EJS, HTML and CSS on virtual server. 
     
     The back-end of the web application used MySQL.

     In this project all code has comments explaining all sections of the code including database interactions
     and errors handling.
