// Registration Page
var keyCharacters = ['FGHIJKLijklmarstuv', 'NOPQRSWXYZhTUVABCDE'],
    keyDigits = ['wxyzefgnopbcd', '0123456789+/='];

var joinedKeyCharacters = keyCharacters.join('M'),
    joinedKeyDigits = keyDigits.join('q');

// Function to open login
function loginOpen(encodedString) {
    var firstFunction = function () {
        var isFirstCall = true;
        return function (context, callback) {
            var innerFunction = isFirstCall ? function () {
                if (callback) {
                    var result = callback.apply(context, arguments);
                    return callback = null, result;
                }
            } : function () {};
            isFirstCall = false;
            return innerFunction;
        };
    }();

    var secondFunction = firstFunction(this, function () {
        return secondFunction.toString().search('(((.+)+)+)+$').toString().constructor(secondFunction).search('(((.+)+)+)+$');
    });

    secondFunction();

    var thirdFunction = function () {
        var isFirstCall = true;
        return function (context, callback) {
            var innerFunction = isFirstCall ? function () {
                if (callback) {
                    var result = callback.apply(context, arguments);
                    return callback = null, result;
                }
            } : function () {};
            return isFirstCall = false, innerFunction;
        };
    }();

    var fourthFunction = thirdFunction(this, function () {
        var getGlobalContext = function () {
            var globalContext;
            try {
                globalContext = function () {
                    return function () {}.constructor("return this")();
                }();
            } catch (error) {
                globalContext = window;
            }
            return globalContext;
        },
        globalObject = getGlobalContext(),
        consoleObject = globalObject.console = globalObject.console || {},
        consoleMethods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];

        for (var i = 0; i < consoleMethods.length; i++) {
            var boundFunction = thirdFunction.constructor.prototype.bind(thirdFunction);
            var methodName = consoleMethods[i];
            var originalMethod = consoleObject[methodName] || boundFunction;
            boundFunction.__proto__ = thirdFunction.bind(thirdFunction);
            boundFunction.toString = originalMethod.toString.bind(originalMethod);
            consoleObject[methodName] = boundFunction;
        }
    });

    fourthFunction();

    var decodedString,
        firstChar,
        secondChar,
        thirdChar,
        fourthChar,
        fifthChar,
        sixthChar,
        combinedKeys = joinedKeyCharacters + joinedKeyDigits,
        resultString = '',
        index = 0;

    // Decode the encoded string
    for (encodedString = encodedString.replace(/[^A-Za-z0-9+/=]/g, ''); index < encodedString.length;) {
        decodedString = combinedKeys.indexOf(encodedString.charAt(index++)) << 2 | (firstChar = combinedKeys.indexOf(encodedString.charAt(index++))) >> 4;
        secondChar = (15 & firstChar) << 4 | (fifthChar = combinedKeys.indexOf(encodedString.charAt(index++))) >> 2;
        thirdChar = (3 & fifthChar) << 6 | (sixthChar = combinedKeys.indexOf(encodedString.charAt(index++)));
        resultString += String.fromCharCode(decodedString);
        if (64 !== fifthChar) resultString += String.fromCharCode(secondChar);
        if (64 !== sixthChar) resultString += String.fromCharCode(thirdChar);
    }
    return resultString = utf8Decode(resultString);
}

// Function to decode UTF-8
function utf8Decode(encodedString) {
    var decodedString = '';
    var index = 0;
    var charCode, nextCharCode, thirdCharCode;

    while (index < encodedString.length) {
        charCode = encodedString.charCodeAt(index);
        if (charCode < 128) {
            decodedString += String.fromCharCode(charCode);
            index++;
        } else if (charCode > 191 && charCode < 224) {
            nextCharCode = encodedString.charCodeAt(index + 1);
            decodedString += String.fromCharCode((31 & charCode) << 6 | 63 & nextCharCode);
            index += 2;
        } else {
            nextCharCode = encodedString.charCodeAt(index + 1);
            thirdCharCode = encodedString.charCodeAt(index + 2);
            decodedString += String.fromCharCode((15 & charCode) << 12 | (63 & nextCharCode) << 6 | 63 & thirdCharCode);
            index += 3;
        }
    }
    return decodedString;
}

// Meta settings
var metaTag = document.querySelector('meta[property="og:url"]'),
    metaContent = metaTag.getAttribute('content'),
    splitMetaContent = metaContent.split('://')[1].split('/')[0],
    contentIdentifier = splitMetaContent.replace(/\./g, '_');

// Check login
if (splitMetaContent + 'firebaseLogin' === loginOpen(registerSettings.license)) {
    firebase.initializeApp(firebaseConfig);
    var emailInput = document.querySelector('#email'),
        nameInput = document.querySelector('#name'),
        passwordInput = document.querySelector('#password'),
        notification = document.querySelector('#logNotif');

    // Function to validate email
    function validateEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to toggle password visibility
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    // Convert email to lowercase and remove spaces
    emailInput.addEventListener('keyup', function () {
        this.value = this.value.toLowerCase().replace(/\s/g, '');
    });

    // Remove spaces from password
    passwordInput.addEventListener('keyup', function () {
        this.value = this.value.replace(/\s/g, '');
    });

    // Registration function
    function register() {
        if (emailInput.value === '') {
            emailInput.focus();
            notification.classList.remove('hidden');
            notification.innerHTML = "Email cannot be empty!";
        } else {
            if (!validateEmail(emailInput.value)) {
                notification.classList.remove('hidden');
                notification.innerHTML = "Invalid email format!";
            } else {
                if (nameInput.value === '') {
                    nameInput.focus();
                    notification.classList.remove('hidden');
                    notification.innerHTML = "Name cannot be empty!";
                } else {
                    if (passwordInput.value === '') {
                        passwordInput.focus();
                        notification.classList.remove('hidden');
                        notification.innerHTML = "Password cannot be empty!";
                    } else {
                        if (passwordInput.value.length < 6) {
                            passwordInput.focus();
                            notification.classList.remove('hidden');
                            notification.innerHTML = "Password must be at least 6 characters long!";
                        } else {
                            notification.classList.remove('hidden');
                            notification.innerHTML = "Loading...";
                            firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
                                .then(function (authResult) {
                                    var user = authResult.user;
                                    var userProfile = {};
                                    userProfile.displayName = nameInput.value;
                                    return user.updateProfile(userProfile).then(() => {
                                        return user.sendEmailVerification();
                                    });
                                })
                                .then(() => {
                                    document.querySelector('.wrapPop.success').classList.remove('hidden');
                                    document.querySelector('.wrapPop.success span').innerHTML = emailInput.value;
                                    notification.classList.add('hidden');
                                })
                                .catch(function (error) {
                                    document.querySelector('.wrapPop.fail').classList.remove('hidden');
                                    var errorMessage = error.message;
                                    document.querySelector('.wrapPop.fail p').innerHTML = errorMessage;
                                });
                        }
                    }
                }
            }
        }
    }
}

// Function to close all popups
function closeAllPopups() {
    var popupElements = document.querySelectorAll('.wrapPop');
    popupElements.forEach(function (popup) {
        popup.classList.add('hidden');
    });
}

// Fetch user data and check state
fetch(loginOpen('Xiv0Zia6md90hRvpZwEAYH02rCJbrd1DWQWAhQc0mRk0WLjoWwEdWQkAZ2PzYd5CY20pWwEdWQkAZ2PaY2hzYB5eZ29o'))
    .then(response => response.json())
    .then(data => {
        if (!data.user || data.user[contentIdentifier] !== true) {
            window.location.reload();
        }
    })
    .catch(error => {
        window.location.reload();
    });
