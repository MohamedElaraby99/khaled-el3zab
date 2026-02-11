import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { HERO, BRAND } from '../Constants/LayoutConfig';

const AnimatedHero = ({ onGetStarted }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Check for dark mode from HTML class (set by Navbar)
  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      const isDark = htmlElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initially
    checkDarkMode();

    // Listen for changes to the HTML class
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/courses');
    } else {
      onGetStarted();
    }
  };

  const buttonText = isLoggedIn ? 'ابدأ التعلم الآن' : 'سجل الآن';

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} dir="rtl">
      {/* Background Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}>
        {/* Subtle gradient background */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-primary/10' : 'bg-primary/5'}`}></div>

        {/* Geometric shapes */}
        <div className={`absolute top-20 left-20 w-32 h-32 rounded-full ${isDarkMode ? 'bg-primary/10' : 'bg-primary/20'}`}></div>
        <div className={`absolute top-40 right-40 w-24 h-24 rounded-full ${isDarkMode ? 'bg-primary/10' : 'bg-primary/20'}`}></div>
        <div className={`absolute bottom-40 left-40 w-20 h-20 rounded-full ${isDarkMode ? 'bg-primary/10' : 'bg-primary/20'}`}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration (Top on mobile) */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <img
                src={logo}
                alt={BRAND.teacherName}
                className="w-full h-full max-w-md mx-auto object-contain relative z-10"
              />
              {/* Subtle glow effect behind logo */}
              <div className={`absolute inset-0 w-full h-full rounded-full blur-3xl transition-all duration-300 ${isDarkMode ? 'bg-primary/20' : 'bg-primary/30'}`}></div>
            </div>

            {/* Line under logo */}
            <div className={`w-full max-w-md mx-auto h-1 mt-4 bg-gradient-to-r from-transparent via-primary to-transparent ${isDarkMode ? 'opacity-50' : 'opacity-30'}`}></div>

            {/* Small Circles */}
            <div className={`absolute top-16 right-16 w-3 h-3 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-primary-light' : 'bg-primary/30'}`}></div>
            <div className={`absolute bottom-16 left-16 w-5 h-5 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-primary-light' : 'bg-primary/30'}`}></div>
            <div className={`absolute bottom-8 right-8 w-3 h-3 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-primary-light' : 'bg-primary/30'}`}></div>

          </div>

          {/* Right Side - Text Content (Bottom on mobile) */}
          <div className="text-right space-y-6 order-2 lg:order-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-primary-light/20 text-primary dark:text-primary-light rounded-full text-xs md:text-sm font-medium font-cairo">{HERO.topText}</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight transition-colors duration-300 text-primary dark:text-primary-light">
              {HERO.mainTitle}
            </h1>

            <p className={`text-2xl leading-relaxed max-w-2xl transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {HERO.subtitle}
            </p>

            <div className="pt-6">
              <button
                onClick={handleButtonClick}
                className="btn-primary px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">{HERO.ctaButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedHero; 