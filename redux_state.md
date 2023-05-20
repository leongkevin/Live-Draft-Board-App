# Live Draft Board App Redux State

```javascript
{
   users: {
      1: {
         user_id: 1,
         username: "Demo",
         email: "demo@aa.io",
         league_id: 1,
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
         league_id: 1,
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
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         player_id: 1,
         full_name: "Nikola Jokic",
         first_name: "Nikola",
         last_name: "Jokic",
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
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
      2: {
         player_id: 1,
         full_name: "Nikola Jokic",
         first_name: "Nikola",
         last_name: "Jokic",
         created_at: 5/20/2023,
         updated_at: 5/20/2023
      },
   },
   session: {
      user: {
         user_id: 1,
         username: "Demo",
         email: "demo@aa.io",
         league_id: 1,
      }
   },
   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Title cannot exceed 20 characters in length"
      ]
}
```
