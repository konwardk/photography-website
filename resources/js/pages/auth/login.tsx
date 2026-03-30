import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({
    status,
    canResetPassword,
}: Props) {
    return (
        <>
            <Head title="Admin Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-neutral-700 font-medium text-xs uppercase tracking-widest bg-transparent">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Enter your administrative email"
                                    className="bg-white/50 border-black/10 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-black/20 rounded-lg h-[50px] px-4 shadow-inner text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-neutral-700 font-medium text-xs uppercase tracking-widest bg-transparent">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors decoration-transparent hover:decoration-neutral-900"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="bg-white/50 border-black/10 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-black/20 rounded-lg h-[50px] px-4 shadow-inner text-sm"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 mt-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-black/20 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
                                />
                                <Label htmlFor="remember" className="text-sm font-light text-neutral-600 cursor-pointer">Remember me securely</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-6 w-full h-[50px] bg-neutral-900 text-white hover:bg-neutral-800 uppercase tracking-widest text-[13px] font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2 h-4 w-4" />}
                                Access Portal
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-8 text-center text-sm font-medium text-emerald-700 bg-emerald-50 py-3 rounded-lg border border-emerald-200">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Admin Authentication',
    description: 'Restricted access. Please log in securely to continue.',
};
