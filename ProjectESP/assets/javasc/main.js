
// function animateNumber(finalNumber, delay, startNumber = 0, callback) {
//     let currentNumber = startNumber
//     const interval = window.setInterval(updateNumber, delay)
//     function updateNumber() {
//       if (currentNumber >= finalNumber) {
//         clearInterval(interval)
//       } else {
//         currentNumber++
//       }
//       callback(currentNumber)
//     }
//   }
var x;
var lua;
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
    X = 350;
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
    const firebaseConfig = {
        apiKey: "AIzaSyD3XxymaoiLEZV1AUG-nH7YC1YzIsKiVt8",
        authDomain: "esp32-bfa08.firebaseapp.com",
        databaseURL: "https://esp32-bfa08-default-rtdb.firebaseio.com",
        projectId: "esp32-bfa08",
        storageBucket: "esp32-bfa08.appspot.com",
        messagingSenderId: "165170941296",
        appId: "1:165170941296:web:50e585eafd5ff0a87253b5",
      };
    
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      // firebase.database().ref("/baochaySystem").update({
      //     "Khoi" : 500
      //     "lua"  : true
      // })
  

      //get database
  
  firebase.database().ref("/baochaySystem/Khoi").on("value", function(snapshot){
      x = snapshot.val();
      checkSmoke(x);
      checkTempurator(x);
  })
  var luaStatus = document.querySelector('.status-fire');
  firebase.database().ref("/baochaySystem/lua").on("value", function(snapshot){
      lua = snapshot.val();
        if(lua == true){
            return luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
        }
        else
            return luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
  })










    // function animateNumber(finalNumber, delay, startNumber = 0, callback) {
    //     let currentNumber = startNumber
    //     const interval = window.setInterval(updateNumber, delay)
    //     function updateNumber() {
    //       if (currentNumber >= finalNumber) {
    //         clearInterval(interval)
    //       } else {
    //         currentNumber++
    //       }
    //       callback(currentNumber)
    //     }
    //   }
    //  animateNumber(400, 15  , 0, function (number) {
    //     x = number.toLocaleString()
    //     checkSmoke(x);
    //     checkTempurator(x);
    //   })
    //  animateNumber(400, 15  , 0, function (number) {
    //     x = number.toLocaleString()
    //     checkSmoke(x);
    //     checkTempurator(x);
    //   })

     
