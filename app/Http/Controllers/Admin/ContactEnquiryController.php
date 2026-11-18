<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactEnquiryController extends Controller
{
    public function index(Request $request)
    {
        $enquiries = ContactEnquiry::query()
            ->when($request->filled('search'), function ($q) use ($request) {
                $s = '%' . $request->string('search')->trim() . '%';
                $q->where(fn ($w) => $w
                    ->where('name', 'like', $s)
                    ->orWhere('phone', 'like', $s)
                    ->orWhere('email', 'like', $s)
                    ->orWhere('subject', 'like', $s));
            })
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('type'), fn ($q) => $q->where('type', $request->type))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('WebPanel/Enquiries/Index', [
            'enquiries' => $enquiries,
            'filters'   => $request->only('search', 'status', 'type'),
            'counts'    => [
                'all'       => ContactEnquiry::count(),
                'new'       => ContactEnquiry::where('status', 'new')->count(),
                'contacted' => ContactEnquiry::where('status', 'contacted')->count(),
                'closed'    => ContactEnquiry::where('status', 'closed')->count(),
            ],
        ]);
    }

    public function update(Request $request, ContactEnquiry $enquiry)
    {
        $data = $request->validate([
            'status' => ['required', 'in:new,contacted,closed'],
        ]);

        $enquiry->update($data);

        return back();
    }

    public function destroy(ContactEnquiry $enquiry)
    {
        $enquiry->delete();

        return back();
    }
}