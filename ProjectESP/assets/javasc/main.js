
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var x;
var lock = 0;
var lua;
var loadLocales = [];
var element = {
};
var getMap = document.querySelector('.map');
var smokeParameter = document.querySelector('.parameter');
var trangThai = document.querySelector('.status-content');
var formGetdata = document.querySelector('.form__getData');
var formGetdataHeading = document.querySelector('.form__getData-heading');
var background  = document.querySelector('.background');
var preView = document.querySelector('.preview');
var getValue = document.querySelector('.form__input--latitude');
var valueFirst = document.querySelector('.do');
var valueSecond = document.querySelector('.phut');
var autoLocal = document.querySelector('.form__button--getlocal');
var saveLocal = document.querySelector('.form__button--save');
var getKey = document.querySelector('.form-getkey');
var vido;
var kinhdo;
var saveLocalValue;
var stringSecond;
var locateCreate = document.querySelector(".Locate--save");
const formButton = $(".form__button--send");
const getLocate = $(".getLocate");
const printLocate = $(".locatePrint");
var count;
var dcount;
var d = 0;
var f = 0;

  ///Notify
  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("Cảnh báo cháy");
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Cảnh báo cháy");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

function smokeRule(smoke) {
    smokeParameter.innerHTML = `${x}`;
    if (smoke > 200 && smoke <= 300 && lock == 1) {
        smokeParameter.innerHTML = `<span class="colorOrange">${x}</span>`;
        if (formGetdata.classList.contains('form__getData--warning')) {
            formGetdata.classList.remove('form__getData--warning');
        }
        if (formGetdataHeading.classList.contains('form__getData-heading--warning')) {
            formGetdataHeading.classList.remove('form__getData-heading-heading--warning');
        }
        formGetdataHeading.classList.add('form__getData-heading--abnormal');
        formGetdata.classList.add('form__getData--abnormal');
        return trangThai.innerHTML = `<p class='colorOrange' >Mật độ khói cao!!!!</p>`;
    }
    else if (smoke > 300 && lock == 1) {
        smokeParameter.innerHTML = `<span class="colorRed">${x}</span>`;
        if (formGetdataHeading.classList.contains('form__getData-heading--abnormal')) {
            formGetdataHeading.classList.remove('form__getData-heading--abnormal');
        }
        formGetdataHeading.classList.add('form__getData-heading--warning');
        if (formGetdata.classList.contains('form__getData--abnormal')) {
            formGetdata.classList.remove('form__getData--abnormal');
        }
        notifyMe()
        formGetdata.classList.add('form__getData--warning');
        return trangThai.innerHTML = `<p class='colorRed'>Cảnh Báo Cháy!!!!</p>`;
    }
    else {
        if (formGetdataHeading.classList.contains('form__getData-heading--abnormal')) {
            formGetdataHeading.classList.remove('form__getData-heading--abnormal');
        }
        if (formGetdataHeading.classList.contains('form__getData-heading--warning')) {
            formGetdataHeading.classList.remove('form__getData-heading--warning');
        }


        if (formGetdata.classList.contains('form__getData--abnormal')) {
            formGetdata.classList.remove('form__getData--abnormal');
        }
        if (formGetdata.classList.contains('form__getData--warning')) {
            formGetdata.classList.remove('form__getData--warning');
        }
        smokeParameter.innerHTML = `<span>${x}</span>`;
        return trangThai.innerHTML = 'Bình Thường';
    }
}

var buttonFirst = document.querySelector('.btn1');
buttonFirst.addEventListener('click', ()=>{
    printLocate.classList.add("hide");
    formGetdata.classList.add("hide");
    getLocate.classList.remove("hide");
    background.classList.add('normal');
    background.classList.remove('warning');
    background.classList.remove('abnormal');
    
});

var buttonSecond = document.querySelector('.btn2');
buttonSecond.addEventListener('click', ()=>{
    
})

var buttonUp = document.querySelector('.icon-arrow-up');

buttonUp.addEventListener('click',()=>{
    x++;

})

var buttonDown = document.querySelector('.icon-arrow-down');

buttonDown.addEventListener('click',()=>{
    x--;
    smokeParameter.innerHTML = `${x}`;

})
var checkSmoke = (smoke) => {
    if(smoke>= 200 && smoke <= 300 && lock == 1)
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
    else if(smoke > 300 && lock == 1)
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
        notifyMe();
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
//     const firebaseConfig = {
//         apiKey: "AIzaSyD3XxymaoiLEZV1AUG-nH7YC1YzIsKiVt8",
//         authDomain: "esp32-bfa08.firebaseapp.com",
//         databaseURL: "https://esp32-bfa08-default-rtdb.firebaseio.com",
//         projectId: "esp32-bfa08",
//         storageBucket: "esp32-bfa08.appspot.com",
//         messagingSenderId: "165170941296",
//         appId: "1:165170941296:web:50e585eafd5ff0a87253b5",
//       };
    
//       firebase.initializeApp(firebaseConfig);
  
//   firebase.database().ref("/baochaySystem/Khoi").on("value", function(snapshot){
//       x = snapshot.val();
//       smokeRule(x);
//       checkTempurator(x);
//   })
//   var luaStatus = document.querySelector('.status-fire');
//   firebase.database().ref("/baochaySystem/lua").on("value", function(snapshot){
//       lua = snapshot.val();
//         if(lua == true){
//             return luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
//         }
//         else
//             return luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
//   })


////

//Render
function render(){
    const htmls = loadLocales.map((loadLocale)=>{
        return  `
        <button class="create--element">
            <i class="fa-solid fa-location-dot locate--icon "></i>
            <span>${loadLocale.key}: </span
            <span class="locate--home">${loadLocale.locate}</span>
        </button>
        <span class="delete"><i class="fa-solid fa-eraser"></i></span>
        `
    })
    var html = htmls.join('\n')     
    locateCreate.innerHTML = `${html}`
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
    var luaStatus = document.querySelector('.status-fire');
    var x,y;
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    function readData(string1,string2){
        firebase.database().ref("/baochaySystem/" + string1).on("value", function(snapshot){
            x = snapshot.val();
            smokeRule(x);
            checkSmoke(x);
          })
        firebase.database().ref("/baochaySystem/" + string2).on("value", function(snapshot){
            lua = snapshot.val();
            if(lua == true){
                return luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
            }
            else
                return luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
    })
    }
    firebase.database().ref("/baochaySystem/distanceA").on("value", function(snapshot){
            x = snapshot.val();
            console.log(x);
          })
    firebase.database().ref("/baochaySystem/distanceB").on("value", function(snapshot){
            y = snapshot.val();
            console.log(y);
        })
    // firebase.database().ref("/baochaySystem/khoiLocate1").on("value", function(snapshot){
    //             x = snapshot.val();
    //             smokeRule(x);
    //             checkSmoke(x);
    //     })

    // firebase.database().ref("/baochaySystem/luaLocate1").on("value", function(snapshot){
    //     lua = snapshot.val();
    //         if(lua == true){
    //             return luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
    //         }
    //         else
    //             return luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
        
    // }) 


    function writeDatabase(string,saveLocalValue){
        var updates = {};
        updates['/baochaySystem/' + string] = saveLocalValue;
        console.log('write');
        return firebase.database().ref().update(updates);
    }

    
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


// get giá vỹ độ, kinh độ
    getValue.addEventListener('change', (event)=>{
        for(let i = 0; i < event.target.value.length; i++) {
            if(event.target.value[i] == ','){
                var getFirst  = i;
                vido = event.target.value.slice(0 , getFirst);
                kinhdo = event.target.value.slice(getFirst + 1,);
                valueFirst.innerHTML = `${vido}, `
                valueSecond.innerHTML = `${kinhdo}`
                break;
            }
        }
    });
    

    formButton.addEventListener('click',()=>{
    lock = 1;
    if(getValue.value == false){
        var inputError  = document.querySelectorAll('.form__input');
        inputError[0].classList.add("form_input--wrong");
        alert('Chưa nhập thông tin');
    }
    else{
        for(let i = 0; i < getValue.value.length; i++) {
            if(getValue.value[i] == ','){
                var getFirst  = i;
                vido = getValue.value.slice(0 , getFirst);
                kinhdo = getValue.value.slice(getFirst + 1,);
                valueFirst.innerHTML = `${vido}, `
                valueSecond.innerHTML = `${kinhdo}`
                break;
            }
        }
        if(getValue.value   == '10.7879124,106.6049295'){
            openFormdata();
            readData('khoiLocate1','luaLocate1');
        }
        else if(getValue.value   == '10.794871, 106.721872'){
            openFormdata();
            readData('khoiLocate2','luaLocate2');
        }
        else {
            alert('Vị trí này không hỗ trợ!!!');
        }
        
    }
})

    function openFormdata(){
        printLocate.classList.remove("hide");
        formGetdata.classList.remove("hide");
        getLocate.classList.add("hide");
    }
    autoLocal.addEventListener('click', getauto);

    function getauto() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;     
                getValue.value = `${lat},${long}`     
            });
        }
    }

    var i = 0;
    var a = 0;
    var string;
    var setjson;
    var buttonGetkey = document.querySelector('.button-getkey');

    saveLocal.addEventListener('click', ()=>{
        if(getValue.value == false){
            var inputError  = document.querySelectorAll('.form__input');
            inputError[0].classList.add("form_input--wrong");
            alert('Chưa nhập thông tin');
        }
        else{

            if(getKey.classList.contains('hide')){
                i++;
                if(i == 10){
                    i = 0;
                    console.log(i);
                } 
                getKey.classList.remove('hide');
                getLocate.classList.add('lamMo');
            }
        }
    })
    var inputKey = document.querySelector('.form__input--key');
    buttonGetkey.addEventListener('click', ()=>{
        saveLocalValue = getValue.value;
        saveKey = inputKey.value;
        element.locate = saveLocalValue;
        element.key  = saveKey;
        loadLocales = loadLocales || [];
        loadLocales.push(element);
        element= {};    
        string = `locate${i}`
        writeDatabase(string,saveLocalValue);
        setjson = JSON.stringify(loadLocales);
        localStorage.setItem('locals', setjson);
        console.log(loadLocales);
        window.location.reload();
        if(!getKey.classList.contains('hide')){
            getKey.classList.add('hide');
            getLocate.classList.remove('lamMo');
        }
    })
    var buttonUpdate = document.querySelector(".form__button--update");
    buttonUpdate.addEventListener('click', ()=>{  
        window.location.reload();
    })
    var buttonReset = document.querySelector(".form__button--reset");
    buttonReset.addEventListener('click', ()=>{
        if (window.confirm("Do you really want to Reset?")) {
            localStorage.removeItem('locals');
            loadLocales = [];
            render();
          }
        
    })

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
 function waitForElement(querySelector, timeout){
    return new Promise((resolve, reject)=>{
      var timer = false;
      if(document.querySelectorAll(querySelector).length) return resolve();
      const observer = new MutationObserver(()=>{
        if(document.querySelectorAll(querySelector).length){
          observer.disconnect();
          if(timer !== false) clearTimeout(timer);
          return resolve();
        }
      });
      observer.observe(document.body, {
        childList: true, 
        subtree: true
      });
      if(timeout) timer = setTimeout(()=>{
        observer.disconnect();
        reject();
      }, timeout);
    });
  }
  var mapLocate = [`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d727.0074387780571!2d106.60481115199941!3d10.788009564751622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdd104eaf2e5594fe!2zMTDCsDQ3JzE2LjUiTiAxMDbCsDM2JzE3LjgiRQ!5e0!3m2!1svi!2s!4v1670267232628!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,`<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d311.60419878417525!2d106.72190289772506!3d10.794911308588528!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081!5e0!3m2!1svi!2s!4v1670265282948!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`]

  
  waitForElement(".create--element", 100000).then(function(){ 
    var elementCreate = document.querySelectorAll('.create--element')
    for(let i= 0 ; i < elementCreate.length ; i++){
        elementCreate[i].onclick = function() {
            getValue.value = loadLocales[i].locate;
        }
        elementCreate[i].onmouseover = function() {
            getMap.innerHTML = `${mapLocate[i]}`
        }
    }
    var deleteElement = document.querySelectorAll('.delete')
    for(let i= 0 ; i < deleteElement.length ; i++){
        deleteElement[i].onclick = function() {
            if(window.confirm("Bạn có thật sự xóa phần tử này?"))
            {
                elementCreate[i].remove();
                deleteElement[i].remove();
                loadLocales.splice(i, 1);
                localStorage.removeItem('locals');
                setjson = JSON.stringify(loadLocales);
                localStorage.setItem('locals', setjson);
            }
        }
    }
  }).catch(()=>{
    alert('Nhập cái gì đó vào đi bố!!!!')
  });
  window.addEventListener('load',()=>{
    loadLocales = JSON.parse(localStorage.getItem('locals'));
    render();
  })        



