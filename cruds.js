
let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category =document.getElementById('category');
let sumbit =document.getElementById('submit');

// console.log(title,price,taxes,ads,discount,total,count,category,sumbit)
let mood ='create';
// variable global
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,sumbit);

// functions
//  get total 
// بمجرد ما انا اكتب في الانبوت ينفذ هاي الدالة
function getTotal(){
// +discount.value  علامة الجمع للتحويل من سترنج الى ارقام
    if(price.value !=''){
        let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background = 'rgb(6, 130, 6)';
    }else{
        total.innerHTML ='';
        total.style.background ='#d31a0d';
    }
}
// اسهل مكان لحفظ البيانات هي المصفوفة
//  لمن انا اضغظ ع زر الانشاءاحفظ القيم المدخلة في الانبوت في المصفوفة
// نخزن البيانات في اللوكل ستورج
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro =[];
}
// اول ما انا اضغط على زر انشاء يعمل اوبجكت وكل خاصية في الاوبجكت حياخد القيمة تبعتها
//  create product
submit.onclick = function(){
let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
    }

    // count
    // لا يتم الانشاء او التعديل الا لمن يكون العنوان فيه داتا
    // if(title.value != '' && price.value !=  '' && category.value != '' && newPro.count < 100){
if(title.value != '' && price.value !=  '' && category.value != ''){
    if(mood === 'create'){

    if(newPro.count > 1){
        for(let i=0; i< newPro.count ;i++){
            dataPro.push(newPro);
        }
    }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[ tmp ] = newPro;
        mood = 'create';
        sumbit.innerHTML='Create';
        count.style.display = 'block';
    }
    // عشان ما يمسح البيانات غير لمن يتحقق الشرط وينشى منتج جديد 
    // ولكن اذا في شرط ما تحقق وضغطت على انشاء لا يتم الانشاء ولكن لا تمسح البيانات 
    clearData()
    // }
// save local Storage
localStorage.setItem('product' ,JSON.stringify(dataPro))
showData()
}
}
// clear inputs
// اول ما اضغط على انشاء تفضي الانبوت 
function clearData(){

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
// read
//اول ما انا اضغط على انشاء منتج المنتج هاد يظهر في الجدول يحصل له عملية القراءة

// مصفوفة فيها بيانات وبدي اجيبها واضيفها نعمل عليها لوب
function showData(){


    getTotal();
    let table = '';
    for(let i =0; i< dataPro.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id ="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML =table;
     // delete all
    let btnDelete =document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML =`
    <button onclick ="deleteAll()">delete All(${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML ='';
    }
}
showData()

// delete 
function deleteData(i){
    
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
// delete all
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0);
    showData()
}

// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;

    getTotal()

    count.style.display ='none';
    category.value = dataPro[i].category;
    sumbit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}
// search

let searchMood ='title';

function getSearchMood(id){
    

    let search = document.getElementById('search');
if(id == 'searchTitle'){
    searchMood = 'title';
}else{
    searchMood = 'category';
}
    search.placeholder = 'Search By ' + searchMood; 


    search.focus()
    search.value='';
    showData()
}

function searchData(value){

    let table = '';

    for(let i = 0 ; i < dataPro.length ; i++){
    if(searchMood == 'title')
    {

        // for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id ="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;

            }
        // }
    }
    else{

        
        // for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id ="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;

            }
        // }

    }
}
document.getElementById('tbody').innerHTML =table;
}

// clean Code 
//  تحسين الكود وتقليل عدد السطور
// clean data
// معرفة ماذا سوف يدخل المستخدم من بيانات
// متلا يعني لو الانبوت فاضية واضغط على انشاء ما ينشا ومتلا بدي اتحكم في عدد المنتجات


