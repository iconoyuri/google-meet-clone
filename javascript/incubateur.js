
// navigator.mediaDevices
//     .enumerateDevices()
//     .then(function (devices) {
//         console.log(devices);
//     })
//     .catch(function (err) {
//         console.log(err.name + ": " + err.message);
//     });


// // navigator.mediaDevices
// //     .getUserMedia({ audio: true, video: true })
// //     .then((stream) => {
// //         console.log(stream.getTracks());
// //     });


// class superClass{
//     constructor() {
//         this.var1 = "test"
//     }
//     method1() {
//         console.log(this.var1)
//         this.method2()
//     }
//     method2() {
//         // console.log("te")
//     }
// }

// class underClass extends superClass{
//     constructor() {
//         super()
//         this.var2 = "tak"
//     }
//     method1() {
//         super.method1()
//         console.log(this.var2 , this.var1)
//     }
//     method2() {
//         console.log("owari")
//     }
// }
// (new underClass( )).method1()