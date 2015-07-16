# Mock Twitter v2

Create a mock version of twitter using gulp.

## Acceptance Criteria

- As a user, I should be able to send a new tweet, which should appear in the list of tweets
- As a user, the next time I return to the page, I should see any tweets I sent previously
- As a user, clicking on a top-level tweet should expand it to reveal a text area for replying to the tweet
- As a user, when a top-level tweet is expanded, I should see all of the replies to it listed
- As a user, I should be able to reply to existing tweets

### Project Acceptance Criteria

In addition to the above user requirements, the following criteria determine passing criteria for the student's a project.

- As a developer, I should load all tweets and replies using AJAX
- As a developer, I should create or update tweets/replies using AJAX
- As a developer, I should be able to create a gulp "lint" task using jshint
- As a developer, I should be able to create a gulp "clean" task to remove build files

## HTML Structure

The project is broken down into two main sections: `header` and `#tweets`

```html
<header>...</header>
<div id="tweets">...</div>
```

The header will only consists of the compose form at all times:

```html
<header>
  <form class="compose">
    <textarea placeholder="Compose new Tweet..."></textarea>
    <div>
      <span class="count">140</span>
      <button>Send</button>
    </div>
  </form>
</header>
```

The `#tweets` section will have it's direct child elements of `.thread`s, created dynamically:

```html
<div id="tweets">
  <div class="thread">...</div>
  <div class="thread">...</div>
</div>
```

A new thread will be dynamically created each time someone uses the `.compose` section in the `header`. A `.thread` has the following structure when a new tweet is created:

```html
<div class="thread">

  <div class="tweet" id="tweet-1">
    <img src="images/rockit.png">
    <div class="body">
      <div class="title">@ROCKIT_BOOTCAMP</div>
      <div class="message">tweet tweet!!</div>
    </div>
  </div>

  <div class="replies">
    <form class="compose">
      <textarea placeholder="Compose new Tweet..."></textarea>
      <div>
        <span class="count">140</span>
        <button>Send</button>
      </div>
    </form>
  </div>

</div>
```

Notice how the thread comes with a `.replies` section which will have it's own `.compose`. Also notice that this `.compose` HTML is exactly the same as the one in the `header`.

When a reply `.tweet` is added it will be placed as a sibling to the `.compose` section. Also note that all `.tweet`s will have the exact same HTML whether they are original tweets or replies:

```html
<div class="thread">

  <div class="tweet" id="tweet-1">
    <img src="images/rockit.png">
    <div class="body">
      <div class="title">@ROCKIT_BOOTCAMP</div>
      <div class="message">tweet tweet!!</div>
    </div>
  </div>

  <div class="replies">
    <form class="compose">
      <textarea placeholder="Compose new Tweet..."></textarea>
      <div>
        <span class="count">140</span>
        <button>Send</button>
      </div>
    </form>

    <!-- Notice here is our reply -->
    <div class="tweet" id="tweet-2">
      <img src="images/rockit.png">
      <div class="body">
        <div class="title">@ROCKIT_BOOTCAMP</div>
        <div class="message">tweet tweet!!</div>
      </div>
    </div>
  </div>

</div>
```

## State Management

Be sure to study the CSS and see how it works. There are two parts to this site that use class names for state management. The first is the `.compose` section. By Default, the `.compose` section hides the div which contains the count and send button. The `textarea` is also smaller by default. When the `textarea` is clicked you will need to add a class `.expand` to the `.compose` section as follows:

```html
<form class="compose expand">
  <textarea placeholder="Compose new Tweet..."></textarea>
  <div>
    <span class="count">140</span>
    <button>Send</button>
  </div>
</form>
```

The presense of `.expand` is a state change and the CSS will change the `.compose` to allow the `div` to be shown. It will also change the height of the `textarea`. JavaScript is responsible for behavior, so JS will determine when a state needs to be changed with events (like clicks) but it will only add/remove this class. CSS is responsible for what that state looks like.

The second state we will manage is when an original tweet gets clicked (not a reply tweet). When this happens we will toggle the respective `.thread`'s visibility. Similarly to the compose section mentioned earlier, we will use an `.expand` to be added to the `.thread`. Just keep in mind that this `.expand` has nothing to do with the other one. We're just using similar class names to do similar concepts. Again study the CSS to see how this is done.

# Guide

Your objective with this project is to develop a project using modules and gulp. You will create a gulp "clean" task which will delete the `js/bundle.js` file. You will use AJAX to connect to a local API server (which interfaces with a mock database) to retrieve, add, and update records. Refer to the *Acceptance Criteria* section for details about UX.

## Database / API

A mock database fronted by an API server are provided for you. The database is `db.json` and the API server can be started using the `gulp serve:api` command, which will start the **API** on `localhost:3000`. This location is where you will make your API calls to.

The basic endpoints are:

- `http://localhost:3000/users`
- `http://localhost:3000/tweets`
- `http://localhost:3000/replies`

For a specific record, you can provide the relevant ID to the endpoint (showing only 1 example):

- `http://localhost:3000/users/1`

And for relational data, you can call the relation endpoint (showing 2 examples):

- `http://localhost:3000/users/1/tweets`
- `http://localhost:3000/tweets/1/replies`

To read records, make a `GET` request. To create records, make a `POST` request. To update records, make a `PUT` request. **All changes will be persisted to `db.json` instantly.**

To see an example response, start the API and issue the following command from your terminal:

```
curl localhost:3000/users
```

You can also use `curl` to test all of the other available endpoints, to see what data is returned, so you know what you're working with. Alternatively, write an AJAX request and inspect or log the response from Dev Tools.

## gulp

Before you can begin work on the UI/UX, you'll need to get Browserify working with gulp. The required modules are already saved to package.json.

You have been provided a `gulpfile.js` by default with some gulp tasks already created for you. However, you will need to create the `build` and `clean` tasks yourself.

Available tasks are:

- `gulp serve`: serves the web app on `localhost:8000` **and** starts the API on `localhost:3000`
- `gulp serve:web`: serves **only** the web app on `localhost:8000`
- `gulp serve:api`: serves **only** the API
- `gulp build`: build the `js/bundle.js` file using Browserify

### lint

For the `lint` task, you will need to use the "gulp-jshint" package from npm. Add the "lint" task as a *dependency* for the "default" task. Use the `'default'` reporter for JSHint.

### clean

For the `clean` task, simply delete the `js/bundle.js` file to "clean up" your project files.

> On larger projects, everything might be built into a special build directory, and a `clean` task would be responsible for removing the build directory to ensure the new build is clean of any old files.

## State Management

Since some threads are already provided for you in the initial HTML, the first thing you should do is create the aforementioned state management. This should take care of 2 out of the 6 functions we just mentioned. It's important to implement state management early so we can see the moving parts even though nothing dynamic is being created yet.

## Templating

Since there will be a lot of reusable HTML to this project, you will be using Handlebars to break the reusable HTML into templates. Your templates should be saved to individual files in the `templates/` directory, i.e. `templates/tweet.handlebars`.

You will need to create a `template.js` that uses CommonJS to expose what you need for rendering templates and `require` that into `index.js` for use. Templates should be precompiled by `template.js` and your main script `index.js` should have no knowledge of how templates are created or compiled. Maintain *separation of concerns*.

## 4. Composing a Tweet

- Cancel the form submission. Since our submit button is inside a form, we don't want the form to actually submit to the form's action do we?
- Get the message the user typed into a variable
- Determine what type of compose we are doing. You can do this based on the context (position) of the `.compose` section. Are we in the header? Are we in a thread?
	- Call the appropriate template render method based our context to get the new HTML to be inserted
	- Add the HTML response to the correct place in the DOM
- Clear the `textarea` box so it has no value, and change the state of the `.compose` section so it's not expanded anymore.
- Create a new tweet or reply record in the database via the API

# Extra Credit

Feel free to do any (or all) of these as extra credit, or come back later and do them as extra practice on your free time. These do not take the place of any of the acceptance criteria, so before sure you focus on completing those first.

- Add minification to the bundle task (also known as uglifying)
- Add a "login" (drop down for switching users) and allow posting as a different user, optionally allow creating a new user
- Add a watch task that
  - rebundles your js when any js file (excluding `bundle.js`) is changed
  - optionally, refreshes the browser using [Browser Sync](http://www.browsersync.io/)
