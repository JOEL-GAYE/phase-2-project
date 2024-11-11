import React from "react";


function Footer() {
  return (
    <>
      <div id="sub">
        <h3 id="subscribe">Subscribe</h3>
        <p>
          Leave your email here for regular tips, notifications, and new
          products!
        </p>
        <form id="subscribeForm">
          <div class="email-form">
            <span class="form-control-wrap">
              <input
                type="email"
                name="email"
                id="email"
                size="20"
                class="form-groupform-control form-control-lg"
                placeholder="Enter a valid Email"
                required
              />
            </span>{" "}
            <br />
            <button type="submit" class="sub-submit" >
              Subscribe
              <i class="fas fa-chevron-right text-danger"></i>
            </button>
          </div>
        </form>
      </div>
      <div id="footer">&copy; 2024 Mkulima Solutions. All rights reserved.</div>
    </>
  );
}

export default Footer;
