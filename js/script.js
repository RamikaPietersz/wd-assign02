document.addEventListener("DOMContentLoaded", () => {
    // Execute active styling engine on the main navigation panel links
    highlightCurrentPage();

    // Route workflows based on active structural element IDs
    if (document.getElementById("getRecommendationBtn")) {
        initRecommendationLogic();
    }
    if (document.getElementById("registerForm")) {
        initRegistrationValidation();
    }
    if (document.getElementById("reservationForm")) {
        initReservationSystem();
    }
});

/**
 * 1. Active Navigation Indicator
 */
function highlightCurrentPage() {
    var links = document.querySelectorAll("nav a");
    var currentUrl = window.location.href;
    for (var i = 0; i < links.length; i++) {
        if (currentUrl.includes(links[i].getAttribute("href"))) {
            links[i].className = "active";
        } else {
            links[i].className = "";
        }
    }
}

/**
 * 2. Recommendation Engine Logic
 */
function initRecommendationLogic() {
    var btn = document.getElementById("getRecommendationBtn");
    btn.addEventListener("click", () => {
        var diet = document.getElementById("dietPref").value;
        var budget = document.getElementById("budgetRange").value;
        var purpose = document.getElementById("diningPurpose").value;
        
        var targetValue = "sunrise"; // Standard default fall-back assignment
        var title = "The Sunrise Plate";
        var rationale = "Based on your criteria, we match you with our premier CBD spot, perfect for everyday classic culinary satisfaction.";

        // Comprehensive rule testing based on inputs
        if (diet === "Vegan") {
            targetValue = "fitzroy";
            title = "Fitzroy Vegan Kitchen";
            rationale = "Your dietary choice directly matches our premier, trendy Fitzroy organic plant-based hub.";
        } else if (diet === "Halal" && budget === "low") {
            targetValue = "chinatown";
            title = "Chinatown Dumplings";
            rationale = "Our hand-pulled late-night menu parameters match your specified budget and requirements.";
        } else if (budget === "high" || purpose === "Business") {
            targetValue = "yarra";
            title = "Yarra Fine Dining";
            rationale = "Your corporate profile or high budget options fit our Southbank waterfront premium setup.";
        } else if (purpose === "Family") {
            if (diet === "None" && budget === "mid") {
                targetValue = "lygon";
                title = "Lygon Pizza Co.";
                rationale = "Our heritage wood-fired sharing options represent the perfect option for large family groupings.";
            } else {
                targetValue = "stkilda";
                title = "St Kilda Seafood";
                rationale = "Our expansive beach side layout matches multi-generational group requirements flawlessly.";
            }
        }

        // Render calculated choice to the viewport
        document.getElementById("recTitle").textContent = title;
        document.getElementById("recText").textContent = rationale;
        
        var linkElement = document.getElementById("recLink");
        linkElement.setAttribute("href", "reservation.html?restaurant=" + targetValue);
        
        document.getElementById("recommendationResultBox").style.display = "block";
    });
}

/**
 * 3. Account Creation Form Validation Guard
 */

function initRegistrationValidation() {
    var usernameInput = document.getElementById("regUser");
    var emailInput = document.getElementById("regEmail");
    var phoneInput = document.getElementById("regPhone");
    var pwdInput = document.getElementById("regPwd");
    var form = document.getElementById("registerForm");
    form.addEventListener("submit", (e) => {
        var errors = [];

        var username = usernameInput.value.trim();
        var email = emailInput.value.trim();
        var phone = phoneInput.value.trim();
        var pwd = pwdInput.value;
        var confirmPwd = document.getElementById("regConfirm").value;
        var diet = document.getElementById("regDiet").value;
        var country = document.getElementById("regCountry").value;
        var genderSelected =
            document.getElementById("genderM").checked ||
            document.getElementById("genderF").checked;

        // Validation Rule 1: Required Fields
        if (!username || !email || !phone || !pwd || !confirmPwd || !diet || !country) {
            errors.push("All fields must be completed.");
        }

        // Validation Rule 2: Username Validation
        if (username) {
            if (username.length < 5) {
                errors.push("Username must contain at least 5 characters.");
            }

            if (!/^[A-Za-z_]+$/.test(username)) {
                errors.push("Username allows only standard letters and underscores.");
            }
        }

        // Validation Rule 3: Email Validation
        var emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRE.test(email)) {
            errors.push("Please provide a valid standard email layout pattern.");
        }

        // Validation Rule 4: Phone Validation
        var cleanPhone = phone.replace(/[^0-9]/g, "");
        if (phone && (cleanPhone !== phone || phone.length < 8 || phone.length > 15)) {
            errors.push("Phone entry must contain digits only, strictly bounded between 8 and 15 digits.");
        }

        // Validation Rule 5: Password Validation
        if (pwd) {
            if (pwd.length < 10 ||
                !/[A-Z]/.test(pwd) ||
                !/[a-z]/.test(pwd) ||
                !/[0-9]/.test(pwd) ||
                !/[@$!#%*?&]/.test(pwd))                
                {

                errors.push("Password must be at least 10 characters and include uppercase, lowercase, numbers, and special characters.");
            }

            if (pwd !== confirmPwd) {
                errors.push("Your password confirmation entry does not match.");
            }
        }

        // Validation Rule 6: Gender Selection
        if (!genderSelected) {
            errors.push("You must select your gender identity.");
        }

        // Render Validation Errors
        var errorBox = document.getElementById("regErrorBox");
        var errorList = document.getElementById("regErrorList");
        errorList.innerHTML = "";

        if (errors.length > 0) {
            e.preventDefault();

            for (var j = 0; j < errors.length; j++) {
                var li = document.createElement("li");
                li.textContent = errors[j];
                errorList.appendChild(li);
            }

            errorBox.style.display = "block";
            window.scrollTo(0, 0);
        } else {
            errorBox.style.display = "none";
        }
    });
}
/**
 * 4. Bill Calculator
 */
var calcForm = document.getElementById("calcForm");
if (calcForm) {
    var subtotalInput = document.getElementById("subtotal");
    var tipInput = document.getElementById("tip");
    var tipValDisplay = document.getElementById("tipVal");
    var resultDisplay = document.getElementById("calcResult");

    var calculateBill = () => {
        var subtotal = parseFloat(subtotalInput.value) || 0;
        var tipPercent = parseInt(tipInput.value) || 0;
        
        // Update tip label
        tipValDisplay.textContent = `${tipPercent}%`;

        // Calculate
        var tipAmount = subtotal * (tipPercent / 100);
        var tax = subtotal * 0.10; // 10% GST
        var total = subtotal + tax + tipAmount;

        resultDisplay.textContent = `Total Estimated Bill: $${total.toFixed(2)}` + ` (Includes $${tax.toFixed(2)} GST and $${tipAmount.toFixed(2)} tip)`;
    };

    // Listen for any input changes
    subtotalInput.addEventListener("input", calculateBill);
    tipInput.addEventListener("input", calculateBill);
}


/**
 * 5. Booking System Operations Manager
 */
function initReservationSystem() {
    var selectNode = document.getElementById("restaurantSelect");
    var guestsInput = document.getElementById("resGuests");
    var paySelect = document.getElementById("paymentMethod");
    var sameAsCheck = document.getElementById("sameAsEmail");
    
    // Static varant storage containing deposit amounts for the 6 restaurants
    var rateCard = {
        sunrise: 10,
        yarra: 25,
        lygon: 15,
        fitzroy: 12,
        stkilda: 20,
        chinatown: 10
    };

    // Parse URL parameter keys to look for pre-filled restaurant selection pointers
    var urlParams = new URLSearchParams(window.location.search);
    var urlRest = urlParams.get("restaurant");
    if (urlRest && rateCard[urlRest] !== undefined) {
        selectNode.value = urlRest;
    }

    // Mathematical update engine for financial totals
    function computeBookingBalances() {
        var choice = selectNode.value;
        var multiplier = rateCard[choice] || 0;
        var headcount = parseInt(guestsInput.value) || 0;
        
        if (headcount < 0) headcount = 0;

        document.getElementById("perHeadDisplay").textContent = "$" + multiplier.toFixed(2);
        document.getElementById("totalDepositDisplay").textContent = "$" + (multiplier * headcount).toFixed(2);
    }

    // Attach real-time mathematical calculations to input fields
    selectNode.addEventListener("change", computeBookingBalances);
    guestsInput.addEventListener("input", computeBookingBalances);
    computeBookingBalances(); // Initial run on page mount

    // Conditional visibility controller for billing rows
    paySelect.addEventListener("change", () => {
    var mode = paySelect.value;
    if (mode === "none") {
        document.getElementById("voucherSection").style.display = "none";
        document.getElementById("cardSection").style.display = "none";
    } else if (mode === "Online") {
        document.getElementById("voucherSection").style.display = "none";
        document.getElementById("cardSection").style.display = "block";
    } else {
        document.getElementById("voucherSection").style.display = "block";
        document.getElementById("cardSection").style.display = "none";
    }
});

    // Sync billing email field based on checkbox changes
    sameAsCheck.addEventListener("change", () => {
        if (sameAsCheck.checked) {
            document.getElementById("billingEmail").value = document.getElementById("resEmail").value;
        }
    });
    
    // Keep billing email up to date if user edits main contact email while checkbox is checked
    document.getElementById("resEmail").addEventListener("input", () => {
        if (sameAsCheck.checked) {
            document.getElementById("billingEmail").value = document.getElementById("resEmail").value;
        }
    });

    // Secure form validation step before final submission
    var form = document.getElementById("reservationForm");
    form.addEventListener("submit", (e) => {
        var errors = [];

        var name = document.getElementById("resName").value.trim();
        var email = document.getElementById("resEmail").value.trim();
        var phone = document.getElementById("resPhone").value.trim();
        var dateVal = document.getElementById("resDate").value;
        var timeVal = document.getElementById("resTime").value;
        var guests = parseInt(guestsInput.value) || 0;
        var payMode = paySelect.value;
        var billEmail = document.getElementById("billingEmail").value.trim();

        // Validation rule 1: Missing core parameter blocks
        if (!name || !email || !phone || !dateVal || !timeVal || !billEmail) {
            errors.push("All fields must be completed.");
        }

        // Validation rule 2: Email format verification
        var emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRE.test(email)) {
            errors.push("Primary contact email formatting is invalid.");
        }
        if (billEmail && !emailRE.test(billEmail)) {
            errors.push("Billing email formatting is invalid.");
        }

        // Validation rule 3: Phone formatting check
        var cleanPhone = phone.replace(/[^0-9]/g, "");
        if (phone && (cleanPhone !== phone || phone.length < 10)) {
            errors.push("Phone number must contain at least 10 digits.");
        }

        // Validation rule 4: Headcount bounds checking
        if (guests <= 0) {
            errors.push("The number of people must be greater than 0.");
        }

        // Validation rule 5: Date validation (prevent bookings in the past)
        if (dateVal) {
            var selectedDate = new Date(dateVal + "T" + (timeVal || "00:00"));
            var currentSystemTime = new Date();
            if (selectedDate < currentSystemTime) {
                errors.push("Reservation date and time cannot be in the past.");
            }
        }

        // Validation rule 6: Payment routing checks
        // Inside your reservationForm submit event listener:
if (payMode === "Online") {
    var card = document.getElementById("cardNum").value.trim();
    var cardClean = card.replace(/[^0-9]/g, ""); 
    
    // Get selected radio button value
    var selectedRadio = document.querySelector('input[name="cardType"]:checked');
    
    if (!selectedRadio) {
        errors.push("Please select a card type (Visa/MC or Amex).");
    } else if (!cardClean) {
        errors.push("Credit card number required.");
    } else {
        var cardType = selectedRadio.value; // 'visa' or 'amex'

        if (cardType === "amex") {
            // Amex validation (15 digits)
            if (cardClean.length !== 15) {
                errors.push("American Express (Amex) must be exactly 15 digits.");
            }
        } else {
            // Visa/MC validation (16 digits)
            if (cardClean.length !== 16) {
                errors.push("Visa/Mastercard must be exactly 16 digits.");
            }
        }
    }
}

        // Render runtime block logs if any violations occur
        var errorBox = document.getElementById("resErrorBox");
        var errorList = document.getElementById("resErrorList");
        errorList.innerHTML = "";

        if (errors.length > 0) {
            e.preventDefault();
            for (var j = 0; j < errors.length; j++) {
                var li = document.createElement("li");
                li.textContent = errors[j];
                errorList.appendChild(li);
            }
            errorBox.style.display = "block";
            window.scrollTo(0, 0);
        } else {
            errorBox.style.display = "none";
        }
    });
}
