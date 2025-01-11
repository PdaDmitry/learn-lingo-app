# Project name: "LearnLingo"

## Project Description

"LearnLingo" is a frontend web application designed for an online language tutoring company. The
application provides users with an intuitive interface to explore the benefits of the company,
browse a catalog of available language teachers, filter teachers based on various parameters, and
manage a personalized list of favorite instructors.

---

## Key Features

### Pages

- **Home Page**:

Highlights the company's advantages with a call-to-action button that redirects users to the
"Teachers" page. Includes a modern and engaging design inspired by the provided prototype or custom
styling for a unique appearance.

- **Teachers Page**:

  - Displays a list of available language tutors.
  - Enables filtering by teaching language, student proficiency levels, and hourly rate.
  - Implements a "Load More" button to fetch additional teacher cards dynamically from the database.

- **Favorites Page**:

  - A private page accessible only to authenticated users.
  - Displays a personalized list of favorite tutors, styled similarly to the "Teachers" page.

  ### Functionalities

- **Authentication**:

  - User registration, login, logout, and data retrieval via Firebase Authentication.
  - Forms for authentication built with `react-hook-form` and `yup` for validation.
  - Modal dialogs for forms that close on button click, backdrop click, or pressing the Esc key.

  - **Teacher Management**:
  - Firebase Realtime Database used to store teacher data with fields such as `name`, `surname`,
    `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, and more.
  - Teacher cards display concise information with options to:
    - **Favorite**: Add/remove from a favorite list. Changes persist across page reloads.
    - **Read More**: Expand for detailed information and reviews.
    - **Book Trial Lesson**: Opens a modal form for trial lesson booking with mandatory validation.

- **Favorites Handling**:

  - Non-authenticated users attempting to favorite a teacher are prompted with a notification/modal
    to log in.
  - Authenticated users can manage favorites using `localStorage` or Firebase.

  - **Routing**:
  - Built with React Router, featuring routes:
    - `/` - Home Page
    - `/teachers` - Teachers Page
    - `/favorites` - Favorites Page

- **Interactive Features**:

  - Dynamic loading of teacher cards.
  - Persistent favorite state across page reloads.
  - Responsive UI with interactive modals.

  ***

  ## Technical Requirements

- **Frontend**: React.js
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: CSS Modules or styled-components
- **Firebase**:
  - Authentication
  - Realtime Database
- **Validation**: react-hook-form & yup
- **Build Tool**: Vite
- **Deployment**: Hosted on Vercel or Netlify

---

## Dependencies

The following libraries are used in this project:

- `@hookform/resolvers`: Validation resolvers for react-hook-form (`^3.9.1`)
- `@reduxjs/toolkit`: State management (`^2.5.0`)
- `clsx`: Utility for className conditionally (`^2.1.1`)
- `firebase`: Integration with Firebase for Authentication and Realtime Database (`^11.1.0`)
- `react` and `react-dom`: Core React libraries (`^18.3.1`)
- `react-hook-form`: Form handling (`^7.54.1`)
- `react-hot-toast`: Notifications (`^2.4.1`)
- `react-icons`: Icon library (`^5.4.0`)
- `react-loader-spinner`: Loading spinners (`^6.1.6`)
- `react-modal`: Modal dialogs (`^3.16.3`)
- `react-redux`: React bindings for Redux (`^9.2.0`)
- `react-router-dom`: Routing library (`^7.0.2`)
- `react-select`: Customizable select component (`^5.9.0`)
- `redux-persist`: State persistence (`^6.0.0`)
- `yup`: Schema validation (`^1.6.1`)

---

## Installation Instructions

1. Clone the repository: git clone https://github.com/yourusername/languagelearners.git

2. Navigate to the project directory: cd learn-libgo-app

3. Install dependencies: npm install

4. Start the development server: npm run dev

5. Open the app in your browser at http://localhost:3000.

---

Live Demo Access the live version at: https://vercel.com/dmitry-postupaievs-projects/learn-lingo-app

---

Author • Name: Dmitro Postupaiev • Email: Pda.gazcomp@gmail.com • GitHub:
https://github.com/PdaDmitry/learn-lingo-app

---

Contribution Feel free to contribute by submitting pull requests or reporting issues to improve the
project.
