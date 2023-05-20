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
* `POST /:league_id/:team_id`
* `PUT /:league_id/:team_id`
* `DELETE /:league_id/:team_id`

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
