import React from 'react';
import NavBar from '../../Components/Common/Layout/NavBar';
import Footer from '../../Components/Common/Footer/Footer';

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div style={{ padding: '20px', minHeight: 'calc(100vh - 80px)' }}>
        <section id="about-us" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center', flex: '1', marginBottom: '30px' }}>
            <div style={{ height: '200px', backgroundImage: "url('https://static.tkbcdn.com/site/global/content-v2/img/who_are_we.png')", backgroundSize: 'cover', 
            backgroundPosition: 'center', marginBottom: '15px' }}></div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>INTRODUCTION</h1>
            <p>Established in 2013, Ticketbox is the first online event ticket distribution platform in Vietnam. We have cooperated with numerous event organizers 
                and top-notch large-scale programs. The successful events sold through Ticketbox include Super Show 9, Concert Ha Anh Tuan, Idecaf theater, TEDx, 
                Tech In Asia, WeChoice Awards, Forbes Vietnam, Miss Vietnam, DJ Hardwell, and more.</p>
          </div>
          <div style={{ textAlign: 'center', flex: '1', marginBottom: '30px' }}>
            <div style={{ height: '200px', backgroundImage: "url('https://static.tkbcdn.com/site/global/content-v2/img/what_we_do.png'); backgroundSize: '62px auto'" }}></div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>MISSION</h1>
            <p>Ticketbox is constantly improving to assert its pioneering position in the event ticket distribution industry in Vietnam. With our understanding 
                of technology and the market, we aspire to contribute to the development of the Vietnamese event industry, to be on par with other countries in the region, 
                and to bring international experiences to the audience.</p>
          </div>
          <div style={{ textAlign: 'center', flex: '1', marginBottom: '30px' }}>
            <div style={{ height: '200px', backgroundImage: "url('https://static.tkbcdn.com/site/global/content-v2/img/diamond.svg')" }}></div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>CORE VALUES</h1>
            <p>To us, the value of a business is its contribution to making society better. Ticketbox is operated by passionate and enthusiastic 
                young people who are eager to make buying and selling tickets easier and more convenient for both event organizers and attendees.</p>
          </div>
        </section>
        <section style={{ backgroundColor: '#f5f5f5', padding: '20px 0', textAlign: 'center' }}>
          <h3>Ticketbox Introduction</h3>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '15px' }}>
                  <img src="https://static.tkbcdn.com/site/global/content-v2/img/info-phone.svg" alt="Phone icon" />
                </div>
                <div style={{ fontSize: '16px' }}>
                  Hotline: 1900.6408 (M-F 8:30 - 18:30)
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '15px' }}>
                  <img src="https://static.tkbcdn.com/site/global/content-v2/img/info-email.svg" alt="Email icon" />
                </div>
                <div style={{ fontSize: '16px' }}>
                Email: support&#64;
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '15px' }}>
                  <img src="https://static.tkbcdn.com/site/global/content-v2/img/info-fb.svg" alt="FB icon" />
                </div>
                <div style={{ fontSize: '16px' }}>
                Fanpage: facebook.com
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '15px' }}>
                  <img src="https://static.tkbcdn.com/site/global/content-v2/img/info-address.svg" alt="Address icon" />
                </div>
                <div style={{ fontSize: '16px' }}>
                Office address: 52 Ut Tich, Ward 4, Tan Binh District, Ho Chi Minh City.
                </div>
              </li>
              
              {/* Add similar code for other contact information */}
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
