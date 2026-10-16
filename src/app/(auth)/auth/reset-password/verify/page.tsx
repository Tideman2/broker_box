import { Suspense } from 'react';

import VerifyOtpStep from '@/views/Auth/ResetPassword/VerifyOtp';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <VerifyOtpStep />
        </Suspense>
    );
}
