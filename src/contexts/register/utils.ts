import { EMAIL_REGEX_CHECK } from "./const";
import { RegistrationData, Step } from "./types"


export const canProcedeToNextStep = (registrationData: RegistrationData, currentStep: Step) => {

    switch (currentStep) {
        case 'country':
            return registrationData.country.trim() !== '';

        case 'account': {
            const fullName = registrationData.fullName.trim();
            const email = registrationData.email.trim();
            const { password, confirmPassword } = registrationData;

            return (
                EMAIL_REGEX_CHECK.test(email) &&
                password.length >= 8 &&
                password.length <= 100 &&
                password === confirmPassword &&
                fullName.length >= 2 &&
                fullName.length <= 100
            );
        }

        case 'personal': {
            const phone = registrationData.phone.trim();
            const username = registrationData.username?.trim();

            return (
                phone.length >= 8 &&
                phone.length <= 20 &&
                registrationData.dob.trim() !== '' &&
                (!username || username.length >= 3)
            );
        }

        case 'address':
            return (
                registrationData.address1.trim().length >= 3 &&
                registrationData.city.trim().length >= 2 &&
                registrationData.state.trim().length >= 2 &&
                registrationData.zip.trim().length >= 3
            );

        case 'finish':
            return registrationData.acceptTerms;

        default:
            return false;
    }
}

export const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email is required';

    const isValid = EMAIL_REGEX_CHECK.test(email);
    if (!isValid) return 'Enter a valid email';

    return '';
}