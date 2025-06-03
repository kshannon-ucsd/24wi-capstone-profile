import React, { useState, useRef, useEffect } from 'react';
import { Mail, Presentation, FileText, Linkedin, Github, ExternalLink, Menu, X, Code2, Moon, Sun } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-900/90' : 'bg-white/80'} backdrop-blur-md z-50 shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold animated-gradient-text">
              Sepsis Detection
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['The Project', 'About Us', 'Contact Us'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-blue-900/50'
                      : 'text-gray-700 hover:bg-blue-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-colors`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-blue-100'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['The Project', 'About Us', 'Contact Us'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full px-3 py-2 rounded-md text-base font-medium ${activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-blue-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Image Modal component for viewing expanded images
const ImageModal = ({ image, alt, onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="max-w-5xl max-h-screen p-4 relative">
        <button
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-300"
          onClick={onClose}
        >
          <X size={24} className="text-white" />
        </button>
        <img
          src={image}
          alt={alt}
          className="max-w-full max-h-[calc(100vh-100px)] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // For slideshow functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = project.images || [project.image]; // Use array of images if provided, otherwise use single image

  // For image modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // Smart Clinical Integration special case
  const isModelImage = project.title === "Interactive Decision Support Tool";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    // Only setup auto-slide for cards that have multiple images
    if (slideImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slideImages.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  // Open modal with current slide image
  const openModal = (e) => {
    if (project.title === "Robust Technical Architecture") {
      e.stopPropagation();
      setModalImage(slideImages[currentSlide]);
      setModalOpen(true);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`flex flex-col md:flex-row items-center gap-8 py-12 scroll-mt-20 transition-all duration-1000 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
        }`}
    >
      <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} relative`}>
        {isModelImage ? (
          // For the Smart Clinical Integration card - direct link to demo
          <a
            href="https://kshannon-ucsd.github.io/24wi-dsc180-profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer block relative"
            style={{ height: "400px", width: "100%" }}
          >
            <div
              className={`rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
            <p className={`text-xs mt-1 ${darkMode ? 'bg-gray-800/70 text-gray-300' : 'bg-white/70 text-gray-600'} rounded py-1 text-center absolute bottom-0 left-0 right-0`}>
              Click to navigate to demo
            </p>
          </a>
        ) : project.title === "Robust Technical Architecture" ? (
          // Slideshow specifically for the Projected System card
          <div className="relative">
            <div
              className="rounded-lg shadow-xl overflow-hidden cursor-pointer"
              style={{ height: "400px", width: "100%" }}
              onClick={openModal}
            >
              {slideImages.map((image, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  style={{ display: 'block' }}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Slide ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Enhanced navigation dots with better visibility */}
            <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-3 z-20">
              {slideImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(i);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-blue-600 w-6' : 'bg-white/70 w-3 hover:bg-white'
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Improved Previous/Next buttons with transition effects */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 opacity-60 hover:opacity-100"
              aria-label="Previous slide"
            >
              &#10094;
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 opacity-60 hover:opacity-100"
              aria-label="Next slide"
            >
              &#10095;
            </button>


          </div>
        ) : (
          // For all other single image cards
          <div
            className="cursor-pointer block relative"
            style={{ height: "400px", width: "100%" }}
            onClick={() => {
              setModalImage(project.image);
              setModalOpen(true);
            }}
          >
            <div
              className={`rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>


          </div>
        )}

        {/* Image Modal */}
        {modalOpen && (
          <ImageModal
            image={modalImage}
            alt={project.title}
            onClose={() => setModalOpen(false)}
            darkMode={darkMode}
          />
        )}
      </div>
      <div
        className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} 
          relative p-6 rounded-xl ${isVisible ? 'animate-frame-appear' : ''}`}
      >
        <div
          className={`relative z-10 p-6 rounded-xl ${darkMode
              ? 'bg-gray-800/50 backdrop-blur-sm'
              : 'bg-white/50 backdrop-blur-sm'
            }
            transition-all duration-700 ${isVisible
              ? 'opacity-100 shadow-lg'
              : 'opacity-0 shadow-none'
            }`}
        >
          <h2 className="text-3xl font-bold mb-4 animated-gradient-text">
            {project.title}
          </h2>
          <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectSection = ({ darkMode }) => {
  // For the slideshow in the "Projected System" card, we need placeholder image URLs
  // Replace these with your actual image paths

  const projects = [
    {
      title: "Early Warning System Saves Lives",
      description: "Our AI-powered sepsis detection system combines chest X-ray analysis with patient vitals to identify at-risk individuals within only 2-4 hours of admission. By detecting sepsis earlier, when treatment is most effective, our clinical decision support tool helps healthcare providers intervene promptly, potentially saving thousands of lives each year.",
      image: "./assets/sepsis.png",
    },
    {
      title: "Comprehensive Patient Analysis",
      description: "Our system integrates multiple data points from patient records, including vital signs, blood markers, and radiographic findings to create a holistic risk profile. The combination of clinical parameters with chest X-ray analysis using our ResNet model enables the detection of subtle patterns that might otherwise be missed in traditional sequential screening methods.",
      image: "./assets/mimic-cxr.png",
    },
    {
      title: "Innovative Two-Stage Approach",
      description: "Our system employs a two-stage pipeline that first identifies pneumonia through a ResNet-50 neural network analysis of chest X-rays, then feeds these results into a CatBoost model alongside patient metadata to predict sepsis risk. This innovative approach allows us to create an end-to-end solution that combines radiographic image analysis with clinical data for more accurate and earlier sepsis detection.",
      image: "./assets/pipeline.png",
    },
    {
      title: "Interactive Decision Support Tool",
      description: "Our user-friendly interface allows medical professionals to upload chest X-rays and input clinical parameters for instant sepsis risk assessment. The system provides a step-by-step analysis, from image validation through pneumonia detection to final risk assessment, all while emphasizing that results should be interpreted alongside other clinical findings by qualified healthcare providers.",
      image: "./assets/model.png",
    },
    {
      title: "Robust Technical Architecture",
      description: "Our system employs a three-tiered architecture integrating seamlessly with existing healthcare infrastructure to deliver reliable sepsis predictions. From the component-level backend APIs to the secure integration with Epic EHR systems, we've designed a scalable solution that allows healthcare providers to access patient data and receive timely sepsis risk assessments without disrupting established clinical workflows.",
      // Using array of images for slideshow functionality
      images: [
        "./assets/software_layer.png",
        "./assets/container_layer.png",
        "./assets/component_layer.png",
      ],
      image: "./assets/container_layer.png", // Fallback for backward compatibility
    }
  ];

  // Download resources section - simplified to just two items
  const resources = [
    { name: "Project Repository", link: "https://github.com/kshannon-ucsd/24wi-dsc180-project", icon: <Github className="w-10 h-10" /> }
    { name: "Project Poster", link: "https://drive.google.com/file/d/13qU6JVTCLozurA9dBQCH8k2g5JYTtNRt/view?usp=sharing", icon: <Presentation className="w-10 h-10" /> },
    { name: "Previous Work", link: "https://github.com/kshannon-ucsd/24fa-dsc180a-team1/tree/main", icon: <Github className="w-10 h-10" /> }
  ];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-purple-900' : 'bg-gradient-to-b from-blue-50 to-purple-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with logo and tagline */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-5xl font-bold mb-4 animated-gradient-text">
            Early Sepsis Detection System
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            A radiographic-enhanced clinical decision support system combining AI-powered image analysis
            with patient data to detect sepsis earlier than traditional methods.
          </p>
        </div>

        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} darkMode={darkMode} />
        ))}

        {/* Publications and Resources Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 my-12 transition-colors duration-300`}>
          <h2 className="text-3xl font-bold mb-6 text-center animated-gradient-text">
            Research Materials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center p-6 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-50 text-gray-800 hover:bg-blue-100'} rounded-lg transition-all hover:shadow-md`}
              >
                <span className={`text-4xl mb-3 ${darkMode ? 'text-blue-400' : ''}`}>{resource.icon}</span>
                <h3 className="text-xl font-semibold">{resource.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className={`py-4 mt-8 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-pink-20 text-gray-600'} transition-colors duration-300`}>
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const TeamMember = ({ name, role, email, image, contributions, isLead, socials, darkMode }) => (
  <div className={`${isLead ? 'col-span-full md:max-w-2xl mx-auto' : ''} ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105`}>
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className={`${isLead ? 'w-40 h-40' : 'w-32 h-32'} rounded-full mb-4 border-4 ${isLead ? 'border-purple-500' : 'border-blue-500'}`}
      />
      <h3 className={`${isLead ? 'text-2xl' : 'text-xl'} font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{name}</h3>
      <p className={`${isLead ? 'text-purple-600' : 'text-blue-600'} mb-2`}>{role}</p>

      {/* Social Links */}
      <div className="flex space-x-4 mb-4">
        {socials.website && (
          <a href={socials.website} target="_blank" rel="noopener noreferrer"
            className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
        <a href={`mailto:${email}`} className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
          <Mail className="w-5 h-5" />
        </a>
        {socials.github && (
          <a href={socials.github} target="_blank" rel="noopener noreferrer"
            className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
            <Github className="w-5 h-5" />
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
            className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        {contributions.map((contribution, index) => (
          <li key={index} className={`list-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            • {contribution}
          </li>
        ))}
      </div>
    </div>
  </div>
);

const AboutUs = ({ darkMode }) => {
  const projectDescription = `Our multidisciplinary team has developed a clinical decision support system that combines 
  chest X-ray analysis with patient vitals to detect sepsis earlier, when treatment is most effective. 
  Our two-stage AI approach achieved 90% accuracy for pneumonia detection and strong performance (AUC 0.86) 
  for sepsis prediction.`;

  const teamMembers = [
    {
      name: "Kyle Shannon",
      role: "Mentor",
      email: "kshannon@ucsd.edu",
      image: "./assets/kyle.png",
      isLead: true,
      contributions: [
        "Project oversight and guidance",
        "Repository management",
        "Technical direction",
        "Roadblock resolution"
      ],
      socials: {
        website: "https://www.kmshannon.com/about/", // Example URL
        github: "https://github.com/kshannon",
        linkedin: "https://www.linkedin.com/in/kmshannon/"
      }
    },
    {
      name: "Ahmed Mostafa",
      role: "Project Manager",
      email: "ahmostafa@ucsd.edu",
      image: "./assets/ahmed.jpeg",
      contributions: [
        "Designed project structure",
        "Maintained GitHub repositories",
        "Websites development",
        "GitHub actions integration"
      ],
      socials: {
        website: "https://ahmostafa147.github.io/portfolio/",
        github: "https://github.com/ahmostafa147",
        linkedin: "https://www.linkedin.com/in/ahmed-mostafa147/"
      }
    },
    // ... similar structure for other team members
    {
      name: "Boqi (Bobby) Zhu",
      role: "Cloud Engineer",
      email: "b2zhu@ucsd.edu",
      image: "./assets/bobby.png",
      contributions: [
        "AWS Organization setup",
        "Cloud architecture research",
        "ML deployment strategies",
        "AWS infrastructure documentation"
      ],
      socials: {
        website: "https://bobbyzhu.com/",
        github: "https://github.com/Bobby-Zhu",
        linkedin: "https://www.linkedin.com/in/bobby-zhu/"
      }
    },
    {
      name: "Ojas Vashishtha",
      role: "ML Engineer",
      email: "ovashishtha@ucsd.edu",
      image: "./assets/ojas.jpeg",
      contributions: [
        "Database setup and research",
        "Segmentation evaluation",
        "Feature selection",
        "Sepsis risk model development",
      ],
      socials: {
        github: "https://github.com/ojasvashishtha",
        linkedin: "https://www.linkedin.com/in/ojas-vashishtha/"
      }
    },
    {
      name: "Raine Hoang",
      role: "Data Engineer",
      email: "k7hoang@ucsd.edu",
      image: "./assets/raine.jpg",
      contributions: [
        "Created dataset for analytics",
        "MIMIC-IV documentation",
        "Feature engineering and LCA analysis",
        "Exploratory Data Analysis"
      ],
      socials: {
        github: "https://github.com/Jystine",
        linkedin: "https://www.linkedin.com/in/raine-hoang/"
      }
    },
    {
      name: "Rohan Duvur",
      role: "ML Engineer",
      email: "rduvur@ucsd.edu",
      image: "./assets/rohan.jpg",
      contributions: [
        "Selenium image scraping",
        "ML deployment strategies",
        "Model refinement",
        "Cloud architecture research"
      ],
      socials: {
        github: "https://github.com/rduvur",
        linkedin: "https://www.linkedin.com/in/rohan-duvur-a95313195/"
      }
    },
    {
      name: "Tongxun (Sherry) Hu",
      role: "Data Scientist",
      email: "t9hu@ucsd.edu",
      image: "./assets/sherry.jpeg",
      contributions: [
        "GitHub repository setup",
        "ML model development",
        "KNN and CNN implementation",
        "Code structure design"
      ],
      socials: {
        github: "https://github.com/sherrihuu",
        linkedin: "https://www.linkedin.com/in/tongxun-hu-ab4b04304/"
      }
    }
  ];

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-purple-900' : 'bg-gradient-to-b from-blue-50 to-purple-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" style={{ marginTop: '60px' }}>
          <h2 className="text-4xl font-bold mb-6 animated-gradient-text">
            Meet Our Team
          </h2>
          <p className={`text-lg max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {projectDescription}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/kshannon-ucsd/24wi-dsc180-project"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white rounded-lg transition-colors`}
            >
              <Code2 className="w-5 h-5 mr-2" />
              Project Repository
            </a>
            <a
              href="https://d3i23sy0bznewr.cloudfront.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Documentation
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers
            .filter(member => member.isLead)
            .map(member => (
              <TeamMember key={member.email} {...member} darkMode={darkMode} />
            ))}

          {teamMembers
            .filter(member => !member.isLead)
            .map(member => (
              <TeamMember key={member.email} {...member} darkMode={darkMode} />
            ))}
        </div>
      </div>
      <footer className={`py-4 mt-8 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-pink-20 text-gray-600'} transition-colors duration-300`}>
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const ContactUs = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:ahmostafa@ucsd.edu?cc=b2zhu@ucsd.edu,t9hu@ucsd.edu,ovashishtha@ucsd.edu,k7hoang@ucsd.edu,rduvur@ucsd.edu,kshannon@ucsd.edu&subject=Capstone Project Inquiry&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-purple-900' : 'bg-gradient-to-b from-blue-50 to-purple-50'} transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 transition-colors duration-300`} style={{ marginTop: '60px' }}>
          <h2 className="text-3xl font-bold text-center mb-8 animated-gradient-text">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Name
              </label>
              <input
                type="text"
                required
                className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Email
              </label>
              <input
                type="email"
                required
                className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Message
              </label>
              <textarea
                required
                rows={4}
                className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'} focus:border-transparent`}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <footer className={`py-4 mt-8 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-pink-20 text-gray-600'} transition-colors duration-300`}>
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const AnimatedBackground = ({ darkMode }) => (
  <div className="fixed inset-0 -z-10">
    <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} transition-colors duration-300`}>
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute w-96 h-96 ${darkMode ? 'bg-blue-600' : 'bg-blue-400'} rounded-full blur-3xl animate-blob transition-colors duration-300`}></div>
        <div className={`absolute w-96 h-96 ${darkMode ? 'bg-purple-600' : 'bg-purple-400'} rounded-full blur-3xl animate-blob animation-delay-2000 transition-colors duration-300`}></div>
        <div className={`absolute w-96 h-96 ${darkMode ? 'bg-pink-600' : 'bg-pink-400'} rounded-full blur-3xl animate-blob animation-delay-4000 transition-colors duration-300`}></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('The Project');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Handle smooth tab transitions
  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;

    setIsTransitioning(true);

    // After a short delay, change the active tab
    setTimeout(() => {
      setActiveTab(newTab);

      // After tab has changed, reset transition state
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You could also save this preference to localStorage if you want it to persist
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-b from-gray-900 to-purple-900 text-white' : 'bg-gradient-to-b from-blue-50 to-purple-50 text-gray-900'} transition-colors duration-300`}>
      <AnimatedBackground darkMode={darkMode} />
      <Navigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'The Project' && <ProjectSection darkMode={darkMode} />}
        {activeTab === 'About Us' && <AboutUs darkMode={darkMode} />}
        {activeTab === 'Contact Us' && <ContactUs darkMode={darkMode} />}
      </div>

      <style jsx global>{`
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-out {
    animation: fadeOut 0.3s ease-out forwards;
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in forwards;
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  /* Add this new animation for the title colors */
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animated-gradient-text {
    background: linear-gradient(
      -45deg, 
      #3b82f6, 
      #8b5cf6, 
      #d946ef, 
      #ec4899, 
      #3b82f6
    );
    background-size: 300% 300%;
    animation: gradientFlow 6s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`}</style>
    </div>
  );
};

export default App;