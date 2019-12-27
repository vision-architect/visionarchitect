# Vision Architect

# Local Development
```
source env/bin/activate
cd app
python manage.py runserver
```

## Environment Variables Required
DEBUG - False in Production
DJANGO_DATABASE - Prod in Prod


## Postgres setup MacOS

```
brew install postgresql

# Starting postgres in the background
pg_ctl -D /usr/local/var/postgres start && brew services start postgresql

# Stopping postgres
brew services stop postgresql
```