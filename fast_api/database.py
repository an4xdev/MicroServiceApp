from sqlmodel import create_engine, Session

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:P%40ssword123%21@database:5432/project"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

def get_db():
    with Session(engine) as session:
        yield session