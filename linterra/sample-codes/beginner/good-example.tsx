export default function GoodExample() {
    return (
      <div className="bg-gray-100 p-6 rounded-lg max-w-md">
        <img 
          src="/hero.jpg" 
          alt="Team collaborating in a modern office space with laptops and whiteboards"
          className="w-full rounded-md mb-4"
        />
        
        <h2 className="text-gray-900 text-xl font-bold mb-2">
          Accessible Card Component
        </h2>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          This example follows all best practices: using Tailwind utility classes
          instead of inline styles, proper alt text for images, and good color
          contrast ratios for text.
        </p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-900 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 text-gray-900 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Form
          </button>
        </form>
      </div>
    );
  }