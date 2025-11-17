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

```
## CS361_Group16-Achievement-Service

Repo for Achievement microservice for sprint 2

## Overview

The Achievement Service is a microservice that tracks user events (searches, clicks, etc.) and automatically unlocks achievements based on configurable rules. The service maintains a state of achievement progress and provides endpoints for both sending events and retrieving achievement data.

---

## Requesting Data (POST /events)

### How to Programmatically Request Data

To send an event to the Achievement Service, make a **POST request** to the `/events` endpoint with the event type. This tells the service to process an action and check if any achievements should be unlocked.

**Endpoint:** `POST http://localhost:8001/events`

**Request Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "type": "event_type"
}
```

Where `event_type` is one of:
- `"search"` - Record a search event
- `"click"` - Record a click event

### Example Request

**HTTP Request:**
```http
POST /events HTTP/1.1
Host: localhost:8001
Content-Type: application/json

{
  "type": "search"
}
```

**JavaScript Example:**
```javascript
const achievementHost = 'http://localhost:8001';

async function sendEvent(type) {
  try {
    const response = await fetch(`${achievementHost}/events`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Failed to send event:', err.message);
    throw err;
  }
}

// Usage example - send a search event
sendEvent("search")
  .then(data => console.log("Event processed:", data))
  .catch(err => console.error("Error:", err));
```

**Expected Response:**
```json
{
  "ok": true,
  "counters": {
    "searches": 1,
    "clicks": 0
  },
  "unlocked": ["test1"]
}
```

---

## Receiving Data (GET /achievements)

### How to Programmatically Receive Data

To retrieve the current achievement status, make a **GET request** to the `/achievements` endpoint. This returns a JSON object containing all unlocked and locked achievements, along with event counters.

**Endpoint:** `GET http://localhost:8001/achievements`

**Response Body:**
```json
{
  "unlocked": [
    {
      "id": "achievement_id",
      "name": "Achievement Name"
    }
  ],
  "locked": [
    {
      "id": "locked_id",
      "name": "Locked Achievement Name"
    }
  ],
  "counters": {
    "searches": 1,
    "clicks": 0
  }
}
```

### Example Request

**HTTP Request:**
```http
GET /achievements HTTP/1.1
Host: localhost:8001
```

**JavaScript Example:**
```javascript
const achievementHost = 'http://localhost:8001';

async function getAchievements() {
  try {
    const response = await fetch(`${achievementHost}/achievements`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Failed to fetch achievements:', err.message);
    throw err;
  }
}

// Usage example
getAchievements()
  .then(data => {
    console.log("Unlocked achievements:", data.unlocked);
    console.log("Locked achievements:", data.locked);
    console.log("Event counters:", data.counters);
  })
  .catch(err => console.error("Error:", err));
```

**Example Response:**
```json
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

---

## UML Sequence Diagram

The following sequence diagram illustrates how a client application interacts with the Achievement Service to track events and retrieve achievement status:

```
Client Application          Achievement Service
        |                            |
        |--1. User Action Occurs-----|
        |    (e.g., search, click)   |
        |                            |
        |--2. POST /events---------->|
        |    {"type": "search"}      |
        |                            |
        |<--3. Process Event---------|
        |    - Increment counter     |
        |    - Check achievement     |
        |    - Unlock if criteria met|
        |                            |
        |<--4. Response 200 OK-------|
        |    {ok: true, counters,    |
        |     unlocked: [...]}       |
        |                            |
        |                            |
        |--5. Request Achievements-->|
        |    GET /achievements       |
        |                            |
        |<--6. Query State-----------|
        |    - Filter unlocked items |
        |    - Filter locked items   |
        |    - Include counters      |
        |                            |
        |<--7. Response 200 OK-------|
        |    {unlocked: [...],       |
        |     locked: [...],         |
        |     counters: {...}}       |
        |                            |
        |--8. Display Achievements---|
        |    (UI updates)            |
        |                            |
```

### Detailed Flow Description

1. **User Action Occurs:** User performs an action in the application (search query, button click, etc.)

2. **POST /events Request:** Client sends event to Achievement Service with the event type

3. **Event Processing:** Service updates internal state:
   - Increments appropriate counter (searches, clicks, etc.)
   - Evaluates all achievement rules against updated state
   - Unlocks any achievements that meet their criteria

4. **Event Response:** Service returns current counters and list of newly unlocked achievements

5. **GET /achievements Request:** Client requests full achievement status (typically after sending event or on page load)

6. **State Query:** Service filters achievements into unlocked and locked lists

7. **Achievement Response:** Returns complete achievement data and event counters

8. **UI Update:** Client application displays achievements and counters to user

---

## Integration Example

```javascript
// Complete integration example
const achievementHost = 'http://localhost:8001';

async function trackUserAction(actionType) {
  try {
    // Step 1: Send event to track action
    const eventResponse = await fetch(`${achievementHost}/events`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: actionType })
    });

    if (!eventResponse.ok) throw new Error('Failed to track event');

    // Step 2: Retrieve updated achievement status
    const achievementResponse = await fetch(`${achievementHost}/achievements`);
    if (!achievementResponse.ok) throw new Error('Failed to fetch achievements');

    const achievements = await achievementResponse.json();

    // Step 3: Update UI with results
    displayAchievements(achievements.unlocked, achievements.locked);
    updateCounters(achievements.counters);

    return achievements;
  } catch (err) {
    console.error('Error tracking action:', err.message);
  }
}

// Usage when user performs action
document.getElementById('searchButton').addEventListener('click', () => {
  trackUserAction('search');
});
```

---

## Achievement Configuration

Achievements are defined in the service with rules that automatically trigger when conditions are met:

```javascript
const achievements = [
  { 
    id: 'test1', 
    name: 'achievement test1', 
    check: s => s.counters.searches >= 1 
  }
];
```

To add new achievements, modify the `achievements` array in `achievements.js` with:
- **id:** Unique identifier for the achievement
- **name:** Display name for users
- **check:** Function that evaluates state against unlock criteria
```

```
const achivementHost = 'http://localhost:8001';

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
  };
```