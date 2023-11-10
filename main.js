let price = document.getElementById('price'),
    taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    count = document.getElementById('count'),
    submit = document.getElementById('submit'),
    tbody = document.getElementById('tbody'),
    btnDeleteAll = document.getElementById('DeleteAll'),
    search = document.getElementById('search');
// < ================== get total =============== >
function getTotal(){
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.style.background = ' green'
    }else{
        total.innerHTML = ''
        total.style.background = 'red'
    }
}
// < ================== Add to dataProuduit[] and LocalStorage =============== >
let Mood = 'create';
let tmp;
let dataProuduit = [];
// get data in localStorage
if (localStorage.produit != null) {
    dataProuduit = JSON.parse(localStorage.produit)
}
submit.onclick = ()=>{
    let produit = {
        title : title.value.toLocaleLowerCase(),
        price : price.value,
        taxes : taxes.value || 0,
        ads : ads.value || 0,
        discount : discount.value || 0,
        total: total.innerHTML,
        category : category.value.toLocaleLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (Mood === 'create'){
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataProuduit.push(produit)
                }
            }
            else{
                dataProuduit.push(produit)
            }
        }else{
            dataProuduit[tmp] = produit
            count.style.display = 'block'
            submit.innerText = 'create'
            Mood ='create'
        }
    }
    // sauve in localStorage
    localStorage.setItem('produit', JSON.stringify(dataProuduit))
    readData()
    cleanData()
}
// < ================== clean Data ================= >
function cleanData(){
    title.value= ''
    price.value= ''
    taxes.value= ''
    ads.value= ''
    discount.value = ''
    count.value = ''
    category.value = ''
    search.value = ''
    getTotal()
}
// < ================== read data ================= >
function readData(){
    let table = '';
    for (let i = 0; i < dataProuduit.length; i++) {
        table += `
         <tr>
             <td>${i+1}</td>
             <td>${dataProuduit[i].title}</td>
             <td>${dataProuduit[i].price}</td>
             <td>${dataProuduit[i].taxes}</td>
             <td>${dataProuduit[i].ads}</td>
             <td>${dataProuduit[i].discount}</td>
             <td>${dataProuduit[i].total}</td>
             <td>${dataProuduit[i].category}</td>
             <td><button onclick="udapteData(${i})" id="submit">udapte</button></td>
             <td><button onclick="Deletedata(${i})" id="submit">delete</button></td>
        </tr>
        `
    }
    tbody.innerHTML = table
    if (dataProuduit.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="DeletAll()" id="submit">Delete All ( ${dataProuduit.length} )</button>
        `
    }else{
        btnDeleteAll.innerHTML = ''
    }
}
readData()
// < ================== Delete All Data ================= >
function DeletAll(){
    localStorage.clear()
    dataProuduit.splice(0)
    readData()
    cleanData()
}
// < ================== delete one data ================= >
function Deletedata(index){
    dataProuduit.splice(index,1)
    localStorage.setItem('produit',JSON.stringify(dataProuduit))
    readData()
}
// < ================== udapte data ================= >
function udapteData(index) {
    title.value= dataProuduit[index].title
    price.value= dataProuduit[index].price
    taxes.value= dataProuduit[index].taxes
    ads.value= dataProuduit[index].ads
    discount.value = dataProuduit[index].discount
    getTotal()
    count.style.display = 'none'
    category.value =dataProuduit[index].category
    submit.innerText = 'Udapte'
    scroll({top:0})
    Mood = 'udapte'
    tmp = index;
}
// < ================== search data ================= >
let MoodSearch = 'title'
function searchMood(id){
    if (id === 'searchTitle') {
        MoodSearch = 'title'
    }else{
        MoodSearch = 'categorey'
    }
    search.focus()
    search.placeholder = `Search By ${MoodSearch}`;
    cleanData()
    readData()
}
function searchData(value){
    let table = '' ;
        for (let i = 0; i < dataProuduit.length; i++) {
            if ( MoodSearch === 'title' && dataProuduit[i].title.includes(value.toLocaleLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProuduit[i].title}</td>
                    <td>${dataProuduit[i].price}</td>
                    <td>${dataProuduit[i].taxes}</td>
                    <td>${dataProuduit[i].ads}</td>
                    <td>${dataProuduit[i].discount}</td>
                    <td>${dataProuduit[i].total}</td>
                    <td>${dataProuduit[i].category}</td>
                    <td><button onclick="udapteData(${i})" id="submit">udapte</button></td>
                    <td><button onclick="Deletedata(${i})" id="submit">delete</button></td>
               </tr>
               `
            }else if(dataProuduit[i].category.includes(value.toLocaleLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProuduit[i].title}</td>
                    <td>${dataProuduit[i].price}</td>
                    <td>${dataProuduit[i].taxes}</td>
                    <td>${dataProuduit[i].ads}</td>
                    <td>${dataProuduit[i].discount}</td>
                    <td>${dataProuduit[i].total}</td>
                    <td>${dataProuduit[i].category}</td>
                    <td><button onclick="udapteData(${i})" id="submit">udapte</button></td>
                    <td><button onclick="Deletedata(${i})" id="submit">delete</button></td>
               </tr>
               `
            }
        }
    tbody.innerHTML = table
}