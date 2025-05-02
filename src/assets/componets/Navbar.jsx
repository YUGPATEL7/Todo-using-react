import React, { useEffect } from "react";

const Navbar = () => {
  return (

    <div className=" text-white flex justify-between bg-indigo-800 py-2 ">
<div className="logo mx-8">
  <span className="font-bold text-xl ">PlanPal  </span>
</div>
    <nav>
      <ul className="flex gap-8 mx-8">
        <li className="cursor-pointer hover:font-bold  transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold  transition-all">Title</li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
