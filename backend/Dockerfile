FROM python:3.8-slim-buster
WORKDIR /home/visionarchitect

RUN python -m venv venv
COPY requirements.txt requirements.txt
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install --default-timeout=100 -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY . ./
RUN chmod +x boot.sh

EXPOSE 8000
ENTRYPOINT ["./boot.sh"]