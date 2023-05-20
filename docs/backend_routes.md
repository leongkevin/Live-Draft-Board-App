# Live Draft Board App API-Routes

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
