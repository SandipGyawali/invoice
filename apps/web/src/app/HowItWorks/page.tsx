 function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Your Invoice</h3>
            <p className="text-gray-600">
              Fill in client details, add items, and customize the design in our simple form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Review & Send</h3>
            <p className="text-gray-600">
              Preview your invoice, add notes, and send directly to your client via email.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Paid Faster</h3>
            <p className="text-gray-600">
              Track payments, send automatic reminders, and manage your cash flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
  export default  HowItWorks;