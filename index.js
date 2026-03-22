let myTabs = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))

function isValidURL(url) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage
    render(myTabs)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const tab = {
            url: tabs[0].url,
            title: tabs[0].title
        }

        if (!myTabs.some(t => t.url === tab.url)) {
            myTabs.push(tab)
        }

        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        render(myTabs)
    })
})

function render(tabs) {
    ulEl.innerHTML = ""

    for (let i = 0; i < tabs.length; i++) {
        const li = document.createElement("li")
        const a = document.createElement("a")

        a.href = tabs[i].url
        a.textContent = tabs[i].title || tabs[i].url
        a.target = "_blank"
        a.rel = "noopener noreferrer"

        li.appendChild(a)
        ulEl.appendChild(li)
    }
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.removeItem("myTabs")
    myTabs = []
    render(myTabs)
})

inputBtn.addEventListener("click", function() {
    let value = inputEl.value.trim()

    if (!value.startsWith("http://") && !value.startsWith("https://")) {
        value = "https://" + value
    }

    if (isValidURL(value) && !myTabs.some(t => t.url === value)) {
        myTabs.push({
            url: value,
            title: value
        })

        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        render(myTabs)
    } else {
        alert("Enter a valid and unique URL")
    }

    inputEl.value = ""
})