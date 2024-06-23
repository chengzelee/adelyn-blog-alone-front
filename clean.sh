docker stop adelyn-blog-frontend;
docker rm adelyn-blog-frontend;
docker rmi adelyn-blog-frontend:1.0.0;


cd /docker/adelyn/;
dockercompose -f dockercompose-blog-frontend-run.yml up -d;