# $1 is $CI_REGISTRY_IMAGE
# $2 is container name

# Exit on Error
set -eu


# Docker auth
docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY

# Pull latest image
docker pull $CI_REGISTRY_IMAGE:latest

# Stop old container and start new one
docker stop $APP_NAME || true
docker run --rm --name $APP_NAME -d -p $PORT:3000 $CI_REGISTRY_IMAGE:latest

# Remove old images
docker images "$CI_REGISTRY_IMAGE" --format '{{.Repository}}:{{.Tag}} {{.ID}}' \
| grep -v ':latest' | awk '{print $2}' | xargs -r docker rmi || true