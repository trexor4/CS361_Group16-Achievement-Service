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
# Recieving Data
GET /achievements is used to recieve a JSON containing locked and unlocked achievements as well as event trackers, can all be parsed as needed.

# Example Recieve
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

### Needs finishing

'{ id: 'test1', name: 'achievement test1', check: s => s.counters.searches >= 1 }'


''' const achivementHost = 'http://localhost:8001';

async function sendAchievement(type) {
  const res = await fetch(`${achivementHost}/events`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

#usage example
sendAchievement("search");


eventButton.onclick = async () => {
    output.textContent = "Sending event...";

    try {
      const data = await sendAchievement("search");
      output.textContent = "Event sent:\n" + JSON.stringify(data, null, 2);
    } catch (err) {
      output.textContent = "Error: " + err.message;
    }
  };'''