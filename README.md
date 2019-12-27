# Vision Architect

## Set up
```
python3 -m venv venv/
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```
select venv python interpreter if using vscode
## Running server
```
python manage.py runserver
```

## Environment Variables
VA_DEBUG - False in Production
VA_DJANGO_DATABASE - Prod in Prod


## Display Routes/URLs
./manage.py show_urls