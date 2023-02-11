# CITIES VISUALISATION DASHBOARD

- [Introduction](#introduction)
- [Description](#description)
  - [React Components](#react-components)
- [Build and Test Locally](#build-and-test-locally)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [References](#references)

## Introduction

The CITIES Dashboard serves as a data repository for community-wide actions on sustainability and well-being. This dashboard is created by and for the community of NYU Abu Dhabi, students, researchers, faculty, staff, and NYUAD partners alike. We highly encourage anyone interested to contribute to this open-source project by sharing new datasets, analyzing existing datasets, proposing projects, and promoting the dashboard to a wider audience. Ultimately, we envision the CITIES Dashboard as a handy tool to support research, education, and community outreach within the NYU Abu Dhabi campus and a precious instrument to support NYUAD partners in meeting their KPI (e.g., reducing food waste)

## Description

The CITIES Dashboard is a web application that allows users to visualize and analyze data from various campus sources. The dashboard is built with React.js and Material UI. React Google Charts is used to visualize the data and the dashboard is currently hosted on github pages. For CI/CD , CircleCI is used to run tests and deploy the application to github pages.

### React Components ,Pages and Context Providers

- [App.jsx](./src/App.jsx) - The main component that renders the dashboard.
- [Header.jsx](./src/components/Header/Header.jsx) - The component that renders the title and the navigation bar.
- [Footer.jsx](./src/components/Header/Footer.jsx) - The component that renders the footer of the dashboard.
- [Home.jsx](./src/pages/Home/Home.jsx) - The component that renders the home page of the dashboard.
- [About.jsx](./src/pages/About/About.jsx) - The component that renders the about page of the dashboard.
- [Projects.jsx](./src/pages/Projects/Projects.jsx) - The component that renders the individual projects of the dashboard.
- [404.jsx](./src/pages/404.jsx) - The component that renders the 404 page of the dashboard.
- [DataContext.js](./src/contextprovider/DataContext.jsx) - The context provider that provides the data to the home page of the dashboard.
- [LinkContext.js](./src/contextprovider/LinkContext.jsx) - The context provider that provides the links to the navigation bar of the dashboard.

## Build and Test Locally

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

### Install Dependencies

Pull the repository from github.
Run the following commands in the front end directory of the project.
Use npm install if you are using npm or yarn install if you are using yarn.

```
npm install
```

or

```
yarn install
```

Run the following command to start the application.

```
npm start
```

or

```
yarn start
```

## Team Members

[@princeampofo](https://github.com/princeampofo)  
[@nguyenvince](https://github.com/nguyenvince)
[@mjk9913](https://github.com/mjk9913)  
[@JenniferZheng0430](https://github.com/JenniferZheng0430)

## Contributing

Anyone is welcome to dive in! Feel free to Open an issue or Pull Request.

In terms of more detailed contributing rule, read through
[CONTRIBUTING.md](./CONTRIBUTING.md).

## References

- [React.js](https://reactjs.org/)
- [CircleCI](https://circleci.com/)
- [React Google Charts](https://react-google-charts.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Material UI](https://material-ui.com/)
- [Html-React-Parser](https://www.npmjs.com/package/html-react-parser)
