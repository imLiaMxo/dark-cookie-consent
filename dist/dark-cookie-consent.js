(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    class CookieConsent {
        constructor(options = {}) {
            this.cookieConsent = document.getElementById('cookie-consent');
            this.modal = document.getElementById('cookie-settings-modal');
            this.acceptButton = document.getElementById('cookie-accept');
            this.settingsButton = document.getElementById('cookie-settings');
            this.closeModalButton = document.querySelector('.close-modal');
            this.savePreferencesButton = document.getElementById('save-preferences');
            this.analyticsCookies = document.getElementById('analytics-cookies');
            this.marketingCookies = document.getElementById('marketing-cookies');

            // Customizable options
            this.options = {
                consentText: options.consentText || "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
                acceptButtonText: options.acceptButtonText || "Accept",
                settingsButtonText: options.settingsButtonText || "Cookie Settings",
                savePreferencesButtonText: options.savePreferencesButtonText || "Save Preferences",
                cookieExpirationDays: options.cookieExpirationDays || 180,
                onAccept: options.onAccept || null,
                onSavePreferences: options.onSavePreferences || null,
            };

            this.init();
        }

        init() {
            // Set the customizable consent text
            document.querySelector('.cookie-text p').textContent = this.options.consentText;
            this.acceptButton.textContent = this.options.acceptButtonText;
            this.settingsButton.textContent = this.options.settingsButtonText;
            this.savePreferencesButton.textContent = this.options.savePreferencesButtonText;

            // Check if user has already made a choice
            if (!this.getCookie('cookie_consent')) {
                this.showBanner();
            }

            // Load saved preferences
            this.loadPreferences();

            // Event listeners
            this.acceptButton.addEventListener('click', () => this.acceptAll());
            this.settingsButton.addEventListener('click', () => this.showModal());
            this.closeModalButton.addEventListener('click', () => this.hideModal());
            this.savePreferencesButton.addEventListener('click', () => this.savePreferences());

            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hideModal();
                }
            });
        }

        showBanner() {
            this.cookieConsent.style.display = 'block';
            setTimeout(() => {
                this.cookieConsent.classList.add('show');
            }, 100);
        }

        hideBanner() {
            this.cookieConsent.classList.remove('show');
            setTimeout(() => {
                this.cookieConsent.style.display = 'none';
            }, 300);
        }

        showModal() {
            this.modal.style.display = 'flex';
            setTimeout(() => {
                this.modal.classList.add('show');
            }, 100);
        }

        hideModal() {
            this.modal.classList.remove('show');
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 300);
        }

        acceptAll() {
            this.analyticsCookies.checked = true;
            this.marketingCookies.checked = true;
            this.savePreferences();
            if (typeof this.options.onAccept === 'function') {
                this.options.onAccept();
            }
        }

        savePreferences() {
            const preferences = {
                analytics: this.analyticsCookies.checked,
                marketing: this.marketingCookies.checked
            };

            // Save preferences for customizable days
            this.setCookie('cookie_consent', JSON.stringify(preferences), this.options.cookieExpirationDays);
            this.hideBanner();
            this.hideModal();

            // Apply preferences
            this.applyPreferences(preferences);

            if (typeof this.options.onSavePreferences === 'function') {
                this.options.onSavePreferences(preferences);
            }
        }

        loadPreferences() {
            const savedPreferences = this.getCookie('cookie_consent');
            if (savedPreferences) {
                try {
                    const preferences = JSON.parse(savedPreferences);
                    this.analyticsCookies.checked = preferences.analytics;
                    this.marketingCookies.checked = preferences.marketing;
                    this.applyPreferences(preferences);
                } catch (e) {
                    console.error('Error loading cookie preferences:', e);
                }
            }
        }

        applyPreferences(preferences) {
            if (preferences.analytics) {
                this.initializeAnalytics();
            } else {
                this.disableAnalytics();
            }

            if (preferences.marketing) {
                this.initializeMarketing();
            } else {
                this.disableMarketing();
            }
        }

        initializeAnalytics() {
            if (typeof gtag === 'function') {
                console.log('Google Analytics initialized');
                window['ga-disable-GA_MEASUREMENT_ID'] = false;
            }
        }

        disableAnalytics() {
            if (typeof gtag === 'function') {
                console.log('Google Analytics disabled');
                window['ga-disable-GA_MEASUREMENT_ID'] = true;
                this.eraseCookie('_ga');
                this.eraseCookie('_gat');
                this.eraseCookie('_gid');
            }
        }

        initializeMarketing() {
            if (typeof fbq === 'function') {
                console.log('Facebook Pixel initialized');
                fbq('consent', 'grant');
            }
            console.log('Marketing cookies enabled');
        }

        disableMarketing() {
            if (typeof fbq === 'function') {
                fbq('consent', 'revoke');
            }
            const marketingCookies = ['_fbp', 'fr'];
            marketingCookies.forEach(cookie => this.eraseCookie(cookie));
            console.log('Marketing cookies disabled');
        }

        setCookie(name, value, days) {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
        }

        getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }

        eraseCookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    // Initialize Cookie Consent
    document.addEventListener('DOMContentLoaded', () => {
        window.cookieConsent = new CookieConsent({
            consentText: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
            acceptButtonText: "Accept All",
            settingsButtonText: "Customize Settings",
            savePreferencesButtonText: "Save Preferences",
            cookieExpirationDays: 365,
            onAccept: () => {
                console.log('Cookies Accepted');
            },
            onSavePreferences: (preferences) => {
                console.log('Preferences saved:', preferences);
            }
        });
    });

}));
