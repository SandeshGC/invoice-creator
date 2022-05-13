//add/remove the services in the 'services' array
const serviceName = [
    "Wash Car",
    "Mow Lawn",
    "Pull Weeds"
    // "Clean House"
];
//add/remove the respective costs of services in the 'serviceCost' array
const serviceCost = [
    10,
    20,
    30
    // 40
]
let chosenServiceArr = JSON.parse(localStorage.getItem("chosenServices"))
// console.log(chosenServiceArr)
const taskList = document.querySelector("#task-list");
const costList = document.querySelector("#cost-list");
const serviceBtnContainer = document.querySelector("#service-btn-container")
const totalAmount = document.querySelector("#total-amt")
const sendInvoiceBtn = document.querySelector("#send-invoice-btn")

renderServiceBtn(serviceName); //renders the service buttons using existing services in the 'serviceArr' array to the 'serviceBtnContainer'
if (chosenServiceArr == null) {
    chosenServiceArr = []; //setting empty array if it is null because properties of null cannot be read "eg. null.includes(), null.length"
}
renderTasks(chosenServiceArr)
renderCosts(chosenServiceArr)
function getService(serviceEl) { //receives the service which is clicked
    let chosenService = serviceEl.textContent;
    if (chosenServiceArr.includes(chosenService)) {
//         console.log("Element already exists!")
        window.alert("You have already selected this service!");
        return;
    } else {
        chosenServiceArr.push(chosenService) //adding to chosen services array
        localStorage.setItem("chosenServices", JSON.stringify(chosenServiceArr))
        renderTasks(chosenServiceArr)
        renderCosts(chosenServiceArr)
    }

}

function renderCosts(arr) {
    let tempDOM = ""
    let totalCost = 0
    for (let i = 0; i < arr.length ; i++) {  //checking each item in chosenServiceArr array with the items in serviceName array
        for (let j = 0; j < serviceName.length; j++) {
            if (arr[i] == serviceName[j]) {
                tempDOM += `<li><span class="dollar-sign">$</span>${serviceCost[j]}</li>` //adding serviceCost of respective services to the cost list
                totalCost += serviceCost[j]
            }
        }
    }
    totalAmount.textContent = "$"+totalCost;
    costList.innerHTML = tempDOM;
}

function renderTasks(arr) {
    let tempDOM = ''; //temporarily accumulates the DOM content to be rendered as list items
    for (let i = 0; i < arr.length; i++) {
        tempDOM += `<li>${arr[i]}</li>`
    }
    taskList.innerHTML = tempDOM;

}

function renderServiceBtn(arr) { //renders an array of services as button at the top of webpage
    let tempDOM = ''; //temporarily accumulates the DOM content to be rendered 
    for (let i = 0; i < arr.length; i++) {
        tempDOM += `<button class="service-btn" onclick="getService(this)">${arr[i]}</button>`
    }
    serviceBtnContainer.innerHTML = tempDOM;
}


//function to send invoice and clear
sendInvoiceBtn.addEventListener("click", clearInvoice)

function clearInvoice() {

    chosenServiceArr = [];
    localStorage.removeItem("chosenServices");
    // localStorage.removeItem("serviceCosts")
    //later use localStorage.clear()
    taskList.innerHTML = chosenServiceArr
    costList.innerHTML = "";
    totalAmount.textContent = "$0"
    window.alert("The invoice has been sent successfully!");
}
