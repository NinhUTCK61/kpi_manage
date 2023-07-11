# $1 is $CI_REGISTRY_IMAGE
# $2 is container name

# Exit on Error
set -eu


# Docker auth
docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY

# Pull latest image
docker pull $CI_REGISTRY_IMAGE:latest

# Stop old container and start new one
echo $APP_NAME
docker stop $APP_NAME
docker run --rm --name $APP_NAME -d -p $PORT:3000 $CI_REGISTRY_IMAGE:latest

echo "11111"
# Deploy prisma
docker run --rm $CI_REGISTRY_IMAGE yarn prisma migrate deploy

# Remove old images
docker image prune -f