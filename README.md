# School API

A Node.js REST API service for managing school data with geographical location support. This API allows users to add new schools and retrieve schools sorted by proximity to a given location.


## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management
```


## API Documentation

### 1. Add School
Adds a new school to the database.

**Endpoint:** `POST /api/addSchools`

**Request Body:**
```json
{
    "name": "Sample School",
    "address": "123 Education Street, City, Country",
    "latitude": 51.5074,
    "longitude": -0.1278
}
```

**Response (201 OK):**
```json
{
    
    "message": "School added successfully",
   
}
```

### 2. List Schools
Retrieves schools sorted by distance from provided coordinates.

**Endpoint:** `GET /api/listSchools`

**Query Parameters:**
- `latitude` (required): User's latitude
- `longitude` (required): User's longitude

**Example Request:**
```
GET /api/listSchools?latitude=51.5074&longitude=-0.1278
```

**Response (201 OK):**
```json
{
   
    [
        {
            "id": 1,
            "name": "Sample School",
            "address": "123 Education Street, City, Country",
            "latitude": 51.5074,
            "longitude": -0.1278,
            "distance": 0.5
        }
    ]
}
