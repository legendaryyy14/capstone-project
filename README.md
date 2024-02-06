#  <img src="./react-app/public/favicon.ico" style="width:40px;" />   &nbsp; Flexy

<br>

## Flexy: Table of Contents

-   [Link to Live Site](https://github.com/legendaryyy14/capstone-project#link-to-live-site)
-   [Description](https://github.com/legendaryyy14/capstone-project#description)
-   [Getting Started](https://github.com/legendaryyy14/capstone-project#getting-started)
-   [Technologies](https://github.com/legendaryyy14/capstone-project#technologies)
-   [Features](https://github.com/legendaryyy14/capstone-project#features)
<!-- -   [Screenshots](https://github.com/legendaryyy14/capstone-project#screenshots) -->

<br>

## Link to Live Site

[FLEXY](https://capstone-project-ren5.onrender.com)

<br>

## Description

Flexy is a fullstack CRUD app implemented with a PFRN stack. This app allows a user to look up a workout plan that includes exercises or simply create their own.

<br>

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/legendaryyy14/capstone-project.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example file with credentials of your choice.

4. Setup your PostgreSQL user, password and database to match your chosen credentials in the .env file.

5. Enter your shell environment, upgrade and seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, go inside the `react-app` directory, `npm install` and `npm start`. This should open your browser automatically but if not, you may navigate to `localhost:5000` to access the application.

<br>
<br>

## Technologies


<br>
<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_477db83f729d63210139ec7cd29c1351/render-render.png" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:75px;" />
  &nbsp;
</p>

<br>

## Features

Users
- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in.

Workouts
- Users should be able to view all public workouts.
- Users should be able to create workouts.
- Users should be able to update their created workouts.
- Users should be able to delete their created workouts.

Exercises
- Users should be able to view all exercises that belong to a public workout.
- Users should be able to add exercises to a workout they created.
- Users should be able to remove exercises from their created workouts.
- Users should be able to delete their exercises.

Favorites
- Users should be able to view the favorites on a workout.
- Users should be able to favorite a workout.
- Users should be able to unfavorite a workout.

Search
- Users should be able to search all public workouts and all of their created workouts.
- Users should be able to search all their own created exercises.

<br>

<!-- ## Screenshots -->

<!-- <img src="./react-app/public/images/<image_name_here>" style="width:600px;" /> -->
