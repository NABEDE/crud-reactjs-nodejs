import React from 'react';

function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">The CRUD</h5>
                        <p>
                            This is a simple app with a navbar and a footer. You can add any additional information or links in this section.
            </p>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="/" className="text-dark">Home</a></li>
                            <li><a href="/about" className="text-dark">About</a></li>
                            <li><a href="/services" className="text-dark">Services</a></li>
                            <li><a href="/contact" className="text-dark">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 bg-dark text-light">
                © 2024 My App - All rights reserved.
      </div>
        </footer>
    );
}

export default Footer;
