## CS361_Group16-Achievement-Service

Repo for Achivement microservice for sprint 2

# Requesting Data 
POST /events is used for sending events to the acheivement service. This is done by making a post request to http://localhost:8001/events

# Example Request 
const achievementHost = "http://localhost:8001";

async function sendAchievement(type) {
  const res = await fetch(`${achievementHost}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type })
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();  // contains updated counters + unlocked achievements
}


sendAchievement("search");

# Recieving Data
    - gets all unlocked and locked acheivements and counters.
GET /achievements is used to recieve a JSON containing locked and unlocked achievements as well as event trackers, can all be parsed as needed. will respond with something such as:
```
{
  "unlocked": [
    {
      "id": "test1",
      "name": "achievement test1"
    }
  ],
  "locked": [],
  "counters": {
    "searches": 1,
    "clicks": 0
  }
}
```
 Example Recieve: get request to  http://localhost8001/achievements
 ```
   async function getAchievementStatus() {
  const res = await fetch("http://localhost:8001/achievements");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();  // { unlocked, locked, counters }
}
```

## Using this on your project
while in microservice directory use npm install to install dependencies from package
This function is how you are going to communicate with the achievement service, from here you can call it on different acheivement types that you add.
place this in your main program.
```
const achievementHost = "http://localhost:8001";

async function sendAchievement(type) {
  const res = await fetch(`${achievementHost}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type })
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
```

Where `type` is one of:
- `"search"` - Record a search event
- `"click"` - Record a click event
- note that you can go into the acheivement.js code and add your own events in the same format and call them but currently only has search bar and click events
     ```
      - add new counter in state.counters
      - add a new case in applyEvent(type)
      - add a new achievement in the achievements array
      - place sendAchievement("your new type") in the desired event on your main program;
     ```
  ### UML

<img width="766" height="464" alt="uml" src="https://github.com/user-attachments/assets/62dda865-6f5e-44d1-9bf5-d04e20e80e61" />
