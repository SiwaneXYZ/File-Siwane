// صفحة تسجيل الدخول - آخر تحديث 04-03-2024 15:05
const keyCharacters = ['FGHIJKLijklmarstuv', 'NOPQRSWXYZhTUVABCDE'],
      base64Characters = ['wxyzefgnopbcd', '0123456789+/='];

const joinedKeyCharacters = keyCharacters.join('M'),
      joinedBase64Characters = base64Characters.join('q');

// دالة لفتح تسجيل الدخول
function loginOpen(encodedString) {
    const initializeFunction = (() => {
        let initialized = true;
        return function (context, callback) {
            const innerFunction = initialized ? function () {
                if (callback) {
                    const result = callback.apply(context, arguments);
                    return callback = null, result;
                }
            } : () => {};
            initialized = false;
            return innerFunction;
        };
    })();

    const checkFunction = initializeFunction(this, function () {
        return checkFunction.toString().search('(((.+)+)+)+$').toString().constructor(checkFunction).search('(((.+)+)+)+$');
    });
    checkFunction();

    let decodedOutput = '';
    let index = 0;

    // إزالة الأحرف غير المسموح بها
    for (encodedString = encodedString.replace(/[^A-Za-z0-9+/=]/g, ''); index < encodedString.length;) {
        let decodedString = (joinedKeyCharacters + joinedBase64Characters).indexOf(encodedString.charAt(index++)) << 2 |
                            (joinedKeyCharacters + joinedBase64Characters).indexOf(encodedString.charAt(index++)) >> 4;
        let char2 = (15 & charIndex1) << 4 | (charIndex2 = (joinedKeyCharacters + joinedBase64Characters).indexOf(encodedString.charAt(index++))) >> 2;
        let char3 = (3 & charIndex2) << 6 | (charIndex4 = (joinedKeyCharacters + joinedBase64Characters).indexOf(encodedString.charAt(index++)));
        decodedOutput += String.fromCharCode(decodedString);
        if (64 !== charIndex2) decodedOutput += String.fromCharCode(char2);
        if (64 !== charIndex4) decodedOutput += String.fromCharCode(char3);
    }

    return utf8Decode(decodedOutput);
}

// دالة لفك تشفير UTF-8
function utf8Decode(encodedString) {
    let decodedString = '', charCode, nextCharCode, nextNextCharCode;
    let index = 0;

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
            nextNextCharCode = encodedString.charCodeAt(index + 2);
            decodedString += String.fromCharCode((15 & charCode) << 12 | (63 & nextCharCode) << 6 | 63 & nextNextCharCode);
            index += 3;
        }
    }
    return decodedString;
}

// استخراج معلومات URL
const myMeta = document.querySelector('meta[property="og:url"]'),
      metaContent = myMeta.getAttribute('content'),
      splitMetaContent = metaContent.split('://')[1].split('/')[0];

const contentIdentifier = splitMetaContent.replace(/\./g, '_');

// التحقق من صحة تسجيل الدخول
if (splitMetaContent + 'firebaseLogin' === loginOpen(loginSettings.license)) {
    const userPasswordKey = loginOpen('aNFdsNa4rIZ1rV==');
    if (localStorage.getItem('user') != null) {
        window.location.href = loginSettings.redirect;
    }

    const emailInput = document.querySelector('#email'),
          passwordInput = document.querySelector('#password'),
          notification = document.querySelector('#logNotif');

    // دالة للتحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // دالة لتبديل عرض كلمة المرور
    function togglePasswordVisibility() {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }

    // معالجة إدخال المستخدم
    emailInput.addEventListener('keyup', function () {
        this.value = this.value.toLowerCase().replace(/\s/g, '');
    });
    passwordInput.addEventListener('keyup', function () {
        this.value = this.value.replace(/\s/g, '');
    });

    // دالة لتسجيل الدخول
    function login() {
        if (emailInput.value === '') {
            notification.classList.remove('hidden');
            notification.innerHTML = loginSettings.emailempty;
        } else if (!validateEmail(emailInput.value)) {
            notification.classList.remove('hidden');
            notification.innerHTML = loginSettings.emaileinvalid;
        } else if (passwordInput.value === '') {
            notification.classList.remove('hidden');
            notification.innerHTML = loginSettings.passwordempty;
        } else {
            notification.classList.remove('hidden');
            notification.innerHTML = loginSettings.loading;
            firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
                .then(function (authResult) {
                    const user = authResult.user;
                    if (user.emailVerified) {
                        localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }));
                        window.location.href = loginSettings.redirect;
                    } else {
                        notification.innerHTML = 'يرجى التحقق من بريدك الإلكتروني.';
                    }
                })
                .catch(function (error) {
                    notification.classList.remove('hidden');
                    notification.innerHTML = loginSettings.emailpaswrong;
                });
        }
    }

    document.querySelector('#loginBtn').addEventListener('click', login);
}
