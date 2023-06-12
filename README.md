# Live Draft Board App

## URL

https://livedraftboard.onrender.com/

## Introduction
Welcome to Live Draft Board App where you can now simulate a live draft with your friends at your homes. Users can join a friend's league where they create a team where they have the option to select the amount of time to draft a player. By the end, there will be every player drafted can be viewed in a big white board just like the NBA! NOTE: Favicon is supposed to be a basketball but it wont update on Render!

## Technologies
- JavaScript
- HTML5
- CSS
- Flask
- React
- Redux.js
- Node.js
- SQLAlchemy
- SQLite3
- Python
- NBA API (Not yet implemented)

## React Components list
- useState, useEffect from 'react';
- ReactDOM from 'react-dom';
- useDispatch, useSelector from 'react-redux';
- useHistory, NavLink, useParams from 'react-router-dom';

## Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

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

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

## Database Schema Design

![Database Schema](https://drive.google.com/file/d/1cU00_e_pNa0tCj-mpZ8cUGQa6U53hV6Z/view?usp=drive_link)
Source: https://dbdiagram.io/d/64682ad3dca9fb07c46d4907

## API Documentation

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Leagues

* A logged in user may see all leagues. All users can create leagues. Post

  * `GET /api/leagues/`
  * `POST /api/leagues/`
  * `PUT /api/leagues/<int:league_id>`
  * `DELETE /api/leagues/<int:league_id>`

## Teams

* A logged in user can with visible confirmation without causing a refresh/redirect.

  * `GET /api/<int:league_id>/teams`
  * `POST /api/<int:league_id>/<int:team_id>`
  * `PUT /api/<int:league_id>/<int:team_id>`
  * `DELETE /api/<int:league_id>/<int:team_id>`

## Players

* A logged in user can with visible confirmation without causing a refresh/redirect.

  * `GET /api/<int:league_id>/<int:team_id>/player`
  * `POST /api/<int:league_id>/<int:team_id>/player/<int:player_id>`
    -   Body:

        ```json
        {
        	"message": "Successfully deleted",
        	"statusCode": 200
        }
        ```
# Live Draft Board App MVP List

Live Draft Board App is a website for people to create accounts that can create a team in a league to draft players.

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Logged in users are directed to their profile page which displays their leagues/teams.
* Logged out users are directed a login/logout page.

## 2. Leagues

* Logged in users can CREATE a leagues.
* Logged in users can UPDATE and DELETE their own leagues.
* All users can view (READ) all leagues.

## 3. Teams

* Logged in users can join leagues and CREATE teams.
* Logged in users can UPDATE and DELETE their own teams.
* All users can view (READ) all teams.

## 4. Players

* Logged in users can select a player (CREATE) as their draft pick.
* All users can see the selected players.


# Live Draft Board App Redux State

```javascript
{
   users: {
      1: {
         user_id: 1,
         username: "Demo",
         email: "demo@aa.io",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
   leagues: {
      1: {
         league_id: 1,
         name: "Demo League 1",
         admin_id: 1,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         league_id: 1,
         name: "Demo League 2",
         admin_id: 1,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
   teams: {
      1: {
         team_id: 1,
         name: "The Best Team",
         user_id: 1,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         team_id: 2,
         name: "The Greatest Team",
         user_id: 2,
         league_id: 2,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      3: {
         team_id: 3,
         name: "The Big 3",
         user_id: 3,
         league_id: 3,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      4: {
         team_id: 4,
         name: "4 Loko",
         user_id: 4,
         league_id: 4,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      5: {
         team_id: 5,
         name: "5 on 5",
         user_id: 5,
         league_id: 5,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      6: {
         team_id: 6,
         name: "Six",
         user_id: 6,
         league_id: 6,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      7: {
         team_id: 7,
         name: "7-Heavenly Team",
         user_id: 7,
         league_id: 7,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      8: {
         team_id: 8,
         name: "L8kers",
         user_id: 8,
         league_id: 8,
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
      players: {
      1: {
         player_id: 1,
         full_name: "Stephen Wardell Curry",
         first_name: "Stephen",
         last_name: "Curry",
         yahoo_stats: "https://sports.yahoo.com/nba/players/4612/",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         player_id: 1,
         full_name: "Nikola Jokic",
         first_name: "Nikola",
         last_name: "Jokic",
         yahoo_stats: "https://sports.yahoo.com/nba/players/5352/",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
      drafts: {
      1: {
         player_id: 1,
         full_name: "Stephen Wardell Curry",
         first_name: "Stephen",
         last_name: "Curry",
         yahoo_stats: "https://sports.yahoo.com/nba/players/4612/",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         player_id: 1,
         full_name: "Nikola Jokic",
         first_name: "Nikola",
         last_name: "Jokic",
         stats: "https://sports.yahoo.com/nba/players/5352/",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
   session: {
      user: {
         user_id: 1,
         username: "Demo",
         email: "demo@aa.io",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      }
   },
   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Title cannot exceed 20 characters in length"
      ]
}
```

# Live Draft Board App User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Leagues

### Create Leagues

* As a logged in user, I want to be able to create new leagues.
  * When I'm on the `/` page:
    * I can create a new leagues.
      * So that I can have other users join my leagues.

### Viewing Leagues

* As a logged in _or_ logged out user, I want to be able to view a selection of all leagues.
  * When I'm on the `/` page:
    * I can view a list of filterable/sortable leagues.
      * So that I can view and join other leagues.

* As a logged in _or_ logged out user, I want to be able to view the details of the specific league.
  * When I'm on the `/league/:league_id` page:
    * I can view the details of the league, as well as the associated teams details if the draft has already happened.
      * So that I can view the details of the teams.

### Updating Leagues

* As a logged in user, if I am the owner of the league, I want to be able to update the details of the league.
  * When I'm on the `/leagues/:league_id`:
    * I can click "Edit" to make permanent changes to leagues I have posted.
      * So that I can fix any errors or detail changes I make in my leagues.

### Deleting Leagues

* As a logged in user, if I am the owner of the league, I want to be able to update the details of the league.
  * When I'm on the `/leagues/:league_id`:
    * I can click "Delete" to permanently delete a FauxTweet I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

## Teams

### Create Teams

* As a logged in user, I want to be able to create new team when I join a league.
  * When I'm on the `/:league_id/teams` page:
    * I can create a new team.
      * So that I can join that league as a team is the only way to interact.

### Viewing Teams

* As a logged in _or_ logged out user, I want to be able to view a selection of all teams in a league.
  * When I'm on the `/:league_id/:team_id` page:
    * I can view a list of filterable/sortable teams.
      * So that I can see the details of the teams in this league.

* As a logged in _or_ logged out user, I want to be able to view a selection of all teams in a league.
  * When I'm on the `/:league_id/:team_id` page:
    * I can view the details of the team, as well as the associated player details if the draft has already happened.
      * So that I can view the details of the teams and players.

### Updating Teams

* As a logged in user, if I am the owner of the league, I want to be able to update the details of the team if I am the team owner.
  * When I'm on the `/:league_id/:team_id/` page:
    * I can click "Edit" to make permanent changes to team that I have own.
      * So that I can fix any errors or detail changes to my own team.

### Deleting Teams

* As a logged in user, if I am the owner of the team, I want to be able to delete the teams.
  * When I'm on the `/:league_id/:team_id/` page:
    * I can click "Delete" to permanently delete a team I own.
      * So that when I don't want to play in this league, I will not ruin the league by not participating in the draft.

## Players

### Create Players

* As a logged in user, I want to be able to draft a player to my team
  * When I'm on the `/:league_id/:team_id/:player_id` page:
    * I can select a player during the draft.
      * So that I can have complete my team.

### Viewing Players

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent FauxTweets.
  * When I'm on the `/fauxtweets` page:
    * I can view the ten most recently posted FauxTweets.
      * So that I can read and interact with the thoughts and memes of my friends.

* As a logged in _or_ logged out user, I want to be able to view a specific FauxTweet and its associated FauxComments and FauxLikes.
  * When I'm on the `/fauxtweets/:id` page:
    * I can view the content of the FauxTweet, as well as the associated FauxComments and FauxLikes.
      * So that I can read and interact with the thoughts and memes of my friends, and add my own thoughts and memes in the FauxComments.

### Updating Players

* As a logged in user, if I am the owner of the league, I want to be able to update the details of the league.
  * When I'm on the `/leagues/:league_id`:
    * I can click "Edit" to make permanent changes to leagues I have posted.
      * So that I can fix any errors or detail changes I make in my leagues.

### Deleting Players

* As a logged in user, I want to be able to delete my FauxTweets by clicking a Delete button associated with the FauxTweet anywhere that FauxTweet appears.
  * When I'm on the `/fauxtweets`, `/fauxtweets/:id`, or `/users/:id/fauxtweets` pages:
    * I can click "Delete" to permanently delete a FauxTweet I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

## Draft

### Create Draft

* As a logged in user, if I am the owner of the league a draft is automatically created.
  * When I'm on the `/:league_id/drafts/` page:
    * I can make the details of the draft
      * So that the users of my league know the details

### Viewing Draft

* As a logged in _or_ logged out user, I want to view the details of the draft.
  * When I'm on the `/:league_id/drafts/:draft_id` page:
    * I can view all the details of the draft before and after the draft time.
      * So that I can use those details for my fantasy league season.

### Updating Draft

* As a logged in user, I want to be able to edit the draft if I am the owner of the league.
  * When I'm on the `/:league_id/drafts/:draft_id` page:
    * I can click "Edit" to make permanent changes to drafts I have posted.
      * So that I can fix any errors I make in my draft event.

### Deleting Draft

* As a logged in user, I want to be able to delete my draft by clicking a Delete button associated with the draft in the draft page.
  * When I'm on the `/:league_id/drafts/:draft_id` page:
    * I can click "Delete" to permanently delete a draft I have posted to reset the draft.
      * So that when there is a mistake, we can redo the draft.

# Live Draft Board App User-facing routes

## `/login`

### Log in page / modal

This page displays a log in form

* `GET /login`
* `POST /login`

## `/signup`

### Sign up page / modal

This page displays a sign up form.

* `GET /signup`
* `POST /signup`

## `/`

### Home page

This page displays the leagues all leagues as well as a navigation bar with login/sign up or logout buttons. Each league has an update and delete button _if it belongs to the currently logged in user_.  Logged in users can join a league if they aren't already in that league. Also this displays a navigation bar with login/sign up or logout buttons.

* `GET /`
* `POST /leagues/:league_id`
* `PUT /leagues/:league_id`
* `DELETE /leagues/:league_id`

### League page / modal

## `/leagues/:league_id`

This page displays all the details of your specific leagues including all displaying all the teams.

* `GET /league/:league_id`
* `POST /leagues/:league_id/:team_id`
* `PUT /:team_id`
* `DELETE /:team_id`

### Team page / modal

## `/teams/:team_id`

This page displays all the details of the specific team including all displaying all the players details.

* `GET /team/:team_id`
* `POST /:league_id/:team_id/:player_id/`
* `PUT /:league_id/:team_id/:player_id/`
* `DELETE /:league_id/:team_id/:player_id/`

### Player page / modal

## `/players/:player_id`

This page displays all the details of the specific player.

* `GET /players/:player_id`

### Draft page / modal

This page displays all the details of the draft.

* `GET /:league_id/draft/`
* `POST /:league_id/drafts/:draft_id`
