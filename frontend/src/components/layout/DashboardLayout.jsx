import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-screen bg-[#0f1410] text-[#e7d7c1] flex flex-col overflow-x-hidden">

      {/* TOP NAVBAR (FULL WIDTH) */}
      <header className="sticky top-0 z-50 w-full bg-[#161d18]/95 backdrop-blur-md border-b border-[#6b7550]">
        <Navbar />
      </header>

      {/* MAIN FULL-WIDTH GRID */}
      <main className="flex-1 w-full">

        <div className="w-full px-4 sm:px-6 lg:px-10 py-8">

          {/* DASHBOARD GRID SYSTEM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

            {/* LEFT SPACING (OPTIONAL FUTURE SIDEBAR SLOT) */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* MAIN CONTENT AREA */}
            <div className="col-span-1 lg:col-span-10 w-full space-y-6">

              {/* HERO / HEADER SLOT */}
              <div className="card w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  <div>
                    <h1 className="text-3xl font-bold text-[#e7d7c1]">
                      Dashboard
                    </h1>
                    <p className="text-[#c9b08a] mt-1">
                      Manage everything in one place
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="btn-primary">
                      Create New
                    </button>
                    <button className="btn-outline">
                      Export
                    </button>
                  </div>

                </div>
              </div>

              {/* PAGE CONTENT */}
              <div className="w-full space-y-6">
                {children}
              </div>

            </div>

            {/* RIGHT SPACING (BALANCE DESIGN) */}
            <div className="hidden lg:block lg:col-span-1"></div>

          </div>

        </div>

      </main>

      {/* FULL WIDTH FOOTER */}
      <footer className="w-full border-t border-[#6b7550] bg-[#161d18]">
        <div className="w-full px-6 py-4 flex justify-between text-sm text-[#c9b08a]">
          <p>© 2026 URLPro</p>
          <p>Full Width Nature SaaS Dashboard</p>
        </div>
      </footer>

    </div>
  );
}