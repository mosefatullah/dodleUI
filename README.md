## DoodleUI

A css & js framework for creating UI & executing functionalities for better UI.

**Current Version** : v0.0.3
<br/>
**Created by** : Mohammad Sefatullah
**Last updated on** : 5 May 2024

### Installation

Run the following command in your project directory:-

```bash
npm install doodleui
```

Or, you can download the [zip](https://github.com/mosefatullah/doodleui/zipball/main) file & then keep the `dist` folder in your project directory.

### Usage

For HTML, import the library as follows:

```html
<script src="node_modules/doodleui/dist/doodleui.es.js"></script>
```

For ReactJS & other frameworks, import the library as follows:

```javascript
const doodleui = require("doodleui");
```

### Documentation

#### 1. DoodleUI

##### 1.0. Selectors & Options

```javascript
// String for Single Element
DoodleUI("#element");

// Array for NodeList
DoodleUI([".element"]);

// Custom
DoodleUI(document.getElementById("element"));
```

```javascript
// Options
DoodleUI("#element", {
 class: "mt-5 pl-2",
});
```

##### 1.1. DoodleUI.zoom

Creates zoom in & out functionality for an image.

```javascript
DoodleUI("#element").zoom();
```

##### 1.2. DoodleUI.observe

Creates an observer for an element.

```javascript
DoodleUI("#element").observe(
 (element) => {
  // When Observer is intersecting
 },
 (element) => {
  // When Observer is not intersecting
 }
);
```

##### 1.3. DoodleUI.scroll

Creates a scroll functionality for an element.

```javascript
DoodleUI("#element").scroll(
 (scrollTopOfElement, scrollTopOfWindow, element) => {
  // Logics
  if (scrollTopOfElement >= scrollTopOfWindow) {
   // When user reaches the top of the element
  } else {
   // When not reached
  }
 }
);
```

### License

Released under the [MIT License](https://github.com/mosefatullah/doodleui/blob/main/LICENSE) <br/>
Copyright © 2021 [Mohammad Sefatullah]()

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Support

<a href="https://www.buymeacoffee.com/mosefatullah" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="33px" width="120px"></a>

### Follow Me

[![Twitter](https://img.shields.io/twitter/follow/mosefatullah?style=social)](https://twitter.com/mosefatullah)
[![GitHub](https://img.shields.io/github/followers/mosefatullah?style=social)](https://github.com/mosefatullah)

[![Instagram](https://img.shields.io/badge/Instagram-mosefatullah-red?style=flat-square&logo=instagram)](https://www.instagram.com/mosefatullah/)
[![Facebook](https://img.shields.io/badge/Facebook-mosefatullah-blue?style=flat-square&logo=facebook)](https://www.facebook.com/mosefatullah/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mosefatullah-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/mosefatullah/)
[![YouTube](https://img.shields.io/badge/YouTube-mosefatullah-red?style=flat-square&logo=youtube)](https://www.youtube.com/channel/UCQfjLWq7nSCaZgX6PnOYjzQ)
