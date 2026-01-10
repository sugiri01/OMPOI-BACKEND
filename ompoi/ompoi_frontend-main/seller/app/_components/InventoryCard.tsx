{/*Header*/}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <h1 className="text-xl font-bold">OMPOI Seller Platform</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard'>Dashboard</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard/orders'>Orders</a></span>
            <span className="text-green-600 font-semibold cursor-pointer"><a href='/dashboard/inventory'>Inventory</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard/reports'>Reports</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard'>Help</a></span>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">OM</span>
            </div>
          </nav>
        </div>
      </header>