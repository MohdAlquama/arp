import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout';

function Index({ users, status }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const submit = (event) => {
        event.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => reset(),
        });
    };

    const deleteUser = (user) => {
        if (!window.confirm(`Delete the account for ${user.name}? This cannot be undone.`)) {
            return;
        }

        router.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="User Accounts" />

            <div className="space-y-6">
                <div>
                    <p className="text-sm font-medium text-violet-700">Administration</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900">User Accounts</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View the accounts registered for the ARP Footwear panel.
                    </p>
                </div>

                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Create account</h2>
                    <p className="mt-1 text-sm text-slate-500">Add a user account for panel access.</p>
                    {status && (
                        <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                            {status}
                        </p>
                    )}
                    <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                            <input id="name" name="name" value={data.name} onChange={(event) => setData('name', event.target.value)} required autoComplete="name" className="w-full rounded-lg border-slate-300 text-sm focus:border-violet-600 focus:ring-violet-600" />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                            <input id="email" name="email" type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} required autoComplete="email" className="w-full rounded-lg border-slate-300 text-sm focus:border-violet-600 focus:ring-violet-600" />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                            <input id="password" name="password" type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} required autoComplete="new-password" className="w-full rounded-lg border-slate-300 text-sm focus:border-violet-600 focus:ring-violet-600" />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-medium text-slate-700">Confirm password</label>
                            <input id="password_confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} required autoComplete="new-password" className="w-full rounded-lg border-slate-300 text-sm focus:border-violet-600 focus:ring-violet-600" />
                        </div>
                        <div className="sm:col-span-2">
                            <button type="submit" disabled={processing} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60">
                                {processing ? 'Creating account…' : 'Create account'}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Account type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Joined</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                                            No user accounts have been created yet.
                                        </td>
                                    </tr>
                                ) : users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50">
                                        <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">{user.name}</td>
                                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">{user.email}</td>
                                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                            {user.is_admin ? 'Administrator' : 'User'}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => deleteUser(user)}
                                                disabled={auth.user.id === user.id}
                                                title={auth.user.id === user.id ? 'You cannot delete your own account.' : undefined}
                                                aria-label={`Delete ${user.name}`}
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.links.length > 3 && (
                        <nav aria-label="User accounts pages" className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-5 py-4">
                            {users.links.map((link, index) => (
                                link.url ? (
                                    <Link
                                        key={`${link.label}-${index}`}
                                        href={link.url}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-2 text-sm ${link.active ? 'bg-violet-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={`${link.label}-${index}`}
                                        className="rounded-lg px-3 py-2 text-sm text-slate-300"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </nav>
                    )}
                </section>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout title="User Accounts" active="User Accounts">{page}</DashboardLayout>;

export default Index;
