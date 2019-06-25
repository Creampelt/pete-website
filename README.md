This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

1. Clone this repository: `git clone https://github.com/Creampelt/pete-website.git`
2. Install [Node.js and npm](https://nodejs.org/en/)
3. Run `npm start` to start the server

## Creating New Sections and Pages

The project is designed so that newly added pages and sections will automatically be added to the navigation bar. To do
this:

1. Create a new file in `/src/pages/page-name`
2. Create an empty class and export it as default
3. Add the section to `/src/constants/Pages.js`. In the section you must include:
- `title` (string) - The title of the section, as it would appear on the navigation bar
- `id` (string) - The ID of the section (e.g. `#home` or `#about-us`)
- `Component` (object) - The section component (the class that you created earlier)
- `ref` (boolean) - Whether or not the section should be included in the navigation bar

If you are creating a new page, you must also include:
- `href` (string) - The link to the new page (e.g. `/` or `/collateral`)
- `sections` (array) - An array containing sections (objects with the above categories)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
