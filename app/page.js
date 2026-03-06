'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  // Typing Effect State
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = ["Frontend Developer", "UI Enthusiast", "ReactJS Expert", "Problem Solver"];

  useEffect(() => {
    // 1. Initialize AOS
    // We need to import it dynamically to avoid SSR issues
    import('aos').then((AOS) => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    });

    // 2. Scroll Logic (Header & Active Link)
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      const sections = document.querySelectorAll('section');
      const navLi = document.querySelectorAll('.nav-links li a');

      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });

      navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
          a.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Typing Logic
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);


  // Handlers
  const toggleMenu = () => {
    setMenuActive(!menuActive);
    if (!menuActive) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setMenuActive(false);
    document.body.classList.remove('menu-open');
  };

  const skillContentData = {
    react: {
      title: 'React.js - Component-Based UI',
      description: "React.js is a powerful JavaScript library used for building user interfaces (UIs). I use it to create reusable UI components, which makes managing complex applications and updating them quickly easier. Its Virtual DOM ensures fast performance.",
    },
    javascript: {
      title: 'JavaScript / TypeScript - Logic and Type Safety',
      description: "JavaScript is the primary language of the web, adding interactivity to websites. I use TypeScript (TS) alongside it, which adds static typing to JS. This is crucial for large projects as it helps catch errors (bugs) during development, making the code cleaner, safer, and easier to maintain.",
    },
    tailwind: {
      title: 'Tailwind CSS - Utility-First Styling',
      description: "Tailwind CSS is a 'utility-first' CSS framework. It provides you with low-level classes (like `flex`, `p-4`, `text-center`) directly in HTML. Using this, I can build custom designs quickly and without overrides, resulting in faster development and smaller file sizes.",
    },
    bootstrap: {
      title: 'Bootstrap 5 - Rapid Prototyping',
      description: 'Bootstrap is a widely used CSS framework. It provides ready-made HTML, CSS, and JavaScript components (like navigation bars, buttons, and forms). It is excellent for rapid prototyping and ensuring that the website looks consistent (compatible) across all browsers.',
    },
    htmlcss: {
      title: 'HTML5 / CSS3 - The Foundation of the Website',
      description: "HTML5 is the fundamental language for structuring content on the web, while CSS3 is used for styling (colors, layout, animations). I build all projects using semantic HTML for SEO and accessibility, and create attractive designs with modern CSS techniques.",
    },
    github: {
      title: 'Git & GitHub - Version Control',
      description: "Git is a version control system for tracking changes in source code. GitHub is a platform for hosting Git repositories. I use them for collaborative development, code backup, and efficiently managing different project versions (branches).",
    },
    deployment: {
      title: 'Deployment - Taking Code Live',
      description: "Deployment involves taking the finished code and making it live on the internet. I have experience deploying projects using modern platforms like Vercel and Netlify, as well as traditional hosting like cPanel, which ensures fast and reliable access for users.",
    },
    design: {
      title: 'Design & Prototyping - Visualizing the UI',
      description: 'Before starting to code, I use design tools to create visual mockups and interactive prototypes. This helps in finalizing the User Interface (UI) and User Experience (UX) early on, ensuring the final product meets design expectations and is easy to navigate.',
    }
  };

  const handleSkillClick = (skillKey) => {
    const content = skillContentData[skillKey];
    if (content) {
      setModalContent(content);
      setModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <main>
      <header className={`header ${menuActive ? '' : ''}`}>
        <div className="container navbar">
          <a href="#" className="logo">Pawan</a>
          <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
            <li><a href="#home" className="active" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#education" onClick={closeMenu}>Education</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
          <div className={`menu-icon ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="container hero-content" data-aos="fade-up">
          <div className="hero-tag">👋 Welcome to my portfolio</div>

          <h1>PAWAN KUMAR</h1>

          <p className="subtitle">
            <span className="typing-text">{text}</span>
          </p>

          <p>I build modern and responsive web applications using React.js and Tailwind CSS, focusing on clean
            code and high performance.</p>
          <div className="hero-buttons">
            <a href="#projects" className="cta-button">View My Work</a>
            <a href="#contact" className="cta-button cta-button-secondary">Get In Touch</a>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container" data-aos="fade-up" data-aos-duration="800">
          <h2 className="section-title">About <span>Me</span></h2>
          <div className="about-content">
            <div className="about-img-container" data-aos="fade-right">
              <div className="profile-image">
                <img src="/image/pawan.jpg" alt="Pawan photo" />
              </div>
            </div>
            <div className="about-text">
              <h3>Dedicated Frontend Developer & Full Stack Aspirant</h3>
              <p>
                I'm a Front-End Developer who builds modern and responsive websites. I'm skilled in
                HTML, CSS, JavaScript, TypeScript, React.js, and Tailwind CSS.
              </p>
              <p>
                I focus on writing clean code and am currently learning backend technologies to become a
                Full Stack Developer.
              </p>
              <p>
                I currently work as a Frontend Developer at gladhand technologies PVT LTD, where I
                develop and deploy diverse, SEO-friendly web applications using React.js, Tailwind CSS, and
                TypeScript.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Technical <span>Skills</span></h2>
          <div className="skills-grid">
            <div className="skill-card" onClick={() => handleSkillClick('react')} data-aos="fade-up" data-aos-delay="100">
              <i className="fab fa-react"></i>
              <h4>React.js</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('javascript')} data-aos="fade-up" data-aos-delay="150">
              <i className="fab fa-js"></i>
              <h4>JavaScript / TypeScript</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('tailwind')} data-aos="fade-up" data-aos-delay="200">
              <i className="fa-solid fa-wind"></i>
              <h4>Tailwind CSS</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('bootstrap')} data-aos="fade-up" data-aos-delay="250">
              <i className="fab fa-bootstrap"></i>
              <h4>Bootstrap 5</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('htmlcss')} data-aos="fade-up" data-aos-delay="300">
              <i className="fab fa-html5"></i>
              <h4>HTML5 / CSS3</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('github')} data-aos="fade-up" data-aos-delay="350">
              <i className="fab fa-github"></i>
              <h4>Git & GitHub</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('deployment')} data-aos="fade-up" data-aos-delay="400">
              <i className="fa-solid fa-server"></i>
              <h4>Deployment (Vercel, Netlify, cPanel)</h4>
            </div>
            <div className="skill-card" onClick={() => handleSkillClick('design')} data-aos="fade-up" data-aos-delay="450">
              <i className="fa-solid fa-desktop"></i>
              <h4>Design & Prototyping</h4>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Work <span>Experience</span></h2>
          <div className="timeline">
            <div className="timeline-item left" data-aos="fade-right">
              <div className="timeline-content">
                <h3>FrontEnd Developer</h3>
                <span>MAY 2025 - PRESENT</span>
                <p>gladhand technologies PVT LTD</p>
                <ul>
                  <li>Developed and maintained modern, responsive, and SEO-friendly web applications using
                    React.js, Tailwind CSS, and TypeScript, focusing on clean code and high performance.
                  </li>
                  <li>Built and deployed diverse projects, including an e-commerce platform, a tour and
                    travel booking website, and an inventory management product.</li>
                  <li>Managed source code and collaborated with team members using version control systems
                    like Git.</li>
                  <li>Gained hands-on experience in the complete development lifecycle, from initial
                    design to final deployment.</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item right" data-aos="fade-left">
              <div className="timeline-content">
                <h3>Web Development Training</h3>
                <span>6-Month Course (BIIT Delhi)</span>
                <p>Certificate in Web Development</p>
                <p>Completed a 6-month course focusing on core web technologies: HTML, CSS, and JavaScript.
                </p>
              </div>
            </div>
            <div className="timeline-item left" data-aos="fade-right">
              <div className="timeline-content">
                <h3>Computer Certification</h3>
                <span>AISECT (An NSDC Partner Institution)</span>
                <p>Achieved Grade: B+.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" style={{ padding: '80px 0', backgroundColor: '#050505', position: 'relative' }}>
        {/* Injecting Custom Premium CSS specifically for this section */}
        <style>{`
    .premium-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding-top: 40px;
    }
    .adv-card {
      position: relative;
      background: #111111;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 1;
    }
    .adv-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 20px 40px rgba(0, 163, 255, 0.15);
      border-color: rgba(0, 163, 255, 0.5);
    }
    .img-wrapper {
      position: relative;
      height: 240px;
      overflow: hidden;
    }
    .img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }
    .adv-card:hover .img-wrapper img {
      transform: scale(1.1) rotate(1deg);
    }
    .img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #111111 5%, transparent 100%);
      z-index: 2;
    }
    .tech-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: #00a3ff;
      border: 1px solid rgba(0, 163, 255, 0.3);
      z-index: 3;
      letter-spacing: 1px;
    }
    .live-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #00ff88;
      border-radius: 50%;
      margin-right: 6px;
      box-shadow: 0 0 10px #00ff88;
      animation: pulse 1.5s infinite alternate;
    }
    @keyframes pulse {
      0% { transform: scale(0.9); opacity: 0.7; }
      100% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 15px #00ff88; }
    }
    .card-content {
      padding: 25px;
      position: relative;
      z-index: 3;
      margin-top: -20px;
    }
    .card-title {
      font-size: 22px;
      color: #ffffff;
      margin-bottom: 10px;
      font-weight: 700;
      transition: color 0.3s;
    }
    .adv-card:hover .card-title {
      color: #00a3ff;
    }
    .card-desc {
      color: #a0a0a0;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 20px;
      min-height: 45px;
    }
    .card-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px;
      background: rgba(255, 255, 255, 0.03);
      color: #ffffff;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .adv-card:hover .card-btn {
      background: #00a3ff;
      border-color: #00a3ff;
      color: #fff;
    }
    .card-btn i {
      margin-left: 8px;
      transition: transform 0.3s;
    }
    .adv-card:hover .card-btn i {
      transform: translateX(5px);
    }
  `}</style>

        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" data-aos="fade-up" style={{ fontSize: '3rem', color: '#fff', marginBottom: '15px' }}>
              Key <span style={{ color: '#00a3ff' }}>Projects</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" style={{ color: '#a0a0a0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Check out the live deployments of my work below. These projects showcase my expertise in React.js, Tailwind CSS, and full-scale web development.
            </p>
          </div>

          <div className="premium-grid">

            {/* 1. Stillgatherings */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="100">
              <div className="img-wrapper">
                <div className="tech-badge">Next.js</div>
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" alt="Stillgatherings Events" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Stillgatherings</h4>
                <p className="card-desc">A high-end photography and event showcase platform with seamless animations and modern UI.</p>
                <a href="https://stillgatherings-eight.vercel.app" target="_blank" rel="noopener noreferrer" className="card-btn">
                  Explore Project <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* 2. Local Bir (Gamma) - NEW IMAGE HERE */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="200">
              <div className="img-wrapper">
                <div className="tech-badge">React</div>
                <img src="https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=800&auto=format&fit=crop" alt="Local Bir Gamma Paragliding" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Local Bir (Gamma)</h4>
                <p className="card-desc">Premium tourism guide for Bir Billing with specialized booking flows and local activity discovery.</p>
                <a href="https://localbir-gamma.vercel.app" target="_blank" rel="noopener noreferrer" className="card-btn">
                  Live Preview <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* 3. Bluethroat E-commerce */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="300">
              <div className="img-wrapper">
                <div className="tech-badge">E-Commerce</div>
                <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop" alt="Bluethroat Fashion" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Bluethroat Shop</h4>
                <p className="card-desc">A premium men's fashion e-commerce platform built for high conversion and fast performance.</p>
                <a href="https://bluethroatshop.in" target="_blank" rel="noopener noreferrer" className="card-btn">
                  View Demo <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* 4. Ratnamani Dashboard */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="400">
              <div className="img-wrapper">
                <div className="tech-badge">Dashboard</div>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Ratnamani Dashboard Analytics" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Ratnamani ERP</h4>
                <p className="card-desc">Complex industrial dashboard developed for real-time inventory and management.</p>
                <a href="https://www.ratnamanieshop.com/" target="_blank" rel="noopener noreferrer" className="card-btn">
                  Check Dashboard <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* 5. Musafir Travel */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="500">
              <div className="img-wrapper">
                <div className="tech-badge">Booking Tech</div>
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" alt="Musafir Travel Journey" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Musafir Travel</h4>
                <p className="card-desc">A travel booking website focused on seamless itinerary planning and exceptional user experience.</p>
                <a href="https://local-guide-main.vercel.app/" target="_blank" rel="noopener noreferrer" className="card-btn">
                  Launch Site <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* 6. Woodtech Furniture */}
            <div className="adv-card" data-aos="fade-up" data-aos-delay="600">
              <div className="img-wrapper">
                <div className="tech-badge">3D UI</div>
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" alt="Woodtech Modern Furniture" />
                <div className="img-overlay"></div>
              </div>
              <div className="card-content">
                <div style={{ fontSize: '12px', color: '#00ff88', marginBottom: '8px', fontWeight: '600' }}>
                  <span className="live-dot"></span> LIVE PROJECT
                </div>
                <h4 className="card-title">Woodtech Furniture</h4>
                <p className="card-desc">Modern furniture e-commerce website featuring high-quality product displays and 3D views.</p>
                <a href="https://www.woodtechfurniture.in/" target="_blank" rel="noopener noreferrer" className="card-btn">
                  Visit Experience <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="education">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">My <span>Education</span></h2>
          <div className="education-grid">
            <div className="edu-card" data-aos="fade-up" data-aos-delay="100">
              <h4>Bachelor of Arts (B.A.)</h4>
              <span>2025 - Present</span>
              <p>Indira Gandhi National Open University (IGNOU)</p>
            </div>
            <div className="edu-card" data-aos="fade-up" data-aos-delay="200">
              <h4>12th Grade</h4>
              <span>HP Board</span>
              <p>Achieved 70%.</p>
            </div>
            <div className="edu-card" data-aos="fade-up" data-aos-delay="300">
              <h4>10th Grade</h4>
              <span>HP Board</span>
              <p>Achieved 71%.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container contact-content" data-aos="fade-up">
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p>I am currently available for new projects and collaborations. If you are looking for a dedicated
            Frontend Developer to boost your web presence, feel free to reach out!</p>
          <a href="https://wa.me/916230044384?text=Hello%20Pawan,%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20connect%20regarding%20a%20development%20project."
            className="whatsapp-button" target="_blank">
            <i className="fab fa-whatsapp"></i> Message me on WhatsApp
          </a>
          <p style={{ marginTop: '20px', fontSize: '1rem' }}>
            Call me at: +91 6230044384<br />
            Or email me at: abhigladhandx369@gmail.com
          </p>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/pawan-297b15302" target="_blank" aria-label="LinkedIn"><i
              className="fab fa-linkedin"></i></a>
            <a href="https://github.com/pawan369x" target="_blank" aria-label="GitHub"><i
              className="fab fa-github"></i></a>
            <a href="https://www.instagram.com/___abhi__7x/" target="_blank" aria-label="Instagram"><i
              className="fab fa-instagram"></i></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2025 Pawan Kumar. Built with ❤️ and Code.</p>
        </div>
      </footer>

      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} id="skillModalOverlay" onClick={(e) => { if (e.target.id === 'skillModalOverlay') closeModal(); }}>
        <div className="skill-modal">
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <h3>{modalContent.title}</h3>
          <p>{modalContent.description}</p>
        </div>
      </div>
    </main>
  );
}
