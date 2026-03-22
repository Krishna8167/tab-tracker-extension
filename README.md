# Tab Tracker (Chrome Extension)

A lightweight Chrome extension that allows you to save and manage browser tabs for later use. It captures the current tab or manually entered URLs and stores them locally in your browser.

---

## Overview

Tab Tracker is a simple productivity tool designed to help you keep track of useful links while browsing. All saved tabs persist using `localStorage`, so they remain available even after closing the browser.

---

## Features

* Save the current active tab with one click
* Manually add custom URLs
* Persistent storage using `localStorage`
* Clickable links that open in a new tab
* Clear all saved tabs with a double-click

---

## How It Works

The application maintains an array called `myTabs` that stores all saved URLs.

* On load, it checks `localStorage` for existing data
* If data exists, it renders the saved tabs
* Users can:

  * Add a tab manually
  * Save the current browser tab
  * Delete all saved tabs

---

## Core Logic

### Save Current Tab

```javascript id="4h8p2a"
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myTabs.push(tabs[0].url)
    localStorage.setItem("myTabs", JSON.stringify(myTabs))
    render(myTabs)
})
```

### Save Manual Input

```javascript id="q2x7lm"
inputBtn.addEventListener("click", function() {
    myTabs.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myTabs", JSON.stringify(myTabs))
    render(myTabs)
})
```

### Render Tabs

```javascript id="8n1kzs"
function render(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tabs[i]}'>
                    ${tabs[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
```

### Delete All Tabs

```javascript id="z5p1vc"
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myTabs = []
    render(myTabs)
})
```

---

## Data Storage

Tabs are stored as a JSON array in the browser:

```javascript id="n9x0kq"
localStorage.setItem("myTabs", JSON.stringify(myTabs))
```

On load:

```javascript id="r3m8jt"
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))
```

---

## Requirements

* Google Chrome
* Chrome Extension permissions:

  * `"tabs"`

---

## Installation

1. Download or clone the project
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

---

## Possible Improvements

* Prevent duplicate URLs
* Add delete button for individual tabs
* Store tab titles instead of just URLs
* Add favicon support
* Implement search or filtering

---

## Summary

This project demonstrates practical use of:

* DOM manipulation
* Event handling
* Local storage
* Chrome Tabs API

It is a minimal but functional tool for saving and organizing tabs efficiently.
