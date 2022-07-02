#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

chdir /app

# Wait for the db to be up.
./docker/wait-for-it.sh "${MYSQL_HOST:-mysqldb}:${MYSQL_PORT:-3306}"
yarn db-migrate up

# Run the main container command.
exec "$@"
