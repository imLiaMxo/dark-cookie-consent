
# Dark Cookie Consent

A simple, customizable cookie consent banner that allows users to manage their cookie preferences. It features an intuitive modal interface for accepting or customizing preferences for analytics and marketing cookies. This solution is ideal for modern websites that need to comply with privacy laws, such as GDPR.

## Features
- **Cookie consent banner**: Displays a banner asking users to accept or customize cookies.
- **Cookie settings modal**: Allows users to enable/disable analytics and marketing cookies.
- **Analytics & marketing cookie handling**: Automatically applies user preferences to enable/disable services like Google Analytics and Facebook Pixel.
- **Persistent user preferences**: Preferences are saved in cookies for 6 months.
- **Customizable design**: Easily style the banner and modal with your own CSS.

## Installation

You can install the `dark-cookie-consent` npm package in your project by running:

```bash
npm install dark-cookie-consent
```

## Usage

1. Import the package in your JavaScript file:

```javascript
import 'dark-cookie-consent';
```

2. Add the HTML structure for the cookie consent banner and settings modal into your HTML file:

```html
<!-- Cookie Consent Banner -->
<div id="cookie-consent" class="cookie-consent" style="display: none;">
    <div class="cookie-content">
        <div class="cookie-text">
            <i class="fas fa-cookie-bite"></i>
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        </div>
        <div class="cookie-buttons">
            <button id="cookie-accept" class="btn-cookie accept">Accept</button>
            <button id="cookie-settings" class="btn-cookie settings">Cookie Settings</button>
        </div>
    </div>
</div>

<!-- Cookie Settings Modal -->
<div id="cookie-settings-modal" class="cookie-modal" style="display: none;">
    <div class="cookie-modal-content">
        <div class="cookie-modal-header">
            <h3>Cookie Settings</h3>
            <button class="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="cookie-modal-body">
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4>Essential Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" checked disabled>
                        <span class="slider"></span>
                    </label>
                </div>
                <p>Required for the website to function properly. Cannot be disabled.</p>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4>Analytics Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="analytics-cookies">
                        <span class="slider"></span>
                    </label>
                </div>
                <p>Help us improve our website by collecting anonymous usage data.</p>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4>Marketing Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="marketing-cookies">
                        <span class="slider"></span>
                    </label>
                </div>
                <p>Used to track visitors across websites to display relevant advertisements.</p>
            </div>
        </div>
        <div class="cookie-modal-footer">
            <button id="save-preferences" class="btn-cookie save">Save Preferences</button>
        </div>
    </div>
</div>
```

3. Initialize the cookie consent functionality in your JavaScript file:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});
```

## Customization

You can now customize the cookie consent banner and modal using the following options:

```javascript
new CookieConsent({
    consentText: "We use cookies to ensure you get the best experience.", // Customize the consent message
    acceptButtonText: "I Accept", // Customize the Accept button text
    settingsButtonText: "Cookie Settings", // Customize the Settings button text
    savePreferencesButtonText: "Save Preferences", // Customize the Save Preferences button text
    cookieExpirationDays: 90, // Set the cookie expiration days
    onAccept: () => { console.log("Cookies Accepted"); }, // Callback function for Accept button
    onSavePreferences: (preferences) => { console.log("Preferences saved:", preferences); } // Callback for saving preferences
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
