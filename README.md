## CS361_Group16-Achievement-Service

Repo for Achivement microservice for sprint 2

# Requesting Data 
POST /events is used for requesting data.

# Example Request
    POST /events HTTP/1.1
    Host: localhost:8001
    Content-Type: application/json

    {
    "type": "search"
    }
 Recieving Data
GET /achievements is used to recieve a JSON containing locked and unlocked achievements as well as event trackers, can all be parsed as needed.

 Example Recieve
    {
    "unlocked": [
        {
        "id": "test1",
        "name": "achievement test1"
        }
    ],
    "locked": [],
    "counters": 
        {
        "searches": 1,
        "clicks": 0
        }
    }


## Using this on your project
This function is how you are going to communicate with the dashboard, from here you can call it on different acheivement types that you add.

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

Where `event_type` is one of:
- `"search"` - Record a search event
- `"click"` - Record a click event
- note that you can go into the acheivement.js code and add your own events in the same format and call them 

### UML

<img width="766" height="464" alt="uml" src="https://github.com/user-attachments/assets/62dda865-6f5e-44d1-9bf5-d04e20e80e61" />
