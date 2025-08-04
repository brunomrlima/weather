# Weather
Please make sure to read the [Limitations](#limitations) and [Technical Decisions](#technical-decisions) sections before analyzing the code.

### Tech stack
- **Ruby on Rails** as backend framework (API mode only)
- **React (typed in Typescript)** as frontend framework
- **REST** as API

### Prerequisites
- **Ruby** `3.4.3`
- **Bundler** (`gem install bundler`)
- **Yarn**

### Setup
```bash
bundle install
yarn install
```

### Starting the application
```bash
bin/dev
```
This will run the Rails server (port 3000), the Vite server (frontend), and the Redis server (caching)

Visit the app: `localhost:3000`

### Running tests
#### Backend and E2E specs
I'm using RSpec for backend specs. 
End-to-end specs were not implemented at this time. 
Running the following command will run all backend specs
```bash
bundle exec rspec
```

#### Frontend (jest)
For component tests, I'm using `@testing-library/react`. The command below will run all frontend tests.
```bash
yarn jest
```

### Running code checker
```bash
rubocop
rubocop --auto-gen-config
```

### Decomposition of the Objects
#### `WeatherService`
- **Purpose**: Encapsulates logic for fetching and parsing weather data from the external WeatherAPI.
- **Responsibilities**:
    - Builds and sends HTTP requests to the API.
    - Parses and formats the API response into a structured hash.
    - Caches responses by ZIP code using `Rails.cache` (Redis in production).
- **Key Methods**:
    - `fetch`: Returns weather data, either from cache or by making an API call.
    - `parse_response`: Extracts and organizes current, daily, and hourly forecast data.

#### `Api::V1::WeatherController`
- **Purpose**: Handles weather API requests from the frontend.
- **Responsibilities**:
    - Accepts `location` as a query parameter.
    - Calls `WeatherService` to retrieve data.
    - Handles and returns structured error responses in JSON.

### Frontend (React + TypeScript)

#### `SearchBar`
- **Purpose**: Allows users to enter a location to query weather.
- **Responsibilities**:
    - Manages form state and submission.
    - Triggers weather data fetch via API.
    - 
#### `CurrentWeather`
- **Purpose**: Displays current weather information.
- **Props**:
    - `weather`: Weather data object.
    - `unit`: `"c"` or `"f"` for Celsius or Fahrenheit.
- **Displays**:
    - Weather condition and icon
    - Current temperature
    - Feels like temperature
    - High/Low temperature
    - Day and date

#### `DailyForecast`
- **Purpose**: Renders a 5-day weather forecast.
- **Props**:
    - `forecast`: Array of daily forecast objects.
    - `unit`: Selected temperature unit.

#### `HourlyForecast`
- **Purpose**: Displays hourly forecast for the current day.
- **Props**:
    - `hourly`: Array of hourly forecast objects.
    - `unit`: Selected temperature unit.

#### `TemperatureToggle`
- **Purpose**: Allows the user to toggle between Celsius and Fahrenheit.
- **Props**:
    - `value`: Current unit.
    - `onChange`: Callback when unit is changed.

### Limitations

- **Location Input Depends on WeatherAPI Parsing**  
The app sends raw location strings (e.g., `"Toronto"`, `"90210"`) to WeatherAPI, which may not always resolve as 
expected. Misspelled or ambiguous locations can result in errors or inaccurate data.

- **Caching Is Based on Raw Location Input**  
Weather data is cached for 30 minutes by location input string. This may result in duplicate API calls if different 
but equivalent location names are entered (e.g., `"London, Ontario"` vs. `"London, Ontario, Canada"`).

- **Basic Error Handling**  
Errors are displayed with a generic fallback message.

- **No Authentication or Rate Limit Handling**  
The application does not include user accounts or mechanisms to guard against abuse of the WeatherAPI 
key or gracefully handle rate-limiting scenarios.

- **Limited Data Granularity**  
Hourly forecasts are only provided for the current day, and forecast data is limited to 5 days ahead. 
Historical weather data is not supported.
- 
- **No Autocomplete or Location Normalization**  
The app does not use an address autocomplete or normalization API (like Google Places), so users may enter 
inconsistent formats that prevent caching from being effective.

### Some Future Improvements
- **Autocomplete with Google Maps API**  
Integrate Google Places Autocomplete to normalize location input, improving cache hits and user experience.

- **Enhance error handling in the frontend**
Right now it just returns a generic message. It should return a user-friendly error (coming from the backend)

- **Persist User Preferences**  
Store temperature unit preference (°C/°F) in local storage or cookies so it persists across sessions.

- **Persist Favorite Places**
Create table and save favorite places that the user could have.

### Technical Decisions
#### Why Vite?
[Vite](https://vitejs.dev/) was chosen as the frontend build tool for its blazing-fast hot module replacement,
modern ES module support, and great integration with React and Rails via `vite-plugin-ruby`.
It significantly improves developer experience over Webpacker and other traditional Rails asset pipelines.

#### Why TanStack Query (React Query)?
[@tanstack/react-query](https://tanstack.com/query/latest) is used to manage API state and server-side caching in a
clean, declarative way. It provides:
- Automatic caching and background refreshing of data.
- Built-in loading and error handling states.
- Mutations with optimistic updates and side effect tracking.
- A clean abstraction away from `useEffect` + `useState` data fetching logic.

This keeps components lean and focused on UI, not data fetching logic.

#### Why Bootstrap?
[Bootstrap 5](https://getbootstrap.com/) was chosen for:
- Rapid prototyping and mobile responsiveness.
- A familiar utility-first CSS system for layout and spacing.
- A professional look without investing time in custom styling.

It allowed the project to remain visually clean and usable, without requiring a heavy frontend design phase.