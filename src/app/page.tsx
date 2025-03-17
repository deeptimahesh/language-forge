import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800">
        <h1 className="text-4xl md:text-6xl font-bold pb-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
          Language Forge
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-slate-700 dark:text-slate-300">
          Create beautiful constructed languages with AI-powered assistance
        </p>
        <p className="text-md md:text-lg mb-12 max-w-3xl text-slate-600 dark:text-slate-400">
          Perfect for worldbuilders, fiction writers, linguists, and language enthusiasts
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/signup"
            className="px-8 py-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-white text-teal-600 border border-teal-600 rounded-md font-medium hover:bg-teal-50 transition-colors"
          >
            Explore Demo
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
            Create Languages Step by Step
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-600 dark:text-teal-400">Phonology</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Design a basic sound system with interactive IPA charts and audio preview
              </p>
              <Link
                href="/phonology"
                className="inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              >
                Try Phonology Module
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-600 dark:text-teal-400">Lexicon</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Generate vocabulary that follows your phonological patterns and etymological rules
              </p>
              <Link
                href="/lexicon"
                className="inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              >
                Try Lexicon Module
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-600 dark:text-teal-400">Grammar</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Build morphological systems and syntax rules that reflect your language's culture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Language Forge</p>
            <p className="text-sm text-slate-400">Created for language enthusiasts and world builders</p>
          </div>
          
          <nav className="flex gap-6">
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-slate-300 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
