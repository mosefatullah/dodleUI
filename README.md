<p align="center">
  <img alt="DoodleUI" src="assets/doodleui-logo.png" height="100" />
</p>
<h1 align="center">DoodleUI</h1>
<p align="center">
    <i>Version: 1.0.0</i>
</p>
<p align="center">✨ A frontend library that simplifies UI functionality focusing on modern features & eliminating code redundancy.</p>

<p align="center">
    <a href="https://github.com/mosefatullah/doodleui/blob/master/LICENSE">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
    </a>
</p>

<br/>

## ⚙️ Installation

Run the following command in your project directory :-

```bash
npm install doodleui
```

Also, you can download the zip file & then keep the `dist` folder in your project directory. You can also rename the folder as you wish. For example we use `doodleui`.

<a href="https://github.com/mosefatullah/doodleui/zipball/main">Download the zip file</a>

<br/>

## 📦 Importing

<p>(ℹ️) <span style="color: #999">This version is not efficient to directly import the module libraries (lib/*/index.js).</span></p>

### ES Module

Recommended and modern way to import the library in your project (eg. react).

```js
import $ from "doodleui";
```

For HTML, import the library as follows:

```html
<script type="module">
 import $ from "./doodleui/doodleui.js";
</script>
```

Or, use import map:

```html
<script type="importmap">
 {
  "imports": {
   "doodleui": "/doodleui/doodleui.js"
  }
 }
</script>
<script type="module">
 import $ from "doodleui";
</script>
```

### Universal Module Definition

UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.

```html
<script src="/doodleui/doodleui.umd.js" type="text/javascript">
 <script>
      DoodleUI("#abc")...
</script>
```

<br/>

## 📖 Documentation Guide

<h3 align="center">1. Basics</h3>

#### 1.0. Selectors

```javascript
// String for Element(s)
DoodleUI("#abc").
DoodleUI(".abc").
DoodleUI("body > img")[0].

// Array for NodeList
DoodleUI([".abc"]).

// Custom
DoodleUI(document.getElementById("abc")).
```

#### 1.1. Options

```javascript
// Options
DoodleUI("#abc", {
 class: "mt-5 pl-2",
});
```

#### 1.2. Process & Callback

```javascript
 import $, {DoodleUI} from "doodleui"; // You can change $ to any name

 $(). // User Interface
 DoodleUI. // Utility & API
```

<br/>

<h3 align="center">2. User Interface</h3>

#### 2.1. $().zoom

Creates a zoom effect for images.

```javascript
$("#abc").zoom();
```

#### 2.2. $().observer

Creates an intersection observer for elements.

```javascript
$("#abc").observer(
 (element) => {
  // When observer is intersecting
 },
 (element) => {
  // When observer is not intersecting
 }
);
```

<br/>

<h3 align="center">3. Utility</h3>

#### 3.1. DoodleUI.keypress

Creates a keypress event for the user.

```javascript
DoodleUI.keypress((keyName, keyEvent) => {
 if (keyName === "Ctrl+M") {
  // When user presses control & m key
 }
});
```

<br/>

<h3 align="center">4. API</h3>

#### 4.1. DoodleUI.location

Gets the location of the user.

```javascript
DoodleUI.location((position, object) => {
 console.log(position.lat, position.long);
});
```

#### 4.2. DoodleUI.storage

Stores data in the local storage, session storage, indexedDB or cookie.

Local Storage:

```javascript
DoodleUI.storage("local").set("name", "Mehmed");
DoodleUI.storage("local").get("name");
DoodleUI.storage("local").remove("name");
DoodleUI.storage("local").clear();
```

Session Storage:

```javascript
DoodleUI.storage("session").set("name", "Sulaiman");
DoodleUI.storage("session").get("name");
DoodleUI.storage("session").remove("name");
DoodleUI.storage("session").clear();
```

Cookie:

```javascript
DoodleUI.storage("cookie").set("name", "Murad");
DoodleUI.storage("cookie").get("name");
DoodleUI.storage("cookie").remove("name");
DoodleUI.storage("cookie").clear();
```

<br/>

## License

Released under the [MIT License](https://github.com/mosefatullah/doodleui/blob/main/LICENSE) <br/>
Copyright © 2024 [Mohammad Sefatullah]()

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

<a href="https://www.buymeacoffee.com/mosefatullah" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="33px" width="120px"></a>

## Follow Me

[![Twitter](https://img.shields.io/twitter/follow/mosefatullah?style=social)](https://twitter.com/mosefatullah)
[![GitHub](https://img.shields.io/github/followers/mosefatullah?style=social)](https://github.com/mosefatullah)

[![Instagram](https://img.shields.io/badge/Instagram-mosefatullah-red?style=flat-square&logo=instagram)](https://www.instagram.com/mosefatullah/)
[![Facebook](https://img.shields.io/badge/Facebook-mosefatullah-blue?style=flat-square&logo=facebook)](https://www.facebook.com/mosefatullah/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mosefatullah-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/mosefatullah/)
[![YouTube](https://img.shields.io/badge/YouTube-mosefatullah-red?style=flat-square&logo=youtube)](https://www.youtube.com/channel/UCQfjLWq7nSCaZgX6PnOYjzQ)
