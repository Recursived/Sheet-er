FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /codeuserAPI

COPY . .
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]