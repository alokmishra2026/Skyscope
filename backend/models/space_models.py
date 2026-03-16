from sqlalchemy import Column, Integer, String, Float, Date, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Planet(Base):
    __tablename__ = "planets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    mass = Column(String(100))
    radius = Column(Float)
    gravity = Column(Float)
    orbital_period = Column(Float)
    description = Column(Text)

class Star(Base):
    __tablename__ = "stars"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    type = Column(String(50))
    distance_from_earth = Column(String(100))
    luminosity = Column(String(100))

class Galaxy(Base):
    __tablename__ = "galaxies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    type = Column(String(50))
    distance = Column(String(100))
    number_of_stars = Column(String(100))

class SpaceMission(Base):
    __tablename__ = "space_missions"
    id = Column(Integer, primary_key=True, index=True)
    mission_name = Column(String(200), index=True)
    agency = Column(String(100))
    launch_date = Column(Date)
    mission_goal = Column(Text)

class Satellite(Base):
    __tablename__ = "satellites"
    id = Column(Integer, primary_key=True, index=True)
    satellite_name = Column(String(200), index=True)
    orbit_type = Column(String(100))
    launch_date = Column(Date)
    mission = Column(Text)

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    description = Column(Text)
    level = Column(String(50))
    instructor = Column(String(100))

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    category = Column(String(100))
    difficulty = Column(String(50))
    questions_json = Column(Text) # Storing as JSON string

class ResearchUpdate(Base):
    __tablename__ = "research_updates"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(Text)
    image_url = Column(String(500))
    source = Column(String(100)) # e.g., "NASA APOD", "ISRO"
    date = Column(String(50)) # Using string for simplicity in daily comparison

