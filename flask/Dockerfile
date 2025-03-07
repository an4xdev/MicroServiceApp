# Bazowy obraz z Pythonem
FROM python:3.10-slim

# Instalacja Flask
RUN pip install flask

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików aplikacji
COPY app.py /app

# Eksponowanie portu 5000
EXPOSE 5000

# Komenda uruchamiająca aplikację
CMD ["python", "app.py"]
