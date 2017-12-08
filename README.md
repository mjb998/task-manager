# **Software Engineering Final Project**

**Members:**
* Nicolle Lenzmeier
* Austin Hartschen
* Jeremy Gonzales
* Matt Barmann

**Project:** A task manager

**Purpose:**

Our goal was to create a task manager while experimenting with unfamiliar programming languages. In the real world your team may encounter a project requiring a language unfamiliar to you or your team, because of this we decided to take up the challenge to learn a few new things while performing our project.

**Website Link:** https://whatnext.site/

**GitHub Link:** https://github.com/mjb998/task-manager

**Languages, APIs, and Database:**
* HTML
* CSS
* JavaScript - front end response
* Node.JS - backend, file serving
* Express.JS - backend, file serving
* AngularJS
* MongoDB

**Use Case Diagram:**
![New User](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/UC.png)

**What did each member do? What were their issues?**
* **Nicolle Lenzmeier:** My main goal was to get an initial start on the sign in an login for new and returning users. I originally had it to where the main page would display a side menu, having an option for both new and returning users. Whichever decision they made, a modal would pop up asking for the required information.

  I quickly discovered that I did not know as much backend JavaScript as I thought I did, also found out that I knew nothing about Node.JS. Because of this, I spent all of Thanksgiving break watching videos and researching just how to use Node.JS and how to connect it to our database (we used MongoDB and I had never used it before). Over the course of the break, I would take 2 steps forward only to take 5 steps back. Repeating this until the end of break when I decided to stop messing with the modals and just make a page of forms.

  After converting my nice and pretty page to a simple black and white form page, my code magically worked. I left the page simple as it was not the main part of the project (being the task manager). Luckily after I got it all connected, Austin went in and took my code and revamped it to look more like a website page and get the modals to work again.

  My biggest struggles were working with server side JavaScript. Up until this point, my only knowledge of connecting and communicating to a database was through PHP. This took a lot of time to learn the APIs and understand how to relate it to our project.

  Overall, I took a lot from this project. I learned new languages, how to work with APIs, and how to use an entirely different database. This project challenged me in ways that I did not know it could.  

* **Austin Hartschen:** Over the course of this project I worked on both the front-end and the back-end of our website. I took time to learn the way a MEAN stack works and used this knowledge to create an API that would use Node.js, Angular, and MongoDB to perform CRUD operations in regards to user accounts.

  I took the necessary precautions with accounts and ensured that all information was probably secured with encryption in our database. I worked on UI on the front-end and utilized Bootstrap to create a user friendly interface.

  I incorporated pm2 into our sever that allows node to constantly run in the background, so that you don't have to manually start the web server every time you want the website to be live.


* **Jeremy Gonzales:** For our software engineering group final project, our group decided to create a MEAN stack task manager app that would create/record/delete tasks that a user created.

  On this project I had not worked with MongoDB, ExpressJS, AngularJS, or NodeJS before so this entire process was new to me. I physically worked on displaying the tasks that a user has on the task page, adding new tasks and linking it to the database, and overall bug fixing.

  Overall, I learned a lot about NodeJS, AngularJS, and MongoDB and working in an agile development environment.

* **Matt Barmann:**

**How to use:**

* First go to https://whatnext.site/ to this main page:

![Home Page](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss1.png)

* From here you can either create a new user:

![New User](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss10.png)

OR you can sign into your existing account:

![Existing](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss9.png)  

**NOTE:** If you put an incorrect username or password, it will alert you:

![Incorrect](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss8.png)

* After logging in properly, or creating your account, you will be redirected to your task page:

![Task Page](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss7.png)

* From here you can create your own tasks using the form at the top and/or log out of your account.

![Create Task](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss4.png)

* Once you are done, you are able to delete a task by pressing the Delete button.

![Delete](https://raw.githubusercontent.com/mjb998/task-manager/Nicolle/Screenshots/ss5.png)
