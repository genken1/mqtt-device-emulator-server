@echo off

docker-compose stop
docker-compose down

docker-compose pull
docker-compose up

pause
