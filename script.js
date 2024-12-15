
let wrapper = document.getElementById("wrapper")
let filters = document.querySelectorAll('.filter_time span');
let cardEl = (data, index, filter) => {
    let current = data.timeframes[filter]?.current ?? 0
    let previous = data.timeframes[filter]?.previous ?? 0
    return `
        <div class="card item${index}">
            <div class="background">
            <img src="${data.icon}" alt="${data.title}">
            </div>
            <div class="card_content">
            <div class="card_header">
                <h2>${data.title}</h2>
                <img src="./images/icon-ellipsis.svg" alt="action">
            </div>
            <div class="card_body">
                <span class="time">${current}hr${current > 1 ? `s` : ''}</span>
                <span class="time_old"> <span>Previous</span> - ${previous}hr${previous > 1 ? `s` : ''}</span>
            </div>
            </div>
        </div>
    `
}

let getData = (filter) => {
    fetch("./data.json").then((response) => {
        if (!response.ok) return false
        return response.json();
    }).then((data) => {
        if (!data) return false
        //remove child sẵn có
        wrapper.querySelectorAll(".card").forEach(el => wrapper.removeChild(el))
        data.forEach((element, index) => {
            wrapper.insertAdjacentHTML("beforeend", cardEl(element, index + 2, filter))
        });
    })
}
//default
getData("daily");

let handleFilter = (e) => {
    let filterTime = e.target.getAttribute('value')
    getData(filterTime)
    filters.forEach(el => el.toggleAttribute("active", false))
    e.target.toggleAttribute("active")
}
filters.forEach(filter => filter.addEventListener('click', handleFilter))
