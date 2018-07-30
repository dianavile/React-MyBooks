# MyReads Project
This code is created with the starter template for MyReads project for Udacity's Front End Nanodegree course. 

# MyReads Goals
* Add interactivity to the static app in CSS and HTML markup
* Refactor the static code into React code
* Break User Interface (UI) into Components Hierarchy
* Create new JS files for each component
* Organize shelves by categories
* Add a SearchPage and a BookPage.
* Add a button to each book element to assign shelf to a book
* Include import/require statements
* Identify the state and the state position, Add the State to creative dynamic components.
* Check if data flows correctly: one way direction from parent to child.

## Installation & Start Project

To get started developing:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Filestructure
```
├── public
│   ├── favicon.ico 
│   └── index.html 
└── src
    ├── icons 
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── App.css 
    ├── App.js (root of app)
    ├── App.test.js (test file). 
    ├── BooksAPI.js (JavaScript API for Udacity backend.)
    ├── CurrentlyReading.js
    ├── Index.css (Global styles)
    ├── Index.js (DOM rendering) 
    ├── Read.js 
    └── WantToRead.js 
  ├── .gitignore
  ├── CONTRIBUTING.md
  ├── package-lock.json 
  ├── package.json 
  ├── README.md 
  ├── SEARCH_TERMS.md
```

## Backend Server
The project comes with a given backend server to develop against. 
The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:
* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`
Method Signature:
```js
getAll()
```
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`
Method Signature:

```js
update(book, shelf)
```
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`
Method Signature:
```js
search(query)
```
* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Code dependencies
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

The project further uses the following code dependencies
 * "prop-types": "^15.6.1",
 * "react": "^16.3.2",
 * "react-dom": "^16.3.2"
 * react-scripts": "1.1.4
 * start": "react-scripts start
 * build": "react-scripts build
 * test": "react-scripts test --env=jsdom
 * eject": "react-scripts eject