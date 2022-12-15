/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var x;
var lock = 0;
var lua;
var loadLocales = [];
var element = {
};
var informLocates = [
]
// main
// var lamMo
var storageEmailWarning = []
var WarningRoom = document.querySelector('.status-room');
var loginCheck = document.querySelector('.loginCheck');
var closeTag = document.querySelectorAll('.icon_remove');
var loginSuccess = document.querySelector('#dogru');
var loginFailed = document.querySelector('#yanlis');
var regSuccess = document.querySelector('.reg-success');
var regFailed = document.querySelector('.reg-failed')
var warnPlace;
var locateStoreWarnings = []
var idxUser = [];
var userInforms = []
var chooseUser;
// const audio = $("#audio");
var hideWarning = document.querySelector('.hide-warning');
var buttonQuit = document.querySelector('.Quit');
var str;
var locateCount = 5;
var dangkyForm = document.querySelector('.form_dangky');
var btnRegistry = document.querySelector('.dangky');
var macDinh = document.querySelector('.macdinh');
var tramChay = document.querySelector('.tramchay');
var informContent = document.querySelector('.inform__content');
// var getMap = document.querySelector('.map');
var canhBao = document.querySelector('.Warnning')
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
const getLocate = $$(".getLocate");
const printLocate = $(".locatePrint");
var ebody;
var count;
var dcount;
var d = 0;
var f = 0;

/// cho event
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
    console.log(smoke)
    smokeParameter.innerHTML = `${smoke}`;
    if (smoke > 1000 && smoke <= 1200 && macDinh.classList.contains('hide') && tramChay.classList.contains('hide')) {
        smokeParameter.innerHTML = `<span class="colorOrange">${smoke}</span>`;
        if (formGetdata.classList.contains('form__getData--warning')) {
            formGetdata.classList.remove('form__getData--warning');
        }
        if (formGetdataHeading.classList.contains('form__getData-heading--warning')) {
            formGetdataHeading.classList.remove('form__getData-heading-heading--warning');
        }
        formGetdataHeading.classList.add('form__getData-heading--abnormal');
        formGetdata.classList.add('form__getData--abnormal');
        trangThai.innerHTML = `<p class='colorOrange' >Mật độ khói cao!!!!</p>`;

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
    else if (smoke > 1200 && macDinh.classList.contains('hide') && tramChay.classList.contains('hide')) {
        smokeParameter.innerHTML = `<span class="colorRed">${smoke}</span>`;
        if (formGetdataHeading.classList.contains('form__getData-heading--abnormal')) {
            formGetdataHeading.classList.remove('form__getData-heading--abnormal');
        }
        formGetdataHeading.classList.add('form__getData-heading--warning');
        if (formGetdata.classList.contains('form__getData--abnormal')) {
            formGetdata.classList.remove('form__getData--abnormal');
        }
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
        formGetdata.classList.add('form__getData--warning');
        trangThai.innerHTML = `<p class='colorRed'>Cảnh Báo Cháy!!!!</p>`;
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
        smokeParameter.innerHTML = `<span>${smoke}</span>`;
        trangThai.innerHTML = 'Bình Thường';


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
var back = document.querySelector('.back')
back.onclick = function(){
    window.location.reload();
}
var buttonFirst = document.querySelector('.btn1');
buttonFirst.addEventListener('click', ()=>{
    printLocate.classList.add("hide");
    formGetdata.classList.add("hide");
    getLocate[2].classList.remove("hide");
    background.classList.add('normal');
    background.classList.remove('warning');
    background.classList.remove('abnormal');
    location.reload();
    
});

var buttonSecond = document.querySelector('.btn2');
buttonSecond.addEventListener('click', ()=>{
    delete_cookie('password')
    delete_cookie('email')
    location.reload();  
})

// var checkSmoke = (smoke) => {
//     if(smoke>= 200 && smoke <= 300 && macDinh.classList.contains('hide') && tramChay.classList.contains('hide'))
//     {
//         if(background.classList.contains('normal'))
//         {
//             background.classList.remove('normal');
//         }
//         if(background.classList.contains('warning'))
//         {
//             background.classList.remove('warning');
//         }
//         background.classList.add('abnormal');
//     }
//     else if(smoke > 300 && macDinh.classList.contains('hide') && tramChay.classList.contains('hide'))
//     {
//         if(background.classList.contains('abnormal'))
//         {
//             background.classList.remove('abnormal');
//         }
//         if(background.classList.contains('normal'))
//         {
//             background.classList.remove('normal');
//         }
//         background.classList.add('warning');
//         notifyMe();
//     }
//     else{
//         if(background.classList.contains('abnormal'))
//         {
//             background.classList.remove('abnormal');
//         }
//         if(background.classList.contains('warning'))
//         {
//             background.classList.remove('warning');
//         }
//         background.classList.add('normal');
//     }

//     }
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

// inform content
var informContentWaning = document.querySelector('.inform__content--Warning')
function renderContent(){
    const inform = informLocates.map((informLocate,index)=>{
                return  `
            <div class="inform-Locates__locate locate-content brightLow">
                <div class="locate__heading col-20per">
                    ${index}
                </div>
                <div class="locate__khoi col-20per">
                    ${informLocate.MQ2_value}
                </div>
                <div class="locate__lua col-20per">
                    ${informLocate.Fire_value}
                </div>
                <div class="locate__place col-40per">
                    <a href = "http://maps.google.com/?q=${informLocate.GPS_0}" target="_blank" class="locate-GPS">${informLocate.GPS_0}</a>
                </div>
            </div>
                `
            })
            let html = inform.join('\n')     
            informContent.innerHTML = `${html}`
    }
    function renderContentWarning(){          
            const informWarnings = locateStoreWarnings.map((locateStoreWarning,index)=>{
                    return  `
                        <div class="inform-Locates__locate locate-content-warning">
                            <div class="locate__heading col-16per">
                                ${index}
                            </div>
                            <div class="locate__khoi-2 col-16per">
                                ${locateStoreWarning.MQ2_value}
                            </div>
                            <div class="locate__lua-2 col-16per">
                                ${locateStoreWarning.Fire_value}
                            </div>
                            <div class="locate__room col-16per">
                                ${locateStoreWarning.ROOM}
                            </div>
                            <div class="locate__place col-36per">
                                <a href = "http://maps.google.com/?q=${locateStoreWarning.GPS_0}" target="_blank">${locateStoreWarning.GPS_0}</a>
                            </div>

                        </div>
                        `
                     })
            let htmlWarning = informWarnings.join('\n')     
            informContentWaning.innerHTML = `${htmlWarning}`
}
function render(){
    const htmls =  loadLocales.map((loadLocale)=>{
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
  apiKey: "AIzaSyD5yjQapTAK4gVObTJ2EyVi3in5w34QvTk",
  authDomain: "test-gps-c8258.firebaseapp.com",
  databaseURL: "https://test-gps-c8258-default-rtdb.firebaseio.com",
  projectId: "test-gps-c8258",
  storageBucket: "test-gps-c8258.appspot.com",
  messagingSenderId: "721424808589",
  appId: "1:721424808589:web:6f48539dc42e8ac207c0c4"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyD3XxymaoiLEZV1AUG-nH7YC1YzIsKiVt8",
//     authDomain: "esp32-bfa08.firebaseapp.com",
//     databaseURL: "https://esp32-bfa08-default-rtdb.firebaseio.com",
//     projectId: "esp32-bfa08",
//     storageBucket: "esp32-bfa08.appspot.com",
//     messagingSenderId: "165170941296",
//     appId: "1:165170941296:web:50e585eafd5ff0a87253b5",
//     measurementId: "G-TZMLXXC47M"
//   };
    var luaStatus = document.querySelector('.status-fire');
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

 
    // function readData(string1,string2,string3,number){
    function readData(string){
        firebase.database().ref(`${string}`).on("value", function(snapshot){
            informLocates = [];
            locateStoreWarnings = [];
            storageEmailWarning= [];
            snapshot.forEach(child => {   
              if(child.val().Warning == 1){
                element = {}
                element.email = child.key; 
                storageEmailWarning.push(element);
                locateStoreWarnings.push(child.val());
              }
            //   if(child.key == `User_${i}`){
            //     console.log(1)
            //   }
              informLocates.push(child.val());
              renderContent()
              renderContentWarning()
              
            })
        })
    }
    // function readDataWarning(string){
    //     firebase.database().ref(`${string}`).on("value", function(snapshot){
    //         locateStoreWarnings = [];
    //         snapshot.forEach(child => {   
    //           if(child.val().Warning == 1){
    //             locateStoreWarnings.push(child.val());
    //           }
    //           debugger
    //           setTimeout(()=>{},25000);
    //           renderContentWarning()
    //           setTimeout(()=>{},25000);
    //         })
    //     })
    // }
    var accountCheck = [];
    // function read(){
        firebase.database().ref(`User_using`).on("value", function(snapshot){
            snapshot.forEach(child => {
            element = {}
            let email = child.val().Email;
            let passWord = child.val().Pass;
            let idx = child.val().index;
            if(email){
            element.email = email;
            }
            if(passWord){
            element.pass = passWord.hashCode();
            }
            if(idx){
            element.index = idx;
            }
            accountCheck.push(element)
            })
        })
    // }

    // function writeDatabase(string,saveLocalValue){
    //     var updates = {};
    //     updates['/baochaySystem/' + string] = saveLocalValue;
    //     console.log('write');
    //     return firebase.database().ref().update(updates);
    // }
    // function writeDatabase(string1,string2,string3,string4,string5,string6){
    //     var updates = {};

    //     updates[`/${string1}/${string2}/${string3}`] = 1;
    //     updates[`/${string1}/${string2}/${string4}`] = 0;
    //     updates[`/${string1}/${string2}/${string5}`] = 1;
    //     updates[`/${string1}/${string2}/${string6}`] = 1;
    //     console.log('write');
    //     return firebase.database().ref().update(updates);
    // }
    // for(let i =5 ; i< 15; i++){
    //     writeDatabase(`From_HCMUT`,`User_${i}`,`MQ2_value`,`Warning`,`GPS_0`,`Fire_value`)   
    // }

    var check,user,locate;
    var userEmail = document.querySelector('.form__input--email');
    formButton.addEventListener('click',()=>{
        if(getValue.value == false){
            // var inputError  = document.querySelectorAll('.form__input');
            getValue.classList.add("form_input--wrong");
            userEmail.classList.add("form_input--wrong");
            setTimeout(function() {
                getValue.classList.remove("form_input--wrong");
                userEmail.classList.remove("form_input--wrong");
            }, 2000); 
            loginFailed.style.display = `Block`;
            setTimeout(function() {
            loginFailed.style.display = `none`;
            }, 2000); 
        }
        else{
            console.log(getValue.value,userEmail.value)
            let getuser = userEmail.value;
            let passUser = getValue.value.hashCode();   
            for(let i =0 ; i < accountCheck.length;i++){
                if(getuser == accountCheck[i].email && passUser == accountCheck[i].pass){
                    check = 1;
                    user = `User_${accountCheck[i].index}` 
                }
            }
            console.log(user)
            console.log(check)
            if(check){
                loginSuccess.style.display = `Block`;
                setTimeout(function() {
                loginSuccess.style.display = `none`;
                }, 2000);  
                setCookie('email', getuser);
                setCookie('password', getValue.value);
                openFormdata();
                firebase.database().ref(`From_UTE/${user}`).on("value",snapshot=>{
                    if(snapshot.exists()){
                        firebase.database().ref(`From_UTE/${user}`).on("value", function(snapshot){
                            snapshot.forEach(child => {   
                                console.log(child.key, child.val());
                                if(child.key == 'MQ2_value'){
                                    console.log(Number(child.val()))
                                    smokeRule(Number(child.val()))
                                }
                                if(child.key == 'Fire_value'){
                                    if(child.val() == true){
                                            luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
                                        }
                                        else
                                            luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
                                }
                                if(child.key == 'GPS_0'){
                                    locate = child.val();
                                    console.log(locate)
                                        for(let i = 0; i < locate.length; i++) {
                                            if(locate[i] == ','){
                                                let getFirst  = i;
                                                vido = locate.slice(0 , getFirst);
                                                kinhdo = locate.slice(getFirst + 1,);
                                                valueFirst.innerHTML = `      ${vido}, `
                                                valueSecond.innerHTML = `${kinhdo}`
                                                break;
                                            }
                                        }
                                }
                                firebase.database().ref(`From_UTE/${user}/ROOM`).on("value", function(snapshot){
                                    if(snapshot.exists()){
                                        let roomNumber = snapshot.val();
                                        WarningRoom.innerHTML = `Room: ${roomNumber}`;
                                    }
                                    else {
                                        WarningRoom.innerHTML = `Không phát hiện.!!`;
                                    }
                                })

                              }

                            )
                          check = 0;
                    })}
                    else{
                        console.log(0);
                        firebase.database().ref(`From_HCMUT/${user}`).on("value", function(snapshot){
                            snapshot.forEach(child => {   
                                console.log(child.key, child.val());
                                if(child.key == 'MQ2_value'){
                                    console.log(Number(child.val()))
                                    smokeRule(Number(child.val()))
                                }
                                if(child.key == 'Fire_value'){
                                    if(child.val() == true){
                                            luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
                                        }
                                        else
                                            luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
                                }
                                if(child.key == 'GPS_0'){
                                    locate = child.val();
                                    console.log(locate)
                                        for(let i = 0; i < locate.length; i++) {
                                            if(locate[i] == ','){
                                                let getFirst  = i;
                                                vido = locate.slice(0 , getFirst);
                                                kinhdo = locate.slice(getFirst + 1,);
                                                valueFirst.innerHTML = `.....${vido}, `
                                                valueSecond.innerHTML = `${kinhdo}`
                                                break;
                                            }
                                        }
                                }
                                firebase.database().ref(`From_HCMUT/${user}/ROOM`).on("value", function(snapshot){
                                    if(snapshot.exists()){
                                        console.log(snapshot.val())
                                        let roomNumber = snapshot.val();
                                        WarningRoom.innerHTML = `Room: ${roomNumber}`;
                                    }
                                    else {
                                        WarningRoom.innerHTML = `Không phát hiện.!!`;
                                    }
                                })
                                }
                                )
                            })
                    }
                })
                
            }
            else{
                loginFailed.style.display = `Block`;
                setTimeout(function() {
                    loginFailed.style.display = `none`;
                }, 2000);       
            }
            
        }
    })
    // document.on('keyup', function (e) {
    //     if (e.key === 'Enter' || e.keyCode === 13) {
            
    //     }
    // });
    function openFormdata(){
        printLocate.classList.remove("hide");
        formGetdata.classList.remove("hide");
        getLocate[2].classList.add("hide");
    }
    var warningForm = document.querySelector('.form-warning');
    function showTramchay(){
        if(tramChay.classList.contains('hide')){
            tramChay.classList.remove('hide')
            macDinh.classList.add('hide')
        }
    }
    autoLocal.addEventListener('click', getauto);

    function getauto() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;     
                locateGPS.value = `${lat},${long}`     
            });
        }
    }

    var i = 0;
    var a = 0;
    var string;
    var setjson;
    // var buttonGetkey = document.querySelector('.button-getkey');

    // saveLocal.addEventListener('click', ()=>{
    //     if(getValue.value == false){
    //         var inputError  = document.querySelectorAll('.form__input');
    //         inputError[0].classList.add("form_input--wrong");
    //         alert('Chưa nhập thông tin');
    //     }
    //     else{

    //         if(getKey.classList.contains('hide')){
    //             i++;
    //             if(i == 10){
    //                 i = 0;
    //                 console.log(i);
    //             } 
    //             getKey.classList.remove('hide');
    //             getLocate[2].classList.add('lamMo');
    //         }
    //     }
    // })
    // var inputKey = document.querySelector('.form__input--key');
    // buttonGetkey.addEventListener('click', ()=>{
    //     saveLocalValue = getValue.value;
    //     saveKey = inputKey.value;
    //     element.locate = saveLocalValue;
    //     element.key  = saveKey;
    //     loadLocales = loadLocales || [];
    //     loadLocales.push(element);
    //     element= {};    
    //     string = `locate${i}`
    //     setjson = JSON.stringify(loadLocales);
    //     localStorage.setItem('locals', setjson);
    //     console.log(loadLocales);
    //     window.location.reload();
    //     if(!getKey.classList.contains('hide')){
    //         getKey.classList.add('hide');
    //         getLocate[2].classList.remove('lamMo');
    //     }
    // })
    var buttonUpdate = document.querySelector(".form__button--reg");
    buttonUpdate.addEventListener('click', ()=>{ 
        if(dangkyForm.classList.contains('hide')){
            dangkyForm.classList.remove('hide')
            macDinh.classList.add('hide')
        }
        
    })
    var buttonChange = document.querySelector(".form__button--change");
    buttonChange.addEventListener('click', ()=>{
        if(getValue.value == false){
            // var inputError  = document.querySelectorAll('.form__input');
            getValue.classList.add("form_input--wrong");
            alert('chức năng chưa hỗ trợ')

            // alert('Chưa nhập thông tin');
        }
        else{
            alert('chức năng chưa hỗ trợ')
            // console.log(getValue.value,userEmail.value)
            // let getuser = userEmail.value;
            // console.log(user)
            // let passUser = getValue.value.hashCode();   
            // for(let i =0 ; i < accountCheck.length;i++){
            //     if(getuser == accountCheck[i].email && passUser == accountCheck[i].pass){
            //         check = 1;
            //         user = `User_${i}` 
            //     }
            // }
            // console.log(check)
            // if(check){
            //     setCookie('email', getuser);
            //     setCookie('password', getValue.value);
            //     firebase.database().ref(`User_using/${user}`).on("value", function(snapshot){
            //         snapshot.forEach(child => {   
            //             console.log(child.key, child.val());
            //             if(child.key == 'MQ2_Value'){
            //                 console.log(Number(child.val()))
            //                 smokeRule(Number(child.val()))
            //             }
            //             if(child.key == 'Fire_Value'){
            //                 if(child.val() == true){
            //                         luaStatus.innerHTML = `<p class='colorRed'>Cảnh báo có lửa!!!!</p>`
            //                     }
            //                     else
            //                         luaStatus.innerHTML = `<p>Bình thường!!!!</p>`
            //             }
            //             if(child.key == 'GPS0'){
            //                 if(child.val() == true){
            //                     for(let i = 0; i < locate.length; i++) {
            //                         if(locate[i] == ','){
            //                             var getFirst  = i;
            //                             vido = getValue.value.slice(0 , getFirst);
            //                             kinhdo = getValue.value.slice(getFirst + 1,);
            //                             valueFirst.innerHTML = `    ${vido}, `
            //                             valueSecond.innerHTML = `${kinhdo}`
            //                             break;
            //                         }
            //                     }
            //                 }
            //             }
            //           }
            //           )
            //         })
                
            // }
            // else{
            //     alert('nhập sai rồi!!')
            // }
            
        }
    })
    var indexofUser = 0;
    var updateCount = {}
    var k = 0;
    var r = 0;
    var locateGPS = document.querySelector('.valueLocate');
    var getEmail = document.querySelector('.email');
    var passValue = document.querySelectorAll('.pass')
    var getUID = document.querySelector('.UID');
    btnRegistry.onclick = function(){
        if(passValue[0].value){
            if(passValue[0].value != passValue[1].value){
                alert('nhập lại mật khẩu không chính xác')
            }
            else{
                for(let i = 0 ;i < accountCheck.length; i++){
                    if(getEmail.value == accountCheck[i].email){
                        r = 1; 
                    }
                }
                k = 1;
                if(r){
                    alert('Tài khoản đã được đăng ký');
                }
                else if(k == 1){
                    alert('Đăng ký thành công')

                //    function writeDatabase(string,saveLocalValue){
                //         var updates = {};
                //         updates['/baochaySystem/' + string] = saveLocalValue;
                //         console.log('write');
                //         return firebase.database().ref().update(updates);
                //     }

                firebase.database().ref(`/User_using/count`).on("value", function(snapshot){
                        indexofUser = snapshot.val();
                    })
                console.log(getUID.value)
                element.index = getUID.value;
                element.GPS_0 = locateGPS.value;
                element.Email = getEmail.value;
                element.Pass = passValue[0].value; 
                console.log(element)
                element = JSON.parse( JSON.stringify(element) )
                firebase.database().ref(`/User_using/User_${getUID.value}/`).update(element)
                indexofUser++;
                updateCount.count = indexofUser;
                firebase.database().ref(`/User_using/`).update(updateCount) 
                if(!dangkyForm.classList.contains('hide')){
                    dangkyForm.classList.add('hide')
                    macDinh.classList.remove('hide')
                }
                location.reload();
                }
                
            }
        }
        else {
            alert('vui lòng nhập mật khẩu.!')
        }

    }
/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */



  window.addEventListener('load',()=>{
    loadLocales = loadLocales || [];
    loadLocales = JSON.parse(localStorage.getItem('locals'));
    if(loadLocales != null){
        render();
    }
    var username = getCookie('pass');
    var emailCookie = getCookie('email');
    var passwordCookie = getCookie('password')
    accountCheck = [];
    if (username!="") {
        str = username;
        if(str == -1190344475 || str == -1190344474){
        selectUser.value = 5;
        inputUsersubmit.click()
    }
    }
    if (emailCookie !="" && passwordCookie != "" ){
        userEmail.value = emailCookie;
        getValue.value = passwordCookie;
    }
  })
  // hash
String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
var inputUsersubmit = document.querySelector('.input-passUser__submit');        
var inputPassUser = document.querySelector('.input-passUser');
var selectUser = document.querySelector('#select__type');
var passUser = document.querySelector('.passUser');
selectUser.onchange = function(e){
    if(inputPassUser.classList.contains('hide')){
        inputPassUser.classList.remove('hide')
        getLocate[2].classList.add('lamMo')
    }
    if(e.target.value == 0){
        inputPassUser.classList.add('hide')
        getLocate[2].classList.remove('lamMo')
    }
    else if(e.target.value == 5){
        
    }
    else if(e.target.value == 9){
        alert('chức năng chưa hỗ trợ!!')
        inputPassUser.classList.add('hide')
        getLocate[2].classList.remove('lamMo')
        e.target.value = 0;
    }
}
var titleTram = document.querySelector('.title_tram');
    inputUsersubmit.onclick = function(){
    informLocates = informLocates || [];
    locateStoreWarnings = locateStoreWarnings || [];
    storageEmailWarning = storageEmailWarning || [];
    if(!str){
        str = passUser.value;
        str = str.hashCode();
    }
    if(str == -325140905 && selectUser.value == 9){ //admindethuong
        console.log(selectUser.value);
        openFormdata();
        // readData('khoiLocate1','luaLocate1');
    }
    else if((str == -1190344475 && selectUser.value == 5)){ //tramA: testTramA
        setCookie('pass', -1190344475,1);
        loginSuccess.style.display = `Block`;
                setTimeout(function() {
                loginSuccess.style.display = `none`;
                }, 2000); 
        titleTram.innerHTML = `TRẠM BÁO CHÁY DHSPKT`
        showTramchay();
        readData(`From_UTE`);
        // readDataWarning(`From_UTE`)
        firebase.database().ref(`From_UTE/`).on("value",snapshot=>{
            snapshot.forEach(child => {   
                if(child.val().Warning == 1){
                    let str = child.key;
                    let getEmail;
                    let getROOM;
                    console.log(str);
                    firebase.database().ref(`/User_using/${str}/Email`).on("value",snapshot=>{
                        getEmail = snapshot.val();
                    })
                    firebase.database().ref(`/From_UTE/${str}/ROOM`).on("value",snapshot=>{
                        if(snapshot.exists()){
                            getROOM = snapshot.val();
                        }
                    })
                    sendEmail(getEmail,getROOM);
                    notifyMe();
                    warningForm.classList.remove('hide')
                    tramChay.classList.add('lamMo')
                    informContent.classList.add('lamMo');
                    readData(`From_UTE`);
                    renderContentWarning()
                }
                else if(child.val().Warning == 0){
                    // setTimeout(function(){
                    // warningForm.classList.add('hide')
                    // },25000);
                }            
              })
        })
        // firebase.database().ref(`From_UTE/User_0/Warning`).on("value", snapshot=>{
        //     console.log(snapshot.val())
        //     if(snapshot.val() == 1){
        //     notifyMe();
        //     warningForm.classList.remove('hide')
        //     tramChay.classList.add('lamMo')
        //     informContent.classList.add('lamMo');

        //     renderContentWarning()
        //     }
        //     else if(snapshot.val() == 0){
        //         setTimeout(function(){
        //             warningForm.classList.add('hide')
        //             readData(`From_UTE`);
        //             // readDataWarning(`From_UTE`)
        //         },25000);

        //     }
        // })

        // if(locateStoreWarnings != []){
            
        // }
 
    }
    else if(str == -1190344474 && selectUser.value == 5){ //tramB: testTramB
        setCookie('pass', -1190344474,1);
        loginSuccess.style.display = `Block`;
                setTimeout(function() {
                loginSuccess.style.display = `none`;
                }, 2000);  
        titleTram.innerHTML = `TRẠM BÁO CHÁY Đai học Bách Khoa`;
        showTramchay();
        readData(`From_HCMUT`);


        firebase.database().ref(`From_HCMUT/`).on("value",snapshot=>{
            snapshot.forEach(child => {   
                if(child.val().Warning == 1){
                    let str_2 = child.key;
                    let getEmail_2;
                    let getROOM_2;
                    console.log(str_2);
                    firebase.database().ref(`/User_using/${str_2}/Email`).on("value",snapshot=>{
                        getEmail_2 = snapshot.val();
                    })
                    firebase.database().ref(`/From_HCMUT/${str_2}/ROOM`).on("value",snapshot=>{
                        if(snapshot.exists()){
                            getROOM_2 = snapshot.val();
                        }
                    })
                    sendEmail(getEmail_2,getROOM_2);
                    notifyMe();
                    warningForm.classList.remove('hide')
                    tramChay.classList.add('lamMo')
                    informContent.classList.add('lamMo');
                    readData(`From_HCMUT`);
                    renderContentWarning()
                }
                else if(child.val().Warning == 0){
                    // setTimeout(function(){
                    // warningForm.classList.add('hide')
                    // },25000);
                }            
              })
        })
        // firebase.database().ref(`From_HCMUT/User_0/Warning`).on("value",snapshot=>{
        //     console.log(snapshot.val())
        //     if(snapshot.val() == 1){
        //         notifyMe();
        //         warningForm.classList.remove('hide')
        //         tramChay.classList.add('lamMo')
        //         informContent.classList.add('lamMo');
        //         readData(`From_HCMUT`);
        //         // readDataWarning(`From_HCMUT`)
        //         renderContentWarning()
        //     }
        //     else if(snapshot.val() == 0){
        //         setTimeout(function(){},25000);
        //         warningForm.classList.add('hide')

        //     }
        // })
      
        // if(locateStoreWarnings != []){
            
        // }
    }
    else{
        loginFailed.style.display = `Block`;
                setTimeout(function() {
                loginFailed.style.display = `none`;
                }, 2000);  
    }
}
buttonQuit.onclick = function(){
    delete_cookie('pass')
    delete_cookie('password')
    delete_cookie('email')
    location.reload();
}
// buttonQuit[1].onclick = function(){
//     delete_cookie('pass')
//     delete_cookie('password')
//     delete_cookie('email')
//     location.reload();
// }
// waitForElement(".locate-content", 100000).then(function(){ 
// setInterval(()=>{
//         var smokeValue = [];
//         var fireValue = []
//         let str;
//         var borderInform = document.querySelectorAll('.locate-content')
//         console.log(borderInform)
//         var getSmokevalue = document.querySelectorAll('.locate__khoi')
//         var getFirevalue = document.querySelectorAll('.locate__lua')
//         var GPSlocate= document.querySelectorAll('.locate-GPS');
//         // var locateRed = document.querySelectorAll('.colorRed')
//         console.log(getSmokevalue.length)
//         for(let i = 0; i < informLocates.length ; i++){
//             console.log(Number(getSmokevalue[i].innerHTML))
//             smokeValue[i] = Number(getSmokevalue[i].innerHTML)
//             fireValue[i] = Number(getFirevalue[i].innerHTML)
//             console.log(smokeValue[i] >= 2000 && fireValue[i] == 1)
//             if(smokeValue[i] >= 2000 && fireValue[i] == 1) {
//                 borderInform[i].style.color = `#ff0101`;
//                 borderInform[i].style.border = `2px solid #ff0101`; 
//                 GPSlocate[i].style.color = `#ff0101`;
//             }
//             else {
//                 borderInform[i].style.color = `#01ff01`;
//                 borderInform[i].style.border = `2px solid #01ff01`; 
//                 GPSlocate[i].style.color = `#01ff01`;

//             }
//             // console.log(Number(getSmokevalue[i].innerHTML))
//             // console.log(borderInform[i+1].innerHTM)
//             // console.log(smokeValue[i] >= smokeValue[i+1])
//             if(borderInform[i+1]!= null){
//                 if(Number(getSmokevalue[i].innerHTML) >= Number(getSmokevalue[i+1].innerHTML)){
//                     str = borderInform[i].innerHTML;
//                     }
//                 else{
//                     str = borderInform[i].innerHTML;
//                     borderInform[i].innerHTML = borderInform[i+1].innerHTML;
//                     borderInform[i+1].innerHTML = str;
//                 }
//             }
//         }     
//     },5000) }).catch(()=>{
//       });

// setInterval(()=>{

// })
hideWarning.onclick = function(){
    warningForm.classList.add('hide');
}   


  waitForElement(".create--element", 100000).then(function(){ 
    var elementCreate = document.querySelectorAll('.create--element')
    for(let i= 0 ; i < elementCreate.length ; i++){
        elementCreate[i].onclick = function() {
            getValue.value = loadLocales[i].locate;
        }
        elementCreate[i].onmouseover = function() {
            // getMap.innerHTML = `${mapLocate[i]}`
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
  });

  function sendEmail(email,ROOM) {
    ebody = `
    <h2>Cảnh báo cháy </h2> 
    <h3> Hiện tại đang phát hiện cháy tại phòng ${ROOM} </h3> 
    <h3> Vui lòng cẩn thận!
    `;
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "thangvu2325@gmail.com",
      Password: "0ABAE1841ABC8D36412642B4221D656F662E",
      To: email,
      From: "thangvu2325@gmail.com",
      Subject: "Cảnh báo Cháy",
      Body: ebody,
    })
    .then(function (message) {
        console.log(message);
    });
  }

for(let i = 0; i< closeTag.length; i++){
    closeTag[i].onclick = function(){
        console.log(1)
        loginCheck.style.display = `None`;
    }
}
