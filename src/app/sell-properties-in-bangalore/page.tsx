'use client';

import RootLayout from '@/components/layout/RootLayout';
import MicrositeDropdowns from '@/components/MicrositeDropdowns';
import { buildMetadata } from '@/lib/seo';


// Page-level SEO. Without this the page inherits only the site-wide title
// and description from the root layout, which every other page also has.
export const metadata = buildMetadata({
  title: 'Sell Your Property in Bangalore',
  description:
    'List your Bangalore property with Realty Focus. Pricing built from closed deals rather than asking prices, and buyers brought to you.',
  path: '/sell-properties-in-bangalore',
});

export default function SellProperties() {
    return (
        <RootLayout>
            {/* Header Banner */}
            <div className="relative bg-about bg-cover bg-center py-16 ">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 text-white relative z-10">
                    <h1 className="text-3xl font-bold text-center">
                        SELL PROPERTY
                    </h1>
                </div>
            </div>
            <section className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold">Post Your Requirement</h1>
                        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4" />
                    </div>

                    <form id="ajax-buy-form" className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Name</label>
                                <input type="text" name="name" className="form-input w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Contact No.</label>
                                <input type="number" name="phone" className="form-input w-full input input-bordered" placeholder="Phone" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Email Id</label>
                                <input type="email" name="email" className="form-input w-full input input-bordered" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Preferred Time to Contact</label>
                                <input type="date" name="timetocontact" defaultValue="2025-05-07" className="form-input w-full input input-bordered" />
                            </div>
                            <MicrositeDropdowns
                                onSelectLocation={val => console.log('Selected Location:', val)}
                                onSelectProject={val => console.log('Selected Project:', val)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Unit No.</label>
                                <input type="text" name="unitno" className="form-input w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Property Age</label>
                                <input type="text" name="p_age" className="form-input w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Size</label>
                                <input type="text" name="size" className="form-input w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Expected Price</label>
                                <input type="text" name="price" className="form-input w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Seller Resident</label>
                                <select name="resident" className="form-input w-full select select-bordered">
                                    <option>India</option>
                                    <option>NRI</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Decision Making Time</label>
                                <select name="decision" className="form-input w-full select select-bordered">
                                    <option>Immediate</option>
                                    <option>1 week</option>
                                    <option>2 week</option>
                                    <option>1 month</option>
                                    <option>more than 1 month</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <TextareaField label="Additional Info" name="info" />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary w-full">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>

        </RootLayout>
    );
}

function TextareaField({ label, name }: { label: string, name: string }) {
    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <textarea name={name} className="form-input w-full textarea textarea-bordered" rows={4} />
        </div>
    );
}
