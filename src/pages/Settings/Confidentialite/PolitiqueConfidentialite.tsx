import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, List, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "./privacy.css";


function SlideItem({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToggle = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ top: container.clientHeight / 2, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="slide-item-wrapper">
      
      <div className="privacy-slide" ref={containerRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
     
      <div className="scroll-arrow" onClick={handleScrollToggle}>
        <ArrowDown
          size={20}
          color="#fff"
          style={{
            transform: isAtBottom ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            transformOrigin: "center"
          }}
        />
      </div>
    </div>
  );
}



function PolitiqueConfidentialite(): JSX.Element {
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);

  const [sections, setSections] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSommaireOpen, setIsSommaireOpen] = useState<boolean>(false);


  const [currentIndex, setCurrentIndex] = useState<number>(0);

  
  useEffect(() => {
    fetch("/privacy.md")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger la politique de confidentialité.");
        }
        return res.text();
      })
      .then((text) => {
    
        const rawSections = text.split(/\n## /g);
        const extractedTitles: string[] = [];

        
        const formattedSections = rawSections.map((section, index) => {
          const lines = section.split("\n");
          const titleLine = lines[0].trim();

          
          extractedTitles.push(`${index + 1}. ${titleLine.replace(/^\d+\.\s*/, "")}`);

          return `## ${index + 1}. ${titleLine}\n` + lines.slice(1).join("\n");
        });

        setSections(formattedSections);
        setTitles(extractedTitles);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

 
  const handleSommaireClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
    setIsSommaireOpen(false);
  };

  return (
    <div className="privacy-container">
      <div className="top-bar">
        <div className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="#E0E0E0" />
        </div>
        <div className="sommaire-button" onClick={() => setIsSommaireOpen(!isSommaireOpen)}>
          <List size={24} color="#E0E0E0" />
        </div>
      </div>

      <h1 className="title" style={{ color: "black" }}>Politique de Confidentialité</h1>

    
      {isSommaireOpen && (
        <div className="sommaire-overlay">
          <h2>Sommaire</h2>
          <ul>
            {titles.map((title, i) => (
              <li key={i}>
                <button onClick={() => handleSommaireClick(i)}>{title}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
       
          <Swiper
            direction="vertical"
            modules={[Pagination, Mousewheel]}
            nested={true} 
            mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              el: ".custom-swiper-pagination",
              type: "fraction",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex);
            }}
            className="privacy-slider"
          >
            {sections.map((section, index) => (
              <SwiperSlide key={index}>
                <SlideItem content={section} />
              </SwiperSlide>
            ))}
          </Swiper>

        
          <div className="pagination-container">
            <div className="next" />
            {currentIndex < sections.length - 1 && (
              <span className="next">Plus de pages...</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PolitiqueConfidentialite;
