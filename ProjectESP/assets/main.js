// var coursesApi = 'http://localhost:3000/temperature';

// var coursesBlock = document.querySelector('#list-courses');


// get = function(callback){
//     fetch(coursesApi)
//         .then(function(response){
//             return response.json();
//         })
//         .then(callback)
// }

// renderCourses = function(courses){
//     var html ='';
//     courses.forEach(course => {
//         return html += `
//         <li>
//             <h2>${course.name}</h2>
//             <p>${course.description}</p>
//             <button onclick="deleteCourse(${course.id})"> Xóa </button>
//         </li>
//         `
//     });
//     coursesBlock.innerHTML = html 
// }

// createCourse = function(data, callback){
//     var options = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//     }
//     fetch(coursesApi,options)
//         .then(function(Response){
//             return Response.json()
//         })
//         .then(callback)
// }

// deleteCourse = function(id){
//     var options = {
//             method: 'DELETE',
//             headers: {'Content-Type': 'application/json'},
//     }
//     fetch(coursesApi+"/"+id,options)
//         .then(function(Response){
//             return Response.json()
//         })
// }


// createBtn = document.querySelector('#create')
// createBtn.onclick = function(){
//     var name = document.querySelector('input[name="name"]').value
//     var description = document.querySelector('input[name="description"]').value
//     var dataCourse = {
//         name: name,
//         description: description
//     }
//     createCourse(dataCourse,renderCourses)

// }

// function start (){
//     getCourses(renderCourses);
// };
function animateNumber(finalNumber, delay, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, delay)
    function updateNumber() {
      if (currentNumber >= finalNumber) {
        clearInterval(interval)
      } else {
        currentNumber++
      }
      callback(currentNumber)
    }
  }

animateNumber(98, 50, 0, function (number) {
    const formattedNumber = number.toLocaleString()
    return formattedNumber
  }) 
var x;
var temperature = document.querySelector('.parameter');
//var x = Math.floor(Math.random() * 400);
var trangThai = document.querySelector('.status-content');
var formGetdata = document.querySelector('.form__getData');
var formGetdataHeading = document.querySelector('.form__getData-heading');
var background  = document.querySelector('.background');
var checkTempurator = (celcius) => {
    temperature.innerHTML = `${x}`
    if(celcius > 200 && celcius <= 300){
        temperature.innerHTML = `<span class="colorOrange">${x}</span>`
        if(formGetdata.classList.contains('form__getData--warning')){
            formGetdata.classList.remove('form__getData--warning')
        }
        if(formGetdataHeading.classList.contains('form__getData-heading--warning')){
            formGetdataHeading.classList.remove('form__getData-heading-heading--warning')
        }
        formGetdataHeading.classList.add('form__getData-heading--abnormal');
        formGetdata.classList.add('form__getData--abnormal');
        return trangThai.innerHTML = `<p class='colorOrange' >Mật độ khói cao!!!!</p>`
    }
    else if(celcius > 300){
        temperature.innerHTML = `<span class="colorRed">${x}</span>`
        if(formGetdataHeading.classList.contains('form__getData-heading--abnormal')){
            formGetdataHeading.classList.remove('form__getData-heading--abnormal')
        }
        formGetdataHeading.classList.add('form__getData-heading--warning');
        if(formGetdata.classList.contains('form__getData--abnormal')){
            formGetdata.classList.remove('form__getData--abnormal')
        }
        formGetdata.classList.add('form__getData--warning');
        return trangThai.innerHTML = `<p class='colorRed'>Cảnh Báo Cháy!!!!</p>`
    }
    else {
        if(formGetdataHeading.classList.contains('form__getData-heading--abnormal')){
            formGetdataHeading.classList.remove('form__getData-heading--abnormal')
        }
        if(formGetdataHeading.classList.contains('form__getData-heading--warning')){
            formGetdataHeading.classList.remove('form__getData-heading--warning')
        }


        if(formGetdata.classList.contains('form__getData--abnormal')){
            formGetdata.classList.remove('form__getData--abnormal')
        }
        if(formGetdata.classList.contains('form__getData--warning')){
            formGetdata.classList.remove('form__getData--warning')
        }
        temperature.innerHTML = `<span>${x}</span>`
        return trangThai.innerHTML = 'Bình Thường'
    }
}

var buttonFirst = document.querySelector('.btn1');
buttonFirst.addEventListener('click', ()=>{
    x = Math.floor(Math.random() * 400);
    temperature.innerHTML = `${x}`
    checkTempurator(x);
    checkSmoke(x);
});

var buttonSecond = document.querySelector('.btn2');
buttonSecond.addEventListener('click', ()=>{
    x = 0;
    temperature.innerHTML = `${x}`
    checkTempurator(x);
    checkSmoke(x);
})

var buttonUp = document.querySelector('.icon-arrow-up');

buttonUp.addEventListener('click',()=>{
    x++;
    temperature.innerHTML = `${x}`
    checkTempurator(x);
    checkSmoke(x);
})

var buttonDown = document.querySelector('.icon-arrow-down');

buttonDown.addEventListener('click',()=>{
    x--;
    temperature.innerHTML = `${x}`;
    checkTempurator(x);
    checkSmoke(x);
})
var checkSmoke = (smoke) => {
    if(smoke>= 200 && smoke <300)
    {
        if(background.classList.contains('normal'))
        {
            background.classList.remove('normal');
        }
        if(background.classList.contains('warning'))
        {
            background.classList.remove('warning');
        }
        background.classList.add('abnormal');
    }
    else if(smoke > 300)
    {
        if(background.classList.contains('abnormal'))
        {
            background.classList.remove('abnormal');
        }
        if(background.classList.contains('normal'))
        {
            background.classList.remove('normal');
        }
        background.classList.add('warning');
    }
    else{
        if(background.classList.contains('abnormal'))
        {
            background.classList.remove('abnormal');
        }
        if(background.classList.contains('warning'))
        {
            background.classList.remove('warning');
        }
        background.classList.add('normal');
    }

    }
    
    function animateNumber(finalNumber, delay, startNumber = 0, callback) {
        let currentNumber = startNumber
        const interval = window.setInterval(updateNumber, delay)
        function updateNumber() {
          if (currentNumber >= finalNumber) {
            clearInterval(interval)
          } else {
            currentNumber++
          }
          callback(currentNumber)
        }
      }
    
    animateNumber(400, 15   , 0, function (number) {
        x = number.toLocaleString()
        checkSmoke(x);
        checkTempurator(x);
      }) 