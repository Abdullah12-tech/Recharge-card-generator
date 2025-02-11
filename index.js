generateBTN.addEventListener("click", generateRechargeCard)
saveBTN.addEventListener("click", addRechargeCard)
rechargeBTN.addEventListener("click", rechargeCardsINP)

let rechargeCards = JSON.parse(localStorage.getItem("recharge")) || [];

//null or falsy value
// if (rechargeCards !== null) {
//   rechargeCards = JSON.parse(localStorage.getItem("recharge"));  
// }else{
//     rechargeCards = [];
// }

let card;


function addRechargeCard() {
    let networkCodes = {
        mtn: "*311*",
        glo: "*123*",
        airtel: "*888*",
        "9mobile": "*122*"
    }

    card.rechargeCode = `${networkCodes[card.network]}${card.pin}#`
    rechargeCards.push(card);

    updateLocalStorage()
    // console.log(rechargeCards);

    
    saveCardINP(rechargeCards)
}
function generateRechargeCard() {
    // console.log("I have been clicked");
    
    card = {
        network: networkINP.value.trim(),
        amount: amountINP.value.trim(),
        status: false,
        dateCreated: new Date().toLocaleDateString(),
        dateUsed: "Not yet used"
    }
    // console.log(card);

    if (networkINP.value === "" || amountINP.value === "") {
        alert("Ensure all fields are filled")
        return
    }
    
    

    let networkLength = {
        glo: 12,
        mtn: 14,
        airtel: 13,
        "9mobile": 11
    }
    let code = generateCode(networkLength[card.network])
    card.pin = code
    codeINP.value = code;
    // console.log(code);
}
function generateCode(length) {
    let code = ""
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
    // console.log(code.length);
    
    // console.log("show me please");
    
}

function updateLocalStorage() {
    localStorage.setItem("recharge", JSON.stringify(rechargeCards));
}

searchINP.addEventListener("keyup", FilterRechargeCard)
function FilterRechargeCard() {
    let FilterInp = searchINP.value.toLowerCase();
    let whatToBeFiltered = rechargeCards.filter(card => 
        card.network.toLowerCase().includes(FilterInp)
    )
    // console.log(whatToBeFiltered);
    
    // generateRechargeCard(whatToBeFiltered)
    saveCardINP(whatToBeFiltered)
    // console.log("I am here");
    
}

function saveCardINP(rechargeCards) {
    // console.log("I have been clicked");
    tbodyTable.innerHTML = "";
    rechargeCards.forEach((card, i)=>{
        tbodyTable.innerHTML += `
            <tr>
                  <td>${i + 1}</td>
                  <td>${card.network}</td>
                  <td>${card.pin}</td>
                  <td>${card.rechargeCode}</td>
                  <td>${card.status ? "used" : "unused"}</td>
                  <td>${card.dateCreated}</td>
                  <td>${card.dateUsed}</td>
                  <td><button onclick="deleteRechargeCard(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `;
    })
    if (rechargeCards.length === 0) {
        tbodyTable.innerHTML = `
            <tr>
                <td colspan="8">No record here</td>
            </tr>
        `
    }
    

}
function deleteRechargeCard(i) {
    rechargeCards.splice(i, 1)
    saveCardINP(rechargeCards)
    updateLocalStorage()
}
saveCardINP(rechargeCards)

let minattempts = 1;
let maxattempts = 3;
function rechargeCardsINP() {
    let cardPin = rechargeINP.value.trim()
    let cardToBeRecharged = rechargeCards.find((card) => {
        return card.rechargeCode === cardPin
    })

    if (rechargeINP.value === "") {
        alert("Please Enter a pin")
        return

        
    }else{
        if (minattempts < maxattempts) {
            minattempts++
            if (!cardToBeRecharged) {
                alert("Invalid Pin")
                return
            }

            if(!cardToBeRecharged.status) {
                alert("Recharge Successful")
                cardToBeRecharged.status = true
                cardToBeRecharged.dateUsed = new Date().toLocaleDateString()
                saveCardINP(rechargeCards)
                updateLocalStorage()
            }else{
                alert("Card has been used")
            }
            
            
            
        }else{
            alert("You have reached the maximum attempts for today")
            document.body.innerHTML = `
                <h1 style="text-align: center; font-size: 15rem;">Come back in the next 24 hours</h1>
            `;

        }
            
    }
    
    
    
    
    
}




