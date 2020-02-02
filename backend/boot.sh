#!/bin/bash
source venv/bin/activate
python manage.py migrate
exec gunicorn -b :8000 --access-logfile - visionarchitect.wsgi:application