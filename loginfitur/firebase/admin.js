// Define arrays for encoding
var encodingChars = ['FGHIJKLijklmarstuv', 'NOPQRSWXYZhTUVABCDE'], // Characters used for encoding
    decodingChars = ['wxyzefgnopbcd', '0123456789+/=']; // Characters used for decoding

// Join the arrays into strings
var joinedEncodingChars = encodingChars.join('M'), // Join encoding characters with 'M'
    joinedDecodingChars = decodingChars.join('q'); // Join decoding characters with 'q'

// Function to open login
function openLogin(encodedString) {
    var innerFunction = function () {
        var isFirstCall = true; // Flag to check if it's the first call
        return function (context, callback) {
            var resultFunction = isFirstCall ? function () {
                if (callback) {
                    var result = callback.apply(context, arguments); // Call the callback function
                    return callback = null, result; // Reset callback and return result
                }
            } : function () {};
            return isFirstCall = false, resultFunction; // Set flag to false after first call
        };
    }();

    var checkFunction = innerFunction(this, function () {
        return checkFunction.toString().search('(((.+)+)+)+$').toString().constructor(checkFunction).search('(((.+)+)+)+$');
    });
    checkFunction(); // Execute check function

    var consoleFunction = function () {
        var isFirstCall = true; // Flag to check if it's the first call
        return function (context, callback) {
            var resultFunction = isFirstCall ? function () {
                if (callback) {
                    var result = callback.apply(context, arguments); // Call the callback function
                    return callback = null, result; // Reset callback and return result
                }
            } : function () {};
            return isFirstCall = false, resultFunction; // Set flag to false after first call
        };
    }();

    var setupConsoleMethods = consoleFunction(this, function () {
        var consoleContext;
        try {
            var getGlobalContext = function () {
                return function () {}.constructor("return this")(); // Get global context
            };
            consoleContext = getGlobalContext();
        } catch (error) {
            consoleContext = window; // Fallback to window if error occurs
        }
        var consoleObject = consoleContext.console = consoleContext.console || {},
            consoleMethods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];

        for (var i = 0; i < consoleMethods.length; i++) {
            var boundFunction = consoleFunction.constructor.prototype.bind(consoleFunction);
            var methodName = consoleMethods[i];
            var originalMethod = consoleObject[methodName] || boundFunction;
            boundFunction.__proto__ = consoleFunction.bind(consoleFunction);
            boundFunction.toString = originalMethod.toString.bind(originalMethod);
            consoleObject[methodName] = boundFunction; // Override console methods
        }
    });
    setupConsoleMethods(); // Setup console methods

    var decodedChar1, decodedChar2, decodedChar3, decodedChar4, decodedChar5, decodedChar6,
        combinedChars = joinedEncodingChars + joinedDecodingChars, // Combine encoding and decoding characters
        decodedString = '',
        index = 0;

    // Process the encoded string
    for (encodedString = encodedString.replace(/[^A-Za-z0-9+/=]/g, ''); index < encodedString.length;) {
        decodedChar1 = combinedChars.indexOf(encodedString.charAt(index++)) << 2 | (decodedChar4 = combinedChars.indexOf(encodedString.charAt(index++))) >> 4;
        decodedChar2 = (15 & decodedChar4) << 4 | (decodedChar5 = combinedChars.indexOf(encodedString.charAt(index++))) >> 2;
        decodedChar3 = (3 & decodedChar5) << 6 | (decodedChar6 = combinedChars.indexOf(encodedString.charAt(index++)));
        decodedString += String.fromCharCode(decodedChar1);
        64 !== decodedChar5 && (decodedString += String.fromCharCode(decodedChar2));
        64 !== decodedChar6 && (decodedString += String.fromCharCode(decodedChar3));
    }
    return decodedString = utf8Decode(decodedString); // Decode UTF-8
}

// Function to decode UTF-8
function utf8Decode(encodedString) {
    var decodedString = '', 
        index = 0, 
        charCode, 
        nextCharCode1, 
        nextCharCode2;

    while (index < encodedString.length) {
        charCode = encodedString.charCodeAt(index);
        if (charCode < 128) {
            decodedString += String.fromCharCode(charCode); // ASCII characters
            index++;
        } else if (charCode > 191 && charCode < 224) {
            nextCharCode1 = encodedString.charCodeAt(index + 1);
            decodedString += String.fromCharCode((31 & charCode) << 6 | 63 & nextCharCode1); // 2-byte characters
            index += 2;
        } else {
            nextCharCode1 = encodedString.charCodeAt(index + 1);
            nextCharCode2 = encodedString.charCodeAt(index + 2);
            decodedString += String.fromCharCode((15 & charCode) << 12 | (63 & nextCharCode1) << 6 | 63 & nextCharCode2); // 3-byte characters
            index += 3;
        }
    }
    return decodedString; // Return decoded string
}

// Get meta data
var metaTag = document.querySelector('meta[property="og:url"]'), // Select meta tag
    metaContent = metaTag.getAttribute('content'), // Get content attribute
    domain = metaContent.split('://')[1].split('/')[0]; // Extract domain

// Replace dots in domain name
var formattedDomain = domain.replace(/\./g, '_'); // Replace '.' with '_'

// Check login
if (domain + 'firebaseLogin' === openLogin(adminSettings.license)) {
    var userPasswordKey = openLogin('OwK3SQ4brOFejdu=='), // Decode user password key
        userData = localStorage.getItem('user'); // Get user data from local storage

    if (userData) {
        var user = JSON.parse(userData), // Parse user data
            userName = user.name,
            userProfile = user.profile,
            userPhone = user.phone, // Changed from 'nomor' to 'phone'
            userEmail = user.email; // Email
    }

    var adminId = adminSettings.userIdAdmin; // Get admin ID

    // Retrieve data from Firebase
    fetch(adminSettings.firebase + '/data' + openLogin('mwzqY24=')).then(response => response.json()).then(data => {
        var decryptedData = CryptoJS.AES.decrypt(data[adminId], userPasswordKey).toString(CryptoJS.enc.Utf8); // Decrypt data
        var splitData = decryptedData.split('{split}'); // Split decrypted data
        var userNameFromData = splitData[0];
        var userPhoneFromData = splitData[2];
        var userEmailFromData = splitData[1];

        // Validate data
        if (userEmailFromData !== userEmail && userPhoneFromData !== userPhone && userNameFromData !== userName) {
            document.body.innerHTML = ''; // Clear body if validation fails
        }
    });
}

// Function to display the table
function displayTable() {
    var userIdInput = document.getElementById('inputUserId').value; // Get user ID input
    var tableRows = document.querySelectorAll('tbody tr'); // Get table rows

    // Validate user input
    if (userIdInput === '') {
        alert(adminSettings.invalid); // Show invalid alert
        return;
    }

    var userFound = false; // Flag to check if user is found

    // Search for the user in the rows
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i],
            textInput = row.querySelector('input[type="text"]'),
            inputValue = textInput.value;

        if (inputValue === userIdInput) {
            row.style.display = ''; // Show row if user is found
            userFound = true;
        } else {
            row.style.display = 'none'; // Hide row if user is not found
        }
    }

    // If user not found, display all rows again
    if (!userFound) {
        alert(adminSettings.nullz); // Show null alert
        for (var i = 0; i < tableRows.length; i++) {
            var row = tableRows[i];
            row.style.display = ''; // Show all rows
        }
    }
}

// Fetch data from Firebase
fetch(adminSettings.firebase + '/data.json')
    .then(response => response.json())
    .then(data => {
        const memberTableContainer = document.getElementById('memberTableContainer'); // Get table container
        var table = document.createElement('table'), // Create table
            thead = document.createElement('thead'), // Create table header
            headerRow = document.createElement('tr'); // Create header row

        // Create table headers
        var uidHeader = document.createElement('th');
        uidHeader.setAttribute('scope', 'col');
        uidHeader.textContent = adminSettings.uid; // User ID header
        headerRow.appendChild(uidHeader);

        var emailHeader = document.createElement('th');
        emailHeader.setAttribute('scope', 'col');
        emailHeader.textContent = adminSettings.email; // Email header
        headerRow.appendChild(emailHeader);

        var nameHeader = document.createElement('th');
        nameHeader.setAttribute('scope', 'col');
        nameHeader.textContent = adminSettings.name; // Name header
        headerRow.appendChild(nameHeader);

        var phoneHeader = document.createElement('th');
        phoneHeader.setAttribute('scope', 'col');
        phoneHeader.textContent = adminSettings.phone; // Phone header
        headerRow.appendChild(phoneHeader);

        var premiumHeader = document.createElement('th');
        premiumHeader.setAttribute('scope', 'col');
        premiumHeader.textContent = adminSettings.premium; // Premium status header
        headerRow.appendChild(premiumHeader);

        thead.appendChild(headerRow); // Append header row to thead
        table.appendChild(thead); // Append thead to table

        var tbody = document.createElement('tbody'); // Create table body

        // Process retrieved data
        for (const id in data) {
            const encryptedData = data[id]; // Get encrypted data
            var decryptedData = CryptoJS.AES.decrypt(encryptedData, usrPswKey).toString(CryptoJS.enc.Utf8); // Decrypt data
            var splitData = decryptedData.split('{split}'); // Split decrypted data
            var userId = id,
                userEmail = splitData[0],
                userName = splitData[1],
                userPhone = splitData[2],
                userPremiumStatus = splitData[3];

            var row = document.createElement('tr'); // Create a new row
            row.id = userId; // Set row ID

            // Create table cells
            var idCell = document.createElement('td');
            idCell.setAttribute('data-label', adminSettings.uid);
            var idInput = document.createElement('input');
            idInput.setAttribute('type', 'text');
            idInput.setAttribute('readonly', 'readonly');
            idInput.value = userId; // Set user ID value
            idCell.appendChild(idInput);
            row.appendChild(idCell);

            var emailCell = document.createElement('td');
            emailCell.setAttribute('data-label', adminSettings.email);
            var emailInput = document.createElement('input');
            emailInput.setAttribute('type', 'text');
            emailInput.setAttribute('readonly', 'readonly');
            emailInput.value = userEmail; // Set email value
            emailCell.appendChild(emailInput);
            row.appendChild(emailCell);

            var nameCell = document.createElement('td');
            nameCell.setAttribute('data-label', adminSettings.name);
            var nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('readonly', 'readonly');
            nameInput.value = userName; // Set name value
            nameCell.appendChild(nameInput);
            row.appendChild(nameCell);

            var phoneCell = document.createElement('td');
            phoneCell.setAttribute('data-label', adminSettings.phone);
            var phoneInput = document.createElement('input');
            phoneInput.setAttribute('type', 'text');
            phoneInput.setAttribute('readonly', 'readonly');
            phoneInput.value = userPhone; // Set phone value
            phoneCell.appendChild(phoneInput);
            row.appendChild(phoneCell);

            var premiumCell = document.createElement('td');
            premiumCell.setAttribute('data-label', adminSettings.premium);
            var premiumInput = document.createElement('input');
            premiumInput.setAttribute('type', 'text');
            premiumInput.setAttribute('class', 'memberShip');
            premiumInput.setAttribute('readonly', 'readonly');
            premiumInput.value = userPremiumStatus.replace(/^premium-/i, ''); // Set premium status value
            premiumCell.appendChild(premiumInput);

            var actionButton = document.createElement('button');
            actionButton.setAttribute('class', 'Activate');
            actionButton.textContent = adminSettings.btn1; // Set button text
            actionButton.setAttribute('onclick', 'setPremium(this)'); // Set onclick event
            premiumCell.appendChild(actionButton);

            // Check subscription status
            if (premiumInput.value === '0-0-0') {
                premiumInput.value = 'Inactive'; // Set inactive status
                premiumInput.style.display = 'none'; // Hide premium input
            } else {
                actionButton.setAttribute('class', 'Disable');
                premiumInput.style.display = 'inline-block'; // Show premium input
                actionButton.textContent = adminSettings.btn2; // Change button text
                actionButton.setAttribute('onclick', 'rePremium(this)'); // Set onclick event for rePremium
            }

            row.appendChild(premiumCell); // Append premium cell to row
            tbody.appendChild(row); // Append row to tbody
        }

        table.appendChild(tbody); // Append tbody to table
        memberTableContainer.appendChild(table); // Append table to container
    })
    .catch(error => {
        console.log('Error occurred:', error); // Log error
    });

// Function to set premium subscription status
function setPremium(buttonElement) {
    var row = buttonElement.closest('tr'); // Get closest row
    var userId = row.id,
        userEmail = row.querySelector('#email').value,
        userName = row.querySelector('#name').value;
    var userPhone = row.querySelector('#phone').value, // Changed from 'noHp' to 'phone'
        premiumCode = prompt(adminSettings.pormptx); // Prompt for premium code

    // Validate user input
    if (premiumCode !== null) {
        var userData = userEmail + '{split}' + userName + '{split}' + userPhone + '{split}premium-' + premiumCode,
            encryptedData = CryptoJS.AES.encrypt(userData, usrPswKey).toString(), // Encrypt user data
            confirmation = confirm(adminSettings.confirm1 + userName + ' ?'); // Confirm action

        // If user confirms, update data
        if (confirmation) {
            var dataUrl = adminSettings.firebase + '/data/' + userId + '.json';
            fetch(dataUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(encryptedData) // Send encrypted data
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload(); // Reload the page after update
            })
            .catch(error => {
                alert('An error occurred, please try again'); // Show error alert
                window.location.reload(); // Reload the page in case of error
            });
        }
    }
}

// Function to reset premium subscription status
function rePremium(buttonElement) {
    var row = buttonElement.closest('tr'), // Get closest row
        userId = row.id;
    var userEmail = row.querySelector('#email').value;
    var userName = row.querySelector('#name').value,
        userPhone = row.querySelector('#phone').value, // Changed from 'noHp' to 'phone'
        userData = userEmail + '{split}' + userName + '{split}' + userPhone + '{split}premium-0-0-0'; // Reset premium status

    var encryptedData = CryptoJS.AES.encrypt(userData, usrPswKey).toString(), // Encrypt user data
        confirmation = confirm(adminSettings.confirm2 + userName + ' ?'); // Confirm action

    // If user confirms, update data
    if (confirmation) {
        var dataUrl = adminSettings.firebase + '/data/' + userId + '.json';
        fetch(dataUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(encryptedData) // Send encrypted data
        })
        .then(response => response.json())
        .then(data => {
            window.location.reload(); // Reload the page after update
        })
        .catch(error => {
            alert('Error occurred: ' + error); // Show error alert
            window.location.reload(); // Reload the page in case of error
        });
    }
} else {
    window.location.reload(); // Reload the page if operation not confirmed
}

// Fetch user data
fetch(openLogin('Xiv0Zia6md90hRvpZwEAYH02rCJbrd1DWQWAhQc0mRk0WLjoWwEdWQkAZ2PzYd5CY20pWwEdWQkAZ2PaY2hzYB5eZ29o'))
    .then(response => response.json())
    .then(data => {
        // Check user status
        if (!data.user || data.user[contentFnsh] !== true) {
            window.location.reload(); // Reload the page if user is not logged in
        }
    })
    .catch(error => {
        window.location.reload(); // Reload the page in case of error
    });
