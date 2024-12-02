# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the src directory into the container
COPY src/ ./src/

# Expose the port that the app runs on (optional, for documentation)
EXPOSE ${PORT}

# Command to run the application
CMD ["sh", "-c", "uvicorn src.main:app --host 0.0.0.0 --port $PORT"]
