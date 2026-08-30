import io
import pdfplumber
import docx

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from a PDF file."""
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                # x_tolerance=2 helps preserve spaces in tightly packed PDFs
                page_text = page.extract_text(x_tolerance=2, y_tolerance=3)
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from a DOCX file."""
    text = ""
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error reading DOCX: {e}")
    return text
