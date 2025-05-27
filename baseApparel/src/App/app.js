import html from './app.html?raw';

export const App = (elementId) => {

    // Create a container for the App
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);

        // Logic to handle the form submission

        // Referencias HTML
        const inputSubmit = document.querySelector('.input__email');
        const buttonSubmit = document.querySelector('.button__submit');

        const inputError = inputSubmit.parentElement;

        // Add event listener to the input field
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        inputSubmit.addEventListener('blur', () => {
            // Remove error class if input is not empty

            const existsError = inputError.querySelector('.input__error--message');
            const existsSuccess = inputError.querySelector('.input__success--message');
            // Remove previous messages if exists
            if (existsError) existsError.remove();
            if (existsSuccess) existsSuccess.remove();

            if (inputSubmit.value === '' || !isValidEmail(inputSubmit.value)) {
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('input__error--message');
                errorMessage.innerHTML = 'Please provide a valid email';
                inputError.appendChild(errorMessage);
            } else {
                const successMessage = document.createElement('p');
                successMessage.classList.add('input__success--message');
                successMessage.innerHTML = 'Thank you for subscribing!';

                inputError.appendChild(successMessage);
            }
        });



        buttonSubmit.addEventListener('click', (event) => {
            event.preventDefault();

            const existsError = inputError.querySelector('.input__error--message');
            const existsSuccess = inputError.querySelector('.input__success--message');

            // Remove previous messages if exists
            if (existsError) existsError.remove();
            if (existsSuccess) existsSuccess.remove();

            if (inputSubmit.value === '' || !isValidEmail(inputSubmit.value)) {
                inputSubmit.classList.add('input__error');

                // Remove previous error message if exists
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('input__error--message');
                errorMessage.innerHTML = 'Please provide a valid email';

                inputError.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                    inputSubmit.classList.remove('input__error');
                }, 3000);

            } else {
                inputSubmit.classList.remove('input__error');

                // Show success message
                const successMessage = document.createElement('p');
                successMessage.classList.add('input__success--message');
                successMessage.innerHTML = 'Thank you for subscribing!';

                inputError.appendChild(successMessage);

                buttonSubmit.disabled = true;
                setTimeout(() => {
                    successMessage.remove();
                    inputSubmit.value = '';
                    buttonSubmit.disabled = false;
                }, 3000);
            }
        });
    })();
}
