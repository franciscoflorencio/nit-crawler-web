#!/bin/bash

echo "Waiting for database to be ready..."
# while ! nc -z db 5432; do # Exemplo para PostgreSQL, onde 'db' é o nome do serviço no docker-compose e 5432 a porta
#   sleep 0.1
# done
echo "Database is ready!"

echo "Running makemigrations..."
python manage.py makemigrations

echo "Running migrate..."
python manage.py migrate --noinput

echo "Starting Django development server..."
exec "$@"
