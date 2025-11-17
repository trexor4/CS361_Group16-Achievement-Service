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

### Example usage
