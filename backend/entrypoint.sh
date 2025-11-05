#!/bin/bash
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

echo "Waiting for database at ${DB_HOST}:${DB_PORT}..."
until nc -z "${DB_HOST}" "${DB_PORT}"; do
	sleep 0.5
done
echo "Database is ready!"

echo "Running makemigrations..."
python manage.py makemigrations

echo "Running migrate..."
python manage.py migrate --noinput

echo "Starting Django development server..."
exec "$@"
