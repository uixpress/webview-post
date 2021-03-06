# webview-post

## About
---
Post messages to/from a web-view on iOS or Android using pubsub modal.

## Getting Started
---
    npm i @uixpress/webview-post

## Default Usage Example:
---
```javascript
import wv from '@uixpress/webview-post';

// Add subscriber in your code to be called later by the native app. you need to put this at the root of the app.
wv.subscribe("ALERT", (msg) => { console.log(`Alert Message Says: ${msg}!`) });

// Publish with a payload - This will send message from Webview to Native side.
wv.publish("ALERT", {msg: "Hello"});

// Invoke the subscriber from the Native side - This will send messages from the Native side to webview.
window.webviewPost.ALERT({msg: "Hi"});
```

## Configure Custom Reference
---
In some cases if you want to have your own custom object attached to the global space name `window`, then you can add that in the config method as follow:
    
```javascript
// Add a config with a custom app name to be used in the window object. Make sure this is defined in the root of the app.
wv.config({appInstance: "myWebview"});

// Add subscriber as shown above.
// Native app can reference the custom global object. 
window.myWebview.ALERT({msg: "Hi"})
```