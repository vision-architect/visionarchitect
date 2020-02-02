FROM python:3.8-slim-buster
WORKDIR /home/visionarchitect

RUN python -m venv venv
COPY requirements.txt requirements.txt
RUN venv/bin/pip install --upgrade pip
RUN apt-get -y update
RUN apt-get install -y --no-install-recommends default-libmysqlclient-dev gcc
RUN venv/bin/pip install --default-timeout=100 -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY . ./
RUN chmod +x boot.sh

ENV VA_DEBUG 0
ENV VA_DATABASE prod
ENV RDS_DB_NAME vision
ENV RDS_USERNAME admin
ENV RDS_PASSWORD password
ENV RDS_HOSTNAME vision-architect.cluster-cl9rfjbisgxc.us-east-1.rds.amazonaws.com
ENV RDS_PORT 3306

EXPOSE 8000
ENTRYPOINT ["./boot.sh"]