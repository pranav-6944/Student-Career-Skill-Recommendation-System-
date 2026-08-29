import spacy
from spacy.pipeline import EntityRuler

# Load standard English model (small)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback if download failed
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Define our robust Skill Taxonomy
SKILLS_TAXONOMY = [
    # Programming Languages
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "C", "Ruby", "Go", "Rust", "Swift", "Kotlin", "PHP", "R", "MATLAB", "SQL", "NoSQL", "Bash", "Shell", "PowerShell", "Dart",
    # Frontend Frameworks & Libraries
    "React", "React Native", "Angular", "Vue", "Vue.js", "Svelte", "Next.js", "Nuxt.js", "Tailwind CSS", "Bootstrap", "Material-UI", "HTML5", "CSS3", "Redux", "JQuery", "Sass", "Less", "Webpack", "Vite",
    # Backend Frameworks
    "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "Ruby on Rails", "Laravel", "ASP.NET", "GraphQL", "REST APIs", "GraphQL", "Apollo", "gRPC",
    # Data & Machine Learning
    "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "Machine Learning", "Deep Learning", "Data Analysis", "Data Science", "Statistics", "Computer Vision", "NLP", "Natural Language Processing", "Big Data", "Hadoop", "Spark", "Kafka", "Data Engineering", "Data Mining", "Tableau", "Power BI", "Excel",
    # DevOps & Cloud
    "Docker", "Kubernetes", "AWS", "Amazon Web Services", "Azure", "GCP", "Google Cloud", "CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform", "Ansible", "Linux", "Unix", "Ubuntu", "Nginx", "Apache", "Serverless", "Microservices",
    # Databases
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "SQLite", "Firebase", "Supabase", "Oracle", "SQL Server",
    # Tools & Methodologies
    "Git", "GitHub", "GitLab", "Bitbucket", "Agile", "Scrum", "Jira", "Trello", "Confluence", "Figma", "Adobe XD", "UI/UX", "System Design", "Object-Oriented Programming", "OOP", "Data Structures", "Algorithms",
    # Certifications & Degrees
    "B.Sc", "B.Tech", "M.Sc", "M.Tech", "Ph.D", "Computer Science", "Information Technology", "AWS Certified", "GCP Certified", "Azure Certified"
]

# Create Entity Ruler
# We add it before the "ner" component so our patterns get priority
ruler = nlp.add_pipe("entity_ruler", before="ner")

# Format patterns for spaCy
patterns = [{"label": "SKILL", "pattern": [{"LOWER": skill.lower()}]} for skill in SKILLS_TAXONOMY]
ruler.add_patterns(patterns)

def extract_skills_from_text(text: str) -> list[str]:
    """
    Process raw text through the spaCy pipeline and extract unique skills.
    """
    doc = nlp(text)
    
    # Extract entities labeled as 'SKILL'
    extracted = set()
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            # Map back to proper casing from the taxonomy if possible, 
            # otherwise just use the matched text title-cased
            matched_text = ent.text.lower()
            original_case_skill = next((s for s in SKILLS_TAXONOMY if s.lower() == matched_text), ent.text.title())
            extracted.add(original_case_skill)
            
    return sorted(list(extracted))
