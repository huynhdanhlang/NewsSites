import React from "react";

export default function Footer() {
  var year = new Date().getFullYear();

  return (
    <div className=".container-sm mt-5">
      <footer className="bg-dark text-center text-white">
        <div className="container-sm p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://www.facebook.com/"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://google.com/"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://github.com/"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © {year} Copyright: Báo Sinh Viên
          {/* <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
        </div>
      </footer>
    </div>
  );
}
