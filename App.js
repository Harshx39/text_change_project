import React, { useState, useEffect } from "react";
import "./App.css";
import { toPng } from "html-to-image";
import html2pdf from "html2pdf.js";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("#a6a6a6");
  const [font, setFont] = useState("Arial");
  const [pdfSize, setPdfSize] = useState("A4"); 
  const [pdfPosition, setPdfPosition] = useState("center");

  const fonts = ["Arial", "Times New Roman", "Verdana", "Georgia", "Courier New", "Playfair Display"];
  const colors = ["#FF0000", " #003311", "#0000FF", "#2eb8b8", "#FF00FF"];

 
  const [isModalOpen, setIsModalOpen] = useState(false);

                                              {/* api fetch */}

  const handleGenerate = () => {
    fetch("https://quotes-api-self.vercel.app/quote")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setAuthor(data.author);
      });
  };

  useEffect(() => {
    handleGenerate();
  }, []);

                             {/* download image */}

  const handleDownloadImage = () => {
    const element = document.getElementById("quote-container");
    toPng(element)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "quote.png";
        link.click();
      })
      .catch((err) => console.log("Error generating image", err));
  };

  
  const handleDownloadPdfClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleGeneratePdf = () => {
    
    // handleCloseModal();
  };
  
  return (
    <div className="app-container">
      <div className="controls">
                                       {/* Font Dropdown */}

        <select
          className="dropdown-button"
          onChange={(e) => setFont(e.target.value)}
        >
          {fonts.map((fontName) => (
            <option key={fontName} value={fontName}>
              {fontName}
            </option>
          ))}
        </select>

                                       {/* Color Buttons */}

        <div className="color-buttons">
          {colors.map((colorCode) => (
            <button
              key={colorCode}
              onClick={() => setColor(colorCode)}
              className="color-button"
              style={{ backgroundColor: colorCode }}
            ></button>
          ))}
        </div>
      </div>

                                     {/* Quote box */}

      <div
        id="quote-container"
        style={{
          fontFamily: font,
          color: color,
          textAlign: "center",
          marginBottom: "20px",
          padding: "20px",
          border: "2px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p className="quote-text">{quote}</p>
        <p className="author-name">- {author}</p>
      </div>

                                               {/* download & generate*/}


      <div className="action-buttons">
        <button
          className="action-button"
          style={{ backgroundColor: "#007BFF" }}
          onClick={handleDownloadImage}
        >
          Download as Image
        </button>

        <button
          className="action-button"
          style={{ backgroundColor: "#700BFF" }}
          onClick={handleDownloadPdfClick}
        >
          Download as Pdf
        </button>

        <button
          className="action-button"
          style={{ backgroundColor: "#28A745" }}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

                                  {/* Modal for PDF generation */}

  {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Select Size and Position for PDF</h2>
      <div className="modal-controls">
        <select
          className="dropdown-button"
          onChange={(e) => setPdfSize(e.target.value)}
        >
          <option value="A4">A4</option>
          <option value="Letter">Letter</option>
        </select>
        <select
          className="dropdown-button"
          onChange={(e) => setPdfPosition(e.target.value)}
        >
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <button
        className="generate-pdf-button"
        onClick={handleGeneratePdf}
      >
        Generate PDF
      </button>
      <button
        className="close-modal-button"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
