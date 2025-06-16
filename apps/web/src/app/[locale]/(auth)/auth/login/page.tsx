'use client';
import LoginForm from '@/modules/auth/login/login.form';

function Page() {
  return (
    <div className="mx-auto relative w-full space-y-16 text-center">
      <div className="flex w-full max-w-md mx-auto justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;
