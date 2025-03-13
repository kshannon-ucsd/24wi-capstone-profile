import React, { useState, useRef, useEffect } from 'react';
import { Mail, Presentation, FileText, Linkedin, Github, ExternalLink, Menu, X, Code2 } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                      : 'text-gray-700 hover:bg-blue-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-blue-100"
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
const ImageModal = ({ image, alt, onClose }) => {
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

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // For slideshow functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = project.images || [project.image]; // Use array of images if provided, otherwise use single image
  
  // For image modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  
  // Smart Clinical Integration special case
  const isModelImage = project.title === "Smart Clinical Integration";
  
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
    if (project.title === "Projected System") {
      e.stopPropagation();
      setModalImage(slideImages[currentSlide]);
      setModalOpen(true);
    }
  };
  
  return (
    <div
      ref={cardRef}
      className={`flex flex-col md:flex-row items-center gap-8 py-12 scroll-mt-20 transition-all duration-1000 ${
        isVisible
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
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full h-full flex items-center justify-center bg-gray-100"
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1 bg-white/70 rounded py-1 text-center absolute bottom-0 left-0 right-0">
              Click to navigate to demo
            </p>
          </a>
        ) : project.title === "Projected System" ? (
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
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center bg-gray-100 ${
                    i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'bg-blue-600 w-6' : 'bg-white/70 w-3 hover:bg-white'
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
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full h-full flex items-center justify-center bg-gray-100"
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
          />
        )}
      </div>
      <div
        className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} 
          relative p-6 rounded-xl ${isVisible ? 'animate-frame-appear' : ''}`}
      >
        <div 
          className={`relative z-10 p-6 rounded-xl bg-white/50 backdrop-blur-sm
            transition-all duration-700 ${
              isVisible
                ? 'opacity-100 shadow-lg'
                : 'opacity-0 shadow-none'
            }`}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {project.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectSection = () => {
  // For the slideshow in the "Projected System" card, we need placeholder image URLs
  // Replace these with your actual image paths
  
  const projects = [
    {
      title: "Fighting Sepsis with AI",
      description: "Sepsis kills 270,000 Americans annually, with mortality rising 8% every hour diagnosis is delayed. Our AI-powered clinical decision support system helps doctors identify at-risk patients when treatment is most effective, potentially saving thousands of lives.",
      image: "./assets/sepsis.png",
    },
    {
      title: "Innovative Two-Stage Approach",
      description: "Our system first uses ResNet-50 to analyze chest X-rays for pneumonia (90% accuracy), then combines these findings with 13 vital clinical markers in a CatBoost model to predict sepsis risk (AUC 0.86). This dual-model approach offers a comprehensive early warning system for clinicians.",
      image: "./assets/pipeline.png",
    },
    {
      title: "Powerful Data Foundation",
      description: "Built on MIMIC datasets from Beth Israel Deaconess Medical Center and Mendeley Data's labeled images, our system analyzes 377,000+ chest X-rays with patient data to detect patterns that clinicians might miss. This diverse training foundation ensures robust real-world performance.",
      image: "./assets/mimic-cxr.png",
    },
    {
      title: "Smart Clinical Integration",
      description: "Our system integrates seamlessly with electronic health records via FHIR APIs, presenting actionable insights within existing clinical workflows. The intuitive interface allows healthcare providers to upload X-rays, input lab values, and receive sepsis risk assessments in real-time.",
      image: "./assets/model.png",
    },
    {
      title: "Projected System",
      description: "As we refine our Sepsis Prediction System, we aim to build a streamlined, AI-driven healthcare platform that enhances diagnostics, security, and accessibility. While currently centered on an AI-powered prediction API, future iterations will introduce a robust microservices backend for seamless Epic integration and an enhanced AI pipeline with continuous learning to improve predictive accuracy. The system will leverage secure, encrypted storage for patient metadata and optimized S3 solutions for medical imaging, ensuring scalability and privacy. Our vision is a holistic decision support system, empowering healthcare providers with trusted insights, precise predictions, and seamless workflows—all within a HIPAA-compliant framework.",
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
    { name: "Project Poster", link: "#", icon:  <Presentation className="w-10 h-10" />},
    { name: "Previous Work", link: "https://github.com/kshannon-ucsd/24fa-dsc180a-team1/tree/main", icon: <Github className="w-10 h-10" /> }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with logo and tagline */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Early Sepsis Detection System
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A radiographic-enhanced clinical decision support system combining AI-powered image analysis 
            with patient data to detect sepsis earlier than traditional methods.
          </p>
        </div>

        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
        
        {/* Publications and Resources Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 my-12">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Research Materials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {resources.map((resource, index) => (
              <a 
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-blue-50 rounded-lg transition-all hover:bg-blue-100 hover:shadow-md"
              >
                <span className="text-4xl mb-3">{resource.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">{resource.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-pink-20 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const TeamMember = ({ name, role, email, image, contributions, isLead, socials }) => (
  <div className={`${isLead ? 'col-span-full md:max-w-2xl mx-auto' : ''} bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105`}>
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className={`${isLead ? 'w-40 h-40' : 'w-32 h-32'} rounded-full mb-4 border-4 ${isLead ? 'border-purple-500' : 'border-blue-500'}`}
      />
      <h3 className={`${isLead ? 'text-2xl' : 'text-xl'} font-semibold text-gray-800`}>{name}</h3>
      <p className={`${isLead ? 'text-purple-600' : 'text-blue-600'} mb-2`}>{role}</p>

      {/* Social Links */}
      <div className="flex space-x-4 mb-4">
        {socials.website && (
          <a href={socials.website} target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors">
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
        <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-500 transition-colors">
          <Mail className="w-5 h-5" />
        </a>
        {socials.github && (
          <a href={socials.github} target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors">
            <Github className="w-5 h-5" />
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {contributions.map((contribution, index) => (
          <li key={index} className="list-none">
            • {contribution}
          </li>
        ))}
      </div>
    </div>
  </div>
);

const AboutUs = () => {
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
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" style={{ marginTop: '60px' }}>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {projectDescription}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/kshannon-ucsd/24wi-dsc180-project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
              <TeamMember key={member.email} {...member} />
            ))}

          {teamMembers
            .filter(member => !member.isLead)
            .map(member => (
              <TeamMember key={member.email} {...member} />
            ))}
        </div>
      </div>
      <footer className="bg-pink-20 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const ContactUs = () => {
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
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8" style={{ marginTop: '60px' }}>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <footer className="bg-pink-20 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} Sepsis Risk Assessment | UC San Diego
        </div>
      </footer>
    </div>
  );
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('The Project');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AnimatedBackground />
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
      />

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'The Project' && <ProjectSection />}
        {activeTab === 'About Us' && <AboutUs />}
        {activeTab === 'Contact Us' && <ContactUs />}
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
      `}</style>
    </div>
  );
};

export default App;