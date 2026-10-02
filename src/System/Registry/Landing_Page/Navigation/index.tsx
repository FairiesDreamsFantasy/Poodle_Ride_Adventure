import React from 'react';

export const LandingPageNavigation: React.FC = () => {
  return (
    <nav 
      style={{ display: 'block', marginTop: '0%', marginBottom: '0%', width: '99%', maxWidth: '99%' }}
      aria-label="Arcade and Site Links"
      id="landing-navigation"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        #VirtualPages {
          display: block;
          width: 99%;
          max-width: 99%;
          margin-top: 0%;
          border-width: 0%;
        }
        #VirtualPages li {
          display: inline-block;
          list-style-type: none;
        }
        #VirtualPages li a {
          text-align: center;
          color: LightBlue;
          background-color: #000000;
          border-width: 0%;
          padding: 5px 10px;
        }
        #VirtualPages li a:hover {
          border-width: 2px;
          border-style: solid;
          border-color: #FFFFFF;
          font-weight: bold;
          color: #000000;
          background-color: LightBlue;
          text-decoration: none;
        }
        #VirtualPages li a:visited {
          color: LightGreen;
          background-color: #000000;
          border-width: 0px;
        }
      `}} />
      <ul id="VirtualPages">
        <li><a href="https://arcade.fairiesdreamsfantasy.com">&lt;Back To Fairies Dreams &amp; Fantasy Arcade</a></li>
        <li><a href="https://arcade.fairiesdreamsfantasy.com/Browse">Browse</a></li>
        <li><a href="https://arcade.fairiesdreamsfantasy.com/Blog"> The Fairies Dreams &amp; Fantasy Arcade Blog</a></li>
        <li><a href="https://fairiesdreamsfantasy.com">Go to fairiesdreamsfantasy.com</a></li>
        <li><a href="https://wiki.fairiesdreamsfantasy.com">The Fairies Dreams &amp; Fantasy Wiki</a></li>
        <li><a href="https://news.fairiesdreamsfantasy.com">The Fairies Dreams &amp; Fantasy News</a></li>
        <li><a href="https://books.fairiesdreamsfantasy.com">Fairies Dreams &amp; Fantasy Books</a></li>
        <li><a href="https://premium.fairiesdreamsfantasy.com">Fairies Dreams &amp; Fantasy Premium</a></li>
        <li><a href="https://channel.fairiesdreamsfantasy.com">Fairies Dreams &amp; Fantasy Channel</a></li>
      </ul>
      <form 
        style={{ 
          maxWidth: '99%', 
          display: 'block', 
          borderWidth: '3px', 
          borderStyle: 'solid',
          borderColor: '#0000FF', 
          backgroundColor: 'indigo', 
          color: 'LightYellow', 
          fontWeight: 'bold', 
          fontFamily: 'Monospace', 
          padding: '2%', 
          width: '99%', 
          marginTop: '0px', 
          marginBottom: '5%' 
        }} 
        action="https://arcade.fairiesdreamsfantasy.com/Search_Results" 
        method="get"
        role="search"
        aria-label="Arcade Search"
      >
        <label htmlFor="landing-search" className="sr-only">Type your search prompt, and press enter</label>
        <input 
          id="landing-search"
          style={{ 
            color: '#90EE90', 
            backgroundColor: '#000000', 
            borderWidth: '3%', 
            borderStyle: 'solid',
            borderColor: 'Amber',
            display: 'block', 
            fontWeight: 'bold', 
            fontSize: '112pt',
            width: '100%'
          }} 
          type="search" 
          name="s" 
          placeholder="Type your search prompt, and press enter" 
        />
        <button type="submit" style={{ color: '#FF0000', backgroundColor: 'LightYellow', borderWidth: '1%', borderStyle: 'solid', borderColor: 'RedOrange', display: 'block', fontWeight: 'bold', marginTop: '10px' }}>Search</button>
        <button type="reset" style={{ color: '#FFFFFF', backgroundColor: 'DarkBlue', borderWidth: '1%', borderStyle: 'solid', borderColor: 'LightBlue', display: 'block', marginTop: '10px' }}>Clear</button>
      </form>
    </nav>
  );
};
