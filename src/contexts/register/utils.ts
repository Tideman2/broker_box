import { EMAIL_REGEX_CHECK } from "./const";
import { RegistrationData, Step } from "./types"


export const canProcedeToNextStep = (registrationData: RegistrationData, currentStep: Step) => {

    switch (currentStep) {
        case 'country':
            return registrationData.country.trim() !== '';

        case 'account':
            return (
                registrationData.email.trim() !== '' &&
                registrationData.password.trim() !== '' &&
                registrationData.confirmPassword.trim() !== '' &&
                registrationData.fullName.trim() !== '' &&
                registrationData.password === registrationData.confirmPassword
            );

        case 'personal':
            return (
                registrationData.phone.trim() !== '' &&
                registrationData.dob.trim() !== ''
            );

        case 'address':
            return (
                registrationData.address1.trim() !== '' &&
                registrationData.city.trim() !== '' &&
                registrationData.state.trim() !== '' &&
                registrationData.zip.trim() !== ''
            );

        case 'terms':
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