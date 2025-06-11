import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Simple Invoicing <br />
          <span className="text-blue-600">Done Right</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, send, and track invoices in minutes. Focus on your business while we handle the paperwork.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            Get Started - It's Free
          </button>
          <Link href="/HowItWorks" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">
            How It Works
          </Link>
        </div>
        
        <div className="mt-12 border rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <img 
            src="/invoice-dashboard-preview.png" 
            alt="Invoice dashboard preview"
            className="w-full h-auto"
          />
        </div>
      </div>
     
    </section>
  );
}