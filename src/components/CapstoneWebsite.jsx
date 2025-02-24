import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Menu, X, Code2  } from 'lucide-react';

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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
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
                  className={`block w-full px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === tab
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

const ProjectSection = () => {
  const projects = [
    {
      title: "The Sepsis Challenge",
      description: "Sepsis is a life-threatening condition caused by extreme response to infection. Early detection is crucial but challenging for clinicians. Our project aims to assist healthcare providers with a radiographic enhanced AI system.",
      image: "public/assets/sepsis.png",
    },
    {
      title: "Two-Pronged AI Approach", 
      description: "Our novel solution utilizes a two-part AI pipeline: 1) A ResNet model detects lung anomalies from chest X-rays. 2) A neural network combines the X-ray findings with patient vitals to predict sepsis onset likelihood within 1, 2, or 3+ days.",
      image: "public/assets/pipeline.png",
    },
    {  
      title: "Comprehensive Clinical Datasets",
      description: "We leverage the MIMIC-IV and MIMIC-CXR datasets containing rich patient data including demographics, vital signs, lab results, medications, and over 377,000 chest X-rays. Extensive data engineering was done to preprocess and integrate the data.",
      image: "public/assets/mimic-cxr.png",
    },
    {
      title: "Detecting Lung Anomalies with ResNet",
      description: "The first AI component is a ResNet (residual network) model trained on annotated MIMIC chest X-rays to identify lung abnormalities that may indicate sepsis risk. ResNet's deep learning architecture excels at medical image analysis.",
      image: "public/assets/model.png", 
    },
    {
      title: "Predicting Sepsis Onset with Vitals",
      description: "The second AI component is a neural network that ingests the lung anomaly findings from ResNet, along with key patient vitals and demographic data, to output sepsis onset predictions at 1, 2 and 3+ day horizons - enabling proactive care.",
      image: "public/assets/second-model.png",
    },
    {
      title: "Scalable Cloud Deployment",
      description: "To ensure scalability and accessibility, the system is deployed on AWS cloud infrastructure. S3 stores X-ray data, ECS hosts containerized models, and CloudFront enables fast content delivery. This allows seamless usage by healthcare providers.", 
      image: "public/assets/container.png",
    },
    {
      title: "Potential for Clinical Impact",
      description: "This advanced AI clinical decision support system could help clinicians identify sepsis risk earlier, enabling timely intervention and personalized care - ultimately improving patient outcomes and reducing healthcare burden of sepsis.",
      image: "public/assets/final.png",
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-8 py-16 scroll-mt-20"
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
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
  const projectDescription = `Our team is developing a radiographic enhanced clinical decision support system 
    for early sepsis detection and risk assessment. The system combines chest X-ray analysis with patient 
    metadata to predict sepsis development probability within specific timeframes.`;

  const teamMembers = [
    {
      name: "Kyle Shannon",
      role: "Mentor",
      email: "kshannon@ucsd.edu",
      image: "public/assets/kyle.png",
      isLead: true,
      contributions: [
        "Project oversight and guidance",
        "Repository management",
        "Technical direction",
        "Roadblack resolution"
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
      image: "public/assets/ahmed.jpeg",
      contributions: [
        "Designed project structure",
        "Maintained GitHub repositories",
        "Website development",
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
      image: "public/assets/bobby.jpeg",
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
      name: "Tongxun (Sherry) Hu",
      role: "Data Scientist",
      email: "t9hu@ucsd.edu",
      image: "public/assets/sherry.jpeg",
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
    },
    {
      name: "Raine Hoang",
      role: "Data Engineer",
      email: "k7hoang@ucsd.edu",
      image: "public/assets/raine.jpg",
      contributions: [
        "Created toy dataset for analytics",
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
      name: "Ojas Vashishtha",
      role: "ML Engineer",
      email: "ovashishtha@ucsd.edu",
      image: "public/assets/ojas.jpeg",
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
      name: "Rohan Duvur",
      role: "ML Engineer",
      email: "rduvur@ucsd.edu",
      image: "public/assets/rohan.jpg",
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
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        <div className="bg-white rounded-xl shadow-lg p-8">
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

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Ways to Connect</h3>
            <div className="space-y-4">
              <a
                href="https://github.com/kshannon-ucsd/24wi-dsc180-project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                <Github className="mr-2" size={20} />
                <span>Project Repository</span>
              </a>
              <a
                href="https://github.com/kshannon-ucsd/24wi-dsc180-internal-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                <ExternalLink className="mr-2" size={20} />
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AnimatedBackground />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'The Project' && <ProjectSection />}
      {activeTab === 'About Us' && <AboutUs />}
      {activeTab === 'Contact Us' && <ContactUs />}
    </div>
  );
};

export default App;