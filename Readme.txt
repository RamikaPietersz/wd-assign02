Project Name: Melbourne Bites
Student Name: Ramika Pietersz
Student ID: 106225139

Description:
Melbourne Bites is a responsive, intuitive web platform built for Assignment 2. It allows users to browse local restaurants, register an account, and make reservations with dynamic deposit calculations. 

Key Features Implemented:
- Semantic HTML5 and modular CSS (Fully responsive across Desktop, Tablet, Mobile).
- Accessibility standards met (Logical heading hierarchy, high color contrast, readable fonts).
- JavaScript active page highlighting on navigation.
- Full Registration validation (preventing default submission, checking password lengths and matches).
- Rule-based recommendation engine on the Reservation page based on user input (dropdown selection).
- Dynamic deposit calculations based on the number of guests.
- BONUS: A dedicated Estimated Bill Calculator page.

Deployment:
- The website has been successfully tested locally and deployed on the Mercury server at: https://mercury.swin.edu.au/cos10005/s106225139/Wd_assign2_106225139/index.html
- GitHub Repository: https://ramikapietersz.github.io/wd-assign02/

Instructions for marker:
1. Open index.html to view the home page.
2. Navigate to the Reserve page to test the dynamic JS recommendation logic and the real-time deposit multiplier.
3. Test the Bonus Calculator via the navigation menu.

JavaScript logic:
1. Active Navigation Indicator
This function scans the navigation menu to see which link matches the current browser URL. If a match is found, it automatically applies an active CSS class to that link, allowing you to visually highlight the user's current location (e.g., underlining the "Home" link when on the home page).

2. Recommendation Engine
This logic acts as a decision tree based on user input (Diet, Budget, Purpose):

    Default Behavior: If no specific criteria are met, it defaults to "The Sunrise Plate."

    Conditional Rules: It uses a series of if/else if statements to match specific combinations (e.g., if a user selects "Vegan," it overrides the recommendation to "Fitzroy Vegan Kitchen").

    Dynamic Output: Once the logic determines the restaurant, it injects the result into the page and updates a reservation link with a URL parameter (e.g., ?restaurant=fitzroy) so the next page knows which restaurant was suggested.

3. Account Creation (Registration) Validation
This section acts as a "guard," preventing the form from submitting unless all requirements are met:
    Required Fields: Checks that no inputs are left empty.

    Pattern Matching (Regex): * Username: Allows only letters and underscores, and enforces a minimum length of 5.
        Email: Verifies the presence of an "@" symbol and a domain (standard email structure).

    Data Integrity: * Password: Uses complex checks to ensure the password is at least 10 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character. It also confirms the "Confirm Password" field matches exactly.
        Phone: Strips away non-numeric characters and ensures the remaining string is between 8 and 15 digits.

    Error Reporting: If any rules are broken, it gathers all error messages into a list, displays them in an error box, and prevents the form from sending data to the server.

4. Bill Calculator
This provides real-time feedback. Whenever a user types a number into the "Subtotal" or "Tip" fields, the script:

    Calculates 10% GST automatically.

    Calculates the tip amount based on the percentage provided.

    Displays the running total immediately on the screen without requiring a button click.

5. Reservation System
This is the most complex section, handling both data entry and secure payment validation:

    Rate Card: It maintains a dictionary (object) that links restaurant IDs to specific deposit amounts.

    Financial Sync: It updates the "Total Deposit" amount in real-time as the user changes the restaurant or adjusts the number of guests.

    Conditional Fields: It dynamically hides or shows either the "Voucher" or "Credit Card" fields depending on which payment method the user selects.

    Validation: * Time: It compares the selected date/time against the current system time to ensure users cannot book reservations in the past.
        Payment Security: If "Online" payment is chosen, it forces a card number check. It validates the length of the card number specifically based on the type selected: 15 digits for American Express and 16 digits for Visa/Mastercard.

References:

home images
City of Melbourne. (2026, March 10). The best Malaysian restaurants in Melbourne. What's On Melbourne. https://whatson.melbourne.vic.gov.au/article/the-best-malaysian-restaurants-in-melbourne
World of Mouth. (n.d.). The 17 best fine dining restaurants in Melbourne. https://www.worldofmouth.app/articles/fine-dining-melbourne
Visit Victoria. (n.d.). Tonka Melbourne. https://www.visitvictoria.com/regions/melbourne/eat-and-drink/restaurants/tonka-melbourne

restaurants images
Salt, B. (2016, October 16). The smashed avocado generation. Broadsheet. https://www.broadsheet.com.au/national/food-and-drink/article/smashed-avocado-generation
Meat Pairing. (n.d.). Best wine for Wagyu steak: Pairing guide. https://meatpairing.com/guides/best-wine-for-wagyu-steak/
Gabino's Wood Fired Pizza Co. (n.d.). Mentions [Facebook page]. Facebook. Retrieved May 31, 2026, from https://www.facebook.com/gabinoswoodfiredpizzaco/mentions/
Six Hungry Feet. (n.d.). Vegan Buddha bowl with tofu. https://sixhungryfeet.com/vegan-buddha-bowl-with-tofu/
Fauziamasood666. (n.d.). Fresh seafood platter served at a beachside restaurant during sunset with diners enjoying the ocean view [AI-generated image]. Freepik. https://www.freepik.com/premium-ai-image/fresh-seafood-platter-served-beachside-restaurant-sunset-with-diners-enjoying-ocean-view_291318449.htm
Doe, J. (2026, May 30). The best dumplings in Melbourne are definitely the ones at Chinatown Dumplings because the skin is perfectly thin [Facebook post]. Facebook. https://www.facebook.com/groups/518restaurants/posts/2535038320012269/
