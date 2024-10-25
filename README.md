
# React Weather App

A React-based weather application that allows users to search for city-specific weather forecasts and view the current and upcoming weather conditions. It utilizes a geolocation feature for local weather forecasts and adapts based on the user's browser locale for temperature units.

## Features

- **City Search:** Users can search for weather forecasts in different cities.
- **Current Weather Display:** Shows the current weather, temperature, and weather condition icon.
- **5-Day Forecast:** Displays a 5-day weather forecast with minimum and maximum temperatures and weather conditions.
- **Browser Locale Integration:** Automatically adapts the temperature units (Celsius/Fahrenheit) based on the user's locale.
- **Geolocation Support (Optional):** Detects user's location and shows the weather forecast for their current location.
- **Responsive Design:** Fully responsive design, optimized for both desktop and mobile devices.

## Technologies Used

- **React:** Frontend JavaScript library for building user interfaces.
- **Redux Toolkit:** For managing global state (city and weather data).
- **Radash:** Utility functions like `zip` for easier data manipulation.
- **Moment.js:** For date formatting and manipulation.
- **TypeScript:** Type-safe development for better code reliability.
- **Tailwind CSS:** For styling the components and ensuring a responsive layout.
- **Weather API:** Used to fetch weather data (replace with your specific API).

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/react-weather-app.git
   cd react-weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory to store your API key and any other configuration variables.

   Example:
   ```bash
   REACT_APP_WEATHER_API_KEY=your_api_key
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Starts the app in development mode.
- **`npm test`**: Runs the test suite (if tests are implemented).
- **`npm run build`**: Builds the app for production to the `build` folder.

## Project Structure

```
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── CitySearch.tsx           # Component for city search input
│   ├── data
│   │   └── weatherCodes.ts           # Maps weather codes to icons
│   ├── hooks
│   │   └── useAppSelector.ts         # Custom hook to select Redux state
│   ├── state
│   │   └── weatherSlice.ts           # Redux slice for weather state
│   ├── App.tsx                       # Main App component
│   ├── index.tsx                     # Entry point of the app
│   └── styles
│       └── tailwind.css              # Tailwind CSS for styling
└── README.md                         # Project documentation
```

## Usage

- **Search for a city:** Type the name of the city into the search bar, and the app will fetch and display the current weather conditions and 5-day forecast.
- **View current weather:** The app shows the current temperature, weather condition, and an appropriate weather icon.
- **View the forecast:** Below the current weather, you can see a list of daily predictions for the next 5 days, including the minimum and maximum temperatures.
  
### Example

![Weather App Screenshot](path/to/screenshot.png)

## Browser Locale and Unit System

- The app detects the user's browser locale and automatically adjusts the temperature units (Celsius/Fahrenheit).
- You can manually override this by adding a unit system switcher in the app (currently not implemented).

## Geolocation Feature

- The app can use your current location to display weather information. If the geolocation feature is denied, it will fallback to the default city (`London`).
  
## Future Improvements

- Add a manual switcher for temperature units (Celsius/Fahrenheit).
- Improve error handling for missing or failed API data.
- Implement geolocation-based weather fetching as an option for users.
- Add automated tests with `Jest` or `React Testing Library`.
- Improve UI/UX with more detailed weather data like wind speed, humidity, etc.

