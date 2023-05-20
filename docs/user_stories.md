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
