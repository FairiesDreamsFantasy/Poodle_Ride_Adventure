import React from 'react';

export const LandingPageFooter: React.FC = () => {
  return (
    <footer style={{ marginTop: '50px', padding: '20px', borderTop: '1px solid #333', width: '100%' }}>
      <h3 style={{ textAlign: 'center', display: 'block', verticalAlign: 'top', color: 'LightBlue' }}>Useful Links</h3>
      <style dangerouslySetInnerHTML={{ __html: `
        #UsefulLinks {
          text-align: center;
          display: block;
        }
        #UsefulLinks li {
          display: block;
          list-style-type: none;
          margin-bottom: 10px;
        }
        #UsefulLinks li a {
          text-align: center;
          color: Yellow;
          background-color: #000000;
          border-width: 0%;
          padding: 5px 15px;
          text-decoration: none;
        }
        #UsefulLinks li a:hover {
          color: #000000;
          background-color: Yellow;
          border-width: 0%;
          font-weight: bold;
        }
      `}} />
      <ul id="UsefulLinks" aria-label="Support and policy links">
        <li><a href="https://arcade.fairiesdreamsfantasy.com/About">About</a></li>
        <li><a href="https://arcade.fairiesdreamsfantasy.com/Disclosure">Disclosure</a></li>
        <li><a href="https://support.fairiesdreamsfantasy.com/arcade">Fairies Dreams &amp; Fantasy Arcade Support</a></li>
        <li><a href="https://arcade.fairiesdreamsfantasy.com/Privacy_Policy">Privacy Policy</a></li>
      </ul>
    </footer>
  );
};
