"use client";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import useProductStore from "../proStore/productStore";

const Header = () => {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const filters = useProductStore((state) => state.filters);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const setFilters = useProductStore((state) => state.setFilters);

  // Update filter state when checkbox is toggled
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  return (
    <header className="w-full p-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-all shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-center space-x-4 md:justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-blue-600">Zastand</span>Store
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm my-2 md:my-0 md:mx-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery} // Bind searchQuery state here
            onChange={(e) => setSearchQuery(e.target.value)} // Update search state on change
            className="w-full p-2 border rounded-md outline-none bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 xl:mt-0 p-2 ">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="zx"
              name="zx"
              checked={filters.zx}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="zx" className="text-sm">
              ZX
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="Backpack"
              name="Backpack"
              checked={filters.Backpack}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="backpack" className="text-sm">
              Backpack
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="MousePad"
              name="MousePad"
              checked={filters.MousePad}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="adidas" className="text-sm">
              MousePad
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="Logitech"
              name="Logitech"
              checked={filters.Logitech}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="logitech" className="text-sm">
              Logitech
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="Rog"
              name="Rog"
              checked={filters.Rog}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="rog" className="text-sm">
              Rog
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="TUF"
              name="TUF"
              checked={filters.TUF}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label htmlFor="tuf" className="text-sm">
              TUF
            </label>
          </div>
        </div>

        {/* Cart Button */}
        <Link href="/cart" className=" mt-4 xl:mt-0">
          <button className="p-2 px-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Cart
          </button>
        </Link>

        {/* Dark/Light Mode Toggle */}
        <div className=" mt-4 xl:mt-0">
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className=" flex justify-center items-center md:hidden mt-8 ">
        <Link
          href="/"
          className=" bg-slate-400 p-2 rounded-xl hover:text-blue-500 mr-2"
        >
          MyStore
        </Link>
        <Link
          href="/cart"
          className="bg-slate-400 p-2 rounded-xl hover:text-blue-500 ml-2"
        >
          Cart
        </Link>
      </nav>
    </header>
  );
};

export default Header;
