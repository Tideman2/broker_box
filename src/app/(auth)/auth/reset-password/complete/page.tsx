import { Suspense } from 'react';

import CompleteResetStep from '@/views/Auth/ResetPassword/CompleteReset';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CompleteResetStep />
        </Suspense>
    );
}
