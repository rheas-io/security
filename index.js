var CryptoJS = require("crypto-js");
var Encrypter = require("./build/encrypter").Encrypter;

var key = CryptoJS.lib.WordArray.random(32);
key = key.toString();

//console.log(key);

//key = "cb350ac7716709fc8f1b2ab3711aac3097dcdc6954363d153150775ad76ddff9";
//key = "ab2d9ce7e62d2311608a3e0be406a944";

//console.log(key);

var encrypted = CryptoJS.AES.encrypt("Messages", key);

//console.log(encrypted.toString());

var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), key);

//console.log(decrypted.toString(CryptoJS.enc.Utf8));

var sha256 = CryptoJS.SHA256("string to be hashed", "secret password").toString();
var hmacsha256 = CryptoJS.HmacSHA256("string to be hashed", "secret password").toString();

//console.log(sha256);
//console.log(hmacsha256);

var encrypter = new Encrypter(key, "aes-256-gcm");

console.log(
  encrypter.decrypt(
    "7b226976223a226332636661666134333332613833393130356262343933363439616232636437222c2276616c7565223a223162623731613833373937303065646136396434626630323763626435373762643763613032222c22746167223a223565636236373736303538616463363536663366343630363531666164303235227d"
  )
);
