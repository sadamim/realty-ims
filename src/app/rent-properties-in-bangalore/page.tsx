'use client';

import RootLayout from '@/components/layout/RootLayout';
import MicrositeDropdowns from '@/components/MicrositeDropdowns';
import { buildMetadata } from '@/lib/seo';


// Page-level SEO. Without this the page inherits only the site-wide title
// and description from the root layout, which every other page also has.
export const metadata = buildMetadata({
  title: 'Rent Property in Bangalore',
  description:
    'Rental apartments, villas and independent houses across Bangalore, with honest rent guidance and micro-market context.',
  path: '/rent-properties-in-bangalore',
});

export default function PostRequirementForm() {
    return (
        <RootLayout>
            <div className="relative bg-about bg-cover bg-center py-16 ">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 text-white relative z-10">
                    <h1 className="text-3xl font-bold text-center">
                        RENT PROPERTY
                    </h1>
                </div>
            </div>
            <section className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold">Post Your Requirement</h1>
                    <div className="mt-2 h-1 w-20 mx-auto bg-blue-600 rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Rent Out Form */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className="text-xl font-semibold mb-6">Rent Out</h3>
                        <form id="ajax-buy-form" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input type="text" name="name" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Contact No.</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        className="form-input w-full input input-bordered"
                                        placeholder="Phone"
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email Id</label>
                                    <input type="email" name="email" className="form-input w-full input input-bordered" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <MicrositeDropdowns
                                    onSelectLocation={val => console.log('Selected Location:', val)}
                                    onSelectProject={val => console.log('Selected Project:', val)}
                                />
                                <div>
                                    <SelectField label="Decision Making Time" name="decison" options={["Immediate", "1 week", "2 week", "1 month", "more than 1 month"]} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Expected Rent</label>
                                    <input type="text" name="rent" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Property Age</label>
                                    <input type="text" name="p_age" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <SelectField label="Seller Resident" name="resident" options={["India", "NRI"]} />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Size</label>
                                    <input type="text" name="size" className="form-input w-full input input-bordered" />
                                </div>
                            </div>

                            <div>
                                <TextareaField label="Additional Info" name="info" />
                            </div>

                            <button type="submit" name="rent_out" className="btn-primary w-full">
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Rent In Form */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className="text-xl font-semibold mb-6">Rent In</h3>
                        <form id="ajax-buy-form1" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input type="text" name="name" className="form-input w-full input input-bordered" />
                                    <input type="hidden" name="form" value="form2" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Contact No.</label>
                                    <input type="number" name="phone" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email Id</label>
                                    <input type="email" name="email" className="form-input w-full input input-bordered" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block mb-1 font-medium">Preferred Time to Contact</label>
                                    <input type="date" name="timetocontact" defaultValue="2025-05-07" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Budget</label>
                                    <input type="text" name="budget" className="form-input w-full input input-bordered" />
                                </div>
                                <div>
                                    <SelectField label="Type" name="type" options={["Family", "Bachelors"]} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <MicrositeDropdowns
                                    onSelectLocation={val => console.log('Selected Location:', val)}
                                    onSelectProject={val => console.log('Selected Project:', val)}
                                />
                            </div>
                            <div>
                                <TextareaField label="Additional Info" name="info" />
                            </div>

                            <button type="submit" name="rent_in" className="btn-primary w-full">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
}

function SelectField({ label, name, options }: { label: string, name: string, options: string[] }) {
    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <select name={name} className="form-input w-full input input-bordered">
                {options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function TextareaField({ label, name }: { label: string, name: string }) {
    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <textarea name={name} className="form-input w-full textarea textarea-bordered" />
        </div>
    );
}