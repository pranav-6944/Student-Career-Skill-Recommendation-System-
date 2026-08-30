import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Loading ML dependencies...")
try:
    from gliner import GLiNER
    # Load the GLiNER model (this downloads it on first run, ~700MB)
    logger.info("Initializing GLiNER NLP Model (urchade/gliner_small-v2.1)...")
    model = GLiNER.from_pretrained("urchade/gliner_small-v2.1")
    logger.info("GLiNER model loaded successfully.")
except ImportError:
    logger.error("GLiNER or Torch is not installed. Please install them to use the ML NLP Engine.")
    model = None
except Exception as e:
    logger.error(f"Failed to load GLiNER model: {e}")
    model = None

def extract_skills_from_text(text: str) -> list[str]:
    """
    Process raw text through the GLiNER zero-shot NER model to extract unique skills.
    Chunks text to prevent truncation limits (384 tokens).
    """
    if model is None:
        logger.error("NLP Model is not loaded. Returning empty skills.")
        return []
        
    # Labels for zero-shot extraction
    labels = [
        "Programming Language",
        "Software Framework",
        "Software Library",
        "Database",
        "Cloud Platform",
        "DevOps Tool",
        "Data Science Skill",
        "Technical Concept"
    ]
    
    try:
        # Split text into chunks of ~150 words to avoid 384 token limit
        words = text.split()
        chunk_size = 150
        chunks = [' '.join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]
        
        extracted = set()
        for chunk in chunks:
            # Predict entities using contextual understanding
            entities = model.predict_entities(chunk, labels)
            
            for entity in entities:
                # We filter for high confidence predictions
                if entity.get("score", 0) > 0.5:
                    # Title-case for uniformity
                    extracted.add(entity["text"].title())
                
        return sorted(list(extracted))
    except Exception as e:
        logger.error(f"Error extracting skills: {e}")
        return []
