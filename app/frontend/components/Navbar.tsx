import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold text-primary" href="/">
                    Weather
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
