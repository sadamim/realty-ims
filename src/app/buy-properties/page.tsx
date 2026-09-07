'use client';

import RootLayout from '@/components/layout/RootLayout';
import MicrositeDropdowns from '@/components/MicrositeDropdowns';

export default function BuyProperties() {
    return (
        <RootLayout>
            {/* Header Banner */}
            <div className="relative bg-about bg-cover bg-center py-16 ">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 text-white relative z-10">
                    <h1 className="text-3xl font-bold text-center">
                        BUY PROPERTY
                    </h1>
                </div>
            </div>
            <section className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-center  mb-10">
                        <h1 className="text-3xl font-bold">Post Your Requirement</h1>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div>
                    </div>

                    <form className="space-y-6 mt-6" id="ajax-buy-form">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">Name</label>
                                <input type="text" name="name" className="form-input w-full input input-bordered" />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Contact No.</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone1"
                                    placeholder="Phone"
                                    className="form-input w-full input input-bordered"
                                    min={0}
                                    maxLength={10}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Email Id</label>
                                <input type="email" name="email" className="form-input w-full input input-bordered" />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Preferred Time to Contact</label>
                                <input type="date" name="timetocontact" defaultValue="2025-05-07" className="form-input w-full input input-bordered input input-bordered" />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MicrositeDropdowns
                                onSelectLocation={val => console.log('Selected Location:', val)}
                                onSelectProject={val => console.log('Selected Project:', val)}
                            />

                            <div>
                                <label className="block mb-2 font-medium">Budget</label>
                                <input type="text" name="budget" className="form-input w-full input input-bordered" />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Purpose</label>
                                <select name="purpose" className="form-select w-full">
                                    <option>Investment</option>
                                    <option>End Use</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Home Loan</label>
                                <select name="homelocan" className="form-select w-full">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Possession</label>
                                <select name="possession" className="form-select w-full">
                                    <option>Ready to Move</option>
                                    <option>Under Construction</option>
                                    <option>Pre - Launch</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Decision Making Time</label>
                                <select name="decision" className="form-select w-full">
                                    <option>Immediate</option>
                                    <option>1 week</option>
                                    <option>2 week</option>
                                    <option>1 month</option>
                                    <option>more than 1 month</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <input
                                type="submit"
                                name="buy"
                                value="Submit"
                                className="btn btn-primary w-full"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </RootLayout>
    );
}
